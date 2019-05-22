import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const Container = styled.div`
  overflow: auto;
  border: 1px solid #d7d7db;
  padding: 10px;
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 15px;
  padding-left: 10px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
  float: right;
  width: 50%;
  &:nth-child(odd) {
    float: left;
  }
`;
const DetailTitle = styled.i`
  color: #0060df;
`;
const ExpandIcon = styled(Icon)`
  ${props => props.expanded && 'transform: rotate(90deg);'}
`;
const ExpandButton = styled.button`
  border: none;
  padding: 10px 10px 10px 0;
  background: none;
  color: #0060df;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  cursor: pointer;
`;
const DetailKey = styled.i`
  color: #0060df;
`;
const DetailValue = styled.span``;
const ViewLogButton = styled.button`
  height: 32px;
  width: 132px;
  border: none;
  border-radius: 4px;
  background-color: rgba(12, 12, 13, 0.1);
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  :hover {
    background: #979797;
    cursor: pointer;
  }
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
`;
const LogIcon = styled(Icon)`
  margin-left: 12px;
`;

// function SelectedRunDetails(props) {
//   const renderDetails = (data, keyName) => {
//     return (
//       <Details key={keyName}>
//         {Object.keys(data).map(key =>
//           data[key] && typeof data[key] === 'object' ? (
//             <Detail key={key}>
//               <DetailTitle>{key}: </DetailTitle>
//               {renderDetails(data[key], key)}
//             </Detail>
//           ) : (
//             <Detail key={key}>
//               <DetailTitle>{key}: </DetailTitle>
//               {data[key] + ''}
//             </Detail>
//           )
//         )}
//       </Details>
//     );
//   };
//   return <Container>{props.details && renderDetails(props.details, 'details')}</Container>;
// }

// export default SelectedRunDetails;

const withExpand = WrappedComponent => {
  class WithExpand extends React.Component {
    state = {
      expanded: false
    };

    handleToggleClick = () => {
      this.setState({
        expanded: !this.state.expanded
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.props}
          expanded={this.state.expanded}
          onToggleClick={this.handleToggleClick}
        />
      );
    }
  }

  return WithExpand;
};

class SelectedRunDetails extends React.Component {
  openLog = () => {};

  renderDetails = (data, keyName, KeyComponent, ValueComponent) => {
    const DetailsComponent = withExpand(props => {
      debugger;
      return (
        <Details key={keyName}>
          {Object.keys(data).map(key =>
            data[key] && typeof data[key] === 'object' ? (
              <Detail key={key}>
                <ExpandButton type="button" onClick={props.onToggleClick}>
                  <ExpandIcon expanded={props.expanded} icon="CarrotRight" />
                </ExpandButton>
                <KeyComponent>{key}: </KeyComponent>
                {props.expanded && (
                  <ValueComponent>
                    {this.renderDetails(data[key], key, KeyComponent, ValueComponent)}
                  </ValueComponent>
                )}
              </Detail>
            ) : (
              <Detail key={key}>
                <KeyComponent>{key}: </KeyComponent>
                <ValueComponent>{data[key] + ''}</ValueComponent>
              </Detail>
            )
          )}
        </Details>
      );
    });
    return <DetailsComponent />;
  };

  render() {
    // const { assert, debug_images, ...details } = this.props.test;
    return (
      <Container>
        {this.props.details &&
          this.renderDetails(this.props.details, 'details', DetailKey, DetailValue)}
        <ViewLogButton type="button" onClick={this.openLog}>
          View Log
          <LogIcon icon="trashcanblack" />
        </ViewLogButton>
      </Container>
    );
  }
}

export default SelectedRunDetails;
