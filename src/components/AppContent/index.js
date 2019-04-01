import * as React from 'react';
import AllRunsPage from '../AllRunsPage';
import NewRunPage from '../NewRunPage';
import { Route, Switch, Redirect } from 'react-router-dom';

function AppContent(props) {
  return (
    <main className={props.className}>
      <Switch>
        <Route path="/runs" component={AllRunsPage} />
        <Route path="/new/:target" component={NewRunPage} />
        <Redirect to="/runs" />
      </Switch>
    </main>
  );
}

export default AppContent;
