import * as React from 'react';
import DetailsHeader from './DetailsHeader';
import FailedTests from './FailedTests';
import AllTests from './AllTests';
import Details from './Details';
import Icon from '../../Icon';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const NoDataContainer = styled.div`
  font-size: 28px;
  color: rgba(215,215,219,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 397px;
  border: 1px solid #D7D7DB;
`

class RunDetails extends React.Component {
  render() {
    return (
      <div>
        <DetailsHeader {...(this.props.match ? {basePath: this.props.match.url} : {disabled: true})}/>
        {(this.props.match && this.props.match.params.id) ? (
          <Switch>
            <Route path={`${this.props.match.path}/failed`} component={FailedTests} />
            <Route path={`${this.props.match.path}/tests`} component={AllTests} />
            <Route path={`${this.props.match.path}/details`} component={Details} />
            <Redirect to={`${this.props.match.path}/failed`} />
          </Switch>
        ) : (<NoDataContainer><Icon icon="PoitingFingerUp"/>Select a run to see details.</NoDataContainer>)}
      </div>
    )
  }
}

export default withRouter(RunDetails);
