import * as React from 'react';
import DetailsHeader from './DetailsHeader';
import FailedTests from './FailedTests';
import AllTests from './AllTests';
import Details from './Details';
import Icon from '../../Icon';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import ApiClient from '../../apiClient';

const NoDataContainer = styled.div`
  font-size: 28px;
  color: rgba(215,215,219,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 397px;
  border: 1px solid #D7D7DB;
`;
const SyledIcon = styled(Icon)`
  font-size: 150px;
`;

class RunDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {details: {}};
  }

  componentDidMount() {
    ApiClient.get(`/runs/${this.props.match.params.id}/run.json`).then(response => this.setState({details: response}));
  }

  render() {
    return (
      <div>
        <DetailsHeader {...(this.props.match ? {basePath: this.props.match.url} : {disabled: true})}/>
        {(this.props.match && this.props.match.params.id) ? (
          <Switch>
            <Route path={`${this.props.match.path}/failed`} render={ _ => <FailedTests details={this.state.details} />} />
            <Route path={`${this.props.match.path}/tests`} component={AllTests} />
            <Route path={`${this.props.match.path}/details`} component={Details} />
            <Redirect to={`${this.props.match.path}/failed`} />
          </Switch>
        ) : (
        <NoDataContainer>
          <SyledIcon icon="PoitingFingerUp"/>
          <div>
            Select a run to see details.
          </div>
        </NoDataContainer>)}
      </div>
    )
  }
}

export default withRouter(RunDetails);
