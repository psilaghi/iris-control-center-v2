# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.
import inspect
import os
import sys

import git
import importlib
import json
import logging
import shutil

from src.core.api.os_helpers import OSHelper
from src.core.util.arg_parser import parse_args
from src.core.util.path_manager import PathManager
from src.core.util.test_loader import scan_all_tests

logger = logging.getLogger(__name__)


def update_run_index(fx_app, new_data=None):
    current_run = {'id': PathManager.get_run_id(),
                   'version': fx_app.version,
                   'build': fx_app.build_id,
                   'channel': fx_app.channel,
                   'locale': fx_app.locale}

    if new_data is None:
        logger.debug('Updating runs.json with initial run data.')
        current_run['total'] = '*'
        current_run['failed'] = '*'
    else:
        logger.debug('Updating runs.json with completed run data.')
        current_run['total'] = new_data['total']
        current_run['failed'] = new_data['failed']

    old_js_folder = os.path.join(parse_args().workdir, 'js')
    if os.path.exists(old_js_folder):
        shutil.rmtree(old_js_folder, ignore_errors=True)

    run_file = os.path.join(parse_args().workdir, 'data', 'all_runs.json')

    if os.path.exists(run_file):
        logger.debug('Updating run file: %s' % run_file)
        with open(run_file, 'r') as f:
            run_file_data = json.load(f)
        for run in run_file_data['runs']:
            if run['id'] == PathManager.get_run_id():
                run_file_data['runs'].remove(run)
        run_file_data['runs'].append(current_run)
    else:
        logger.debug('Creating run file: %s' % run_file)
        run_file_data = {'runs': []}
        run_file_data['runs'].append(current_run)

    with open(run_file, 'w') as f:
        json.dump(run_file_data, f, sort_keys=True, indent=True)


def update_run_log(fx_app, new_data=None):
    meta = {'run_id': PathManager.get_run_id(),
            'fx_version': fx_app.version,
            'fx_build_id': fx_app.build_id,
            'platform': OSHelper.get_os(),
            'config': '%s, %s-bit, %s' % (OSHelper.get_os, OSHelper.get_os_bits(),
                                          OSHelper.get_processor()),
            'channel': fx_app.channel,
            'locale': fx_app.locale,
            'args': ' '.join(sys.argv),
            'params': vars(parse_args()),
            'log': os.path.join(PathManager.get_current_run_dir(), 'iris_log.log')}

    repo = git.Repo(PathManager.get_module_dir())
    meta['iris_version'] = 1.0
    meta['iris_repo'] = repo.working_tree_dir
    if parse_args().headless_run:
        pass
    else:
        meta['iris_branch'] = repo.active_branch.name
        meta['iris_branch_head'] = repo.head.object.hexsha

    if new_data is None:
        logger.debug('Updating run.json with initial run data.')
        meta['total'] = 0
        meta['passed'] = 0
        meta['failed'] = 0
        meta['skipped'] = 0
        meta['errors'] = 0
        meta['start_time'] = 0
        meta['end_time'] = 0
        meta['total_time'] = 0
        tests = []
    else:
        logger.debug('Updating runs.json with completed run data.')
        meta['total'] = new_data['total']
        meta['passed'] = new_data['passed']
        meta['failed'] = new_data['failed']
        meta['failed_tests'] = new_data['failed_tests']
        meta['skipped'] = new_data['skipped']
        meta['errors'] = new_data['errors']
        meta['start_time'] = new_data['start_time']
        meta['end_time'] = new_data['end_time']
        meta['total_time'] = new_data['total_time']
        tests = new_data['tests']

    run_file = os.path.join(PathManager.get_current_run_dir(), 'run.json')
    run_file_data = {'meta': meta, 'tests': tests}
    with open(run_file, 'w') as f:
        json.dump(run_file_data, f, sort_keys=True, indent=True)


def create_arg_json():
    arg_data = {'email': {'type': 'bool', 'value': ['true', 'false'], 'default': 'false', 'label': 'Email results'},
                'firefox': {'type': 'str', 'value': ['local', 'latest', 'latest-esr', 'latest-beta', 'nightly'],
                            'default': 'latest-beta', 'label': 'Firefox'},
                'highlight': {'type': 'bool', 'value': ['true', 'false'], 'default': 'false',
                              'label': 'Debug using highlighting'},
                'locale': {'type': 'str', 'value': 'en-US', 'default': 'en-US', 'label': 'Locale'},
                'mouse': {'type': 'float', 'value': ['0.0', '0.5', '1.0', '2.0'], 'default': '0.5',
                          'label': 'Mouse speed'},
                'override': {'type': 'bool', 'value': ['true', 'false'], 'default': 'false',
                             'label': 'Run disabled tests'},
                'port': {'type': 'int', 'value': ['2000'], 'default': '2000', 'label': 'Local web server port'},
                'report': {'type': 'bool', 'value': ['true', 'false'], 'default': 'false',
                           'label': 'Create TestRail report'},
                'save': {'type': 'bool', 'value': ['true', 'false'], 'default': 'false',
                         'label': 'Save profiles to disk'}}

    arg_log_file = os.path.join(parse_args().workdir, 'data', 'all_args.json')
    with open(arg_log_file, 'w') as f:
        json.dump(arg_data, f, sort_keys=True, indent=True)


