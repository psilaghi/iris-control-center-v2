import * as React from 'react';
import FailedTests from './FailedTests';
import AllTests from './AllTests';
import Details from './Details';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import ApiClient from '../../apiClient';

class SwitchDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {details: {}};
  }

  componentDidMount() {
    ApiClient.get(`/runs/${this.props.match.params.id}/run.json`).then(response => this.setState({details: response}));
  }

  render() {
    return (
      <Switch>
        <Route path={`${this.props.match.path}/failed`} render={ _ => <FailedTests details={this.state.details} />} />
        <Route path={`${this.props.match.path}/tests`} render={ _ => <AllTests details={this.state.details} />} />
        <Route path={`${this.props.match.path}/details`} render={ _ => <Details details={this.state.details} />} />
        <Redirect to={`${this.props.match.path}/failed`} />
      </Switch>
    )
  }
}

export default withRouter(SwitchDetails);
