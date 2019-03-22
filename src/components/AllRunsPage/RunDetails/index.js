import * as React from 'react';
import DetailsHeader from './DetailsHeader';
import FailedTests from './FailedTests';
import AllTests from './AllTests';
import Details from './Details';
import { Route } from 'react-router-dom';

class RunDetails extends React.Component {
  render() {
    return (
      <div>
        <DetailsHeader basePath={`${this.props.match.url}`}/>
        <Route path={`${this.props.match.path}/failed`} component={FailedTests} />
        <Route path={`${this.props.match.path}/tests`} component={AllTests} />
        <Route path={`${this.props.match.path}/details`} component={Details} />
      </div>
    )
  }
}

export default RunDetails;