def create_target_json():
    master_target_dir = os.path.join(PathManager.get_module_dir(), 'targets')
    target_list = [f for f in os.listdir(master_target_dir) if not f.startswith('__')]

    master_test_list = create_master_test_list(target_list)

    targets = []
    for item in target_list:
        try:
            target_module = importlib.import_module('targets.%s.app' % item)
            try:
                target = target_module.Target()
                targets.append({'name': target.target_name, 'tests': [], 'icon': '%s.png' % item,
                                'settings': target.cc_settings})
            except NameError:
                logger.error('Can\'t find default Target class.')
        except ModuleNotFoundError:
            logger.error('Problems importing module.')

    target_json = {'targets': targets}
    # print('Target Json is :',target_json)
    target_json_file = os.path.join(parse_args().workdir, 'data', 'targets.json')
    with open(target_json_file, 'w') as f:
        json.dump(target_json, f, sort_keys=True, indent=True)

    # TODO: scan test folders


def create_test_json(master_test_list):
    test_log_file = os.path.join(parse_args().workdir, 'data', 'all_tests.json')
    with open(test_log_file, 'w') as f:
        json.dump(master_test_list, f, sort_keys=True, indent=True)


def filter_list(original_list, exclude_list):
    new_list = []
    for item in original_list:
        if item not in exclude_list:
            new_list.append(item)
    return new_list


def create_master_test_list(target_list):
    all_tests, all_packages = scan_all_tests()
    master_test_list = {}
    app = {}
    for package in all_packages:
        master_test_list[os.path.basename(package)] = []

    for target in target_list:
        testlist = []
        app[target] = testlist
        for index, module in enumerate(all_tests, start=1):
            try:
                current_module = importlib.import_module(module)
                current_test = current_module.Test()

                current_package = os.path.basename(os.path.dirname(current_module.__file__))

                test_object = {'name': module, 'module': current_module.__file__,
                               'description': current_test.description,
                               'package': current_package}
                if target == 'firefox':
                    if current_test.fx_version is '':
                        test_object['fx_version'] = 'all'
                    else:
                        test_object['fx_version'] = current_test.fx_version

                    # test_object['platform'] = filter_list(current_test.platform, current_test.exclude)
                    # test_object['channel'] = filter_list(current_test.channel, current_test.exclude)
                    # test_object['locale'] = filter_list(current_test.locale, current_test.exclude)
                    # test_object['enabled'] = OSHelper.get_os() in filter_list(current_test.platform, current_test.exclude)
                    # test_object['tags'] = current_test.tags
                    test_object['test_case_id'] = current_test.test_case_id
                    test_object['test_suite_id'] = current_test.test_suite_id
                    test_object['blocked_by'] = current_test.blocked_by

                if str(os.path.join(PathManager.get_tests_dir(), target)) in str(current_module.__file__):
                    testlist.append(test_object)


            except TypeError as e:
                logger.warning('Error in test - %s: %s' % (module, e.message))
            except AttributeError:
                logger.warning('[%s] is not a test file. Skipping...', module)
    return app




def create_log_object(module, current, fx_args):
    run_obj = {'name': module.__name__, 'meta': current.meta, 'profile': current.profile, 'module': module.__file__,
               'profile_path': current.profile_path.profile, 'fx_args': fx_args, 'prefs': current.prefs,
               'time': int(current.end_time - current.start_time), 'asserts': []}

    outcome = 'PASSED'
    for result in current.results:
        if result.outcome is 'FAILED':
            outcome = result.outcome
        run_obj['asserts'].append({'outcome': result.outcome, 'message': result.message,
                                   'expected': result.expected, 'actual': result.actual,
                                   'error': result.error})
        run_obj['result'] = outcome
    return run_obj


def update_log_object(run_obj):
    if os.path.exists(PathManager.get_debug_image_directory()):
        debug_images = []
        for root, dirs, files in os.walk(PathManager.get_debug_image_directory()):
            for file_name in files:
                debug_images.append(file_name)
        run_obj['debug_images'] = sorted(debug_images)
        run_obj['debug_image_directory'] = PathManager.get_debug_image_directory()
    return run_obj


def append_logs(browser, test_list, master_test_list, passed, failed, skipped, errors, start_time, end_time, tests):
    update_run_index(browser, {'total': len(test_list), 'failed': len(failed)})
    failed_tests = {}
    if len(failed) > 0:
        for item in failed:
            for package in master_test_list:
                for test in master_test_list[package]:
                    if test["name"] == item:
                        if failed_tests.get(package) is None:
                            failed_tests[package] = []
                        failed_tests[package].append(item)

    data = {'total': len(test_list), 'passed': passed, 'failed': len(failed),
            'failed_tests': failed_tests, 'skipped': skipped, 'errors': errors,
            'start_time': int(start_time), 'end_time': int(end_time),
            'total_time': int(round(end_time - start_time, 2)), 'tests': tests}
    update_run_log(browser, data)
