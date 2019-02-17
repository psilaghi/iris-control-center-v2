import * as React from 'react';
import AllRunsPage from '../AllRunsPage';
import NewRunPage from '../NewRunPage';
import { Route } from 'react-router-dom';

function AppContent(props) {
  return (
    <main className={props.className}>
      <Route path="/runs" component={AllRunsPage}/>
      <Route path="/new/:target" component={NewRunPage}/>
    </main>
  );
}

export default AppContent;
