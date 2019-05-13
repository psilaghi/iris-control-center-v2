import * as React from 'react';
import DetailsHeader from './DetailsHeader';
import Icon from '../../Icon';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import SwitchDetails from './SwitchDetails';

const NoDataContainer = styled.div`
  font-size: 28px;
  color: rgba(215, 215, 219, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 397px;
  border: 1px solid #d7d7db;
`;
const SyledIcon = styled(Icon)`
  font-size: 150px;
`;

class RunDetails extends React.Component {
  render() {
    return (
      <div>
        <DetailsHeader
          {...(this.props.match ? { basePath: this.props.match.url } : { disabled: true })}
        />
        {this.props.match && this.props.match.params.id ? (
          <SwitchDetails key={this.props.match.params.id} />
        ) : (
          <NoDataContainer>
            <SyledIcon icon="PoitingFingerUp" />
            <div>Select a run to see details.</div>
          </NoDataContainer>
        )}
      </div>
    );
  }
}

export default withRouter(RunDetails);
