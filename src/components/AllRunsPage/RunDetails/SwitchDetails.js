import * as React from 'react';
import FailedTests from './FailedTests';
import AllTests from './AllTests';
import SelectedRunDetails from './SelectedRunDetails';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ApiClient from '../../apiClient';

class SwitchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { details: {} };
  }

  componentDidMount() {
    ApiClient.get(`/runs/${this.props.match.params.id}/run.json`).then(response =>
      this.setState({ details: response })
    );
  }

  render() {
    return (
      <Switch>
        <Route
          path={`${this.props.match.path}/failed`}
          render={() => (
            <FailedTests
              details={this.state.details.tests && this.state.details.tests.failed_tests}
            />
          )}
        />
        <Route
          path={`${this.props.match.path}/tests`}
          render={() => (
            <AllTests details={this.state.details.tests && this.state.details.tests.all_tests} />
          )}
        />
        <Route
          path={`${this.props.match.path}/details`}
          render={() => (
            <SelectedRunDetails details={this.state.details && this.state.details.meta} />
          )}
        />
        <Redirect to={`${this.props.match.path}/failed`} />
      </Switch>
    );
  }
}

export default withRouter(SwitchDetails);
