import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #d7d7db;
  margin-left: 10px;
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 15px;
  margin: 10px;
`;
const Title = styled.div`
  font-size: 21px;
  color: #4a4a4f;
  padding-left: 40px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
`;
const DetailKey = styled.i`
  color: #0060df;
`;
const DetailValue = styled.span``;
const Description = styled.div`
  font-size: 15px;
  color: #737373;
  white-space: nowrap;
  padding-left: 40px;
`;
const TitleSummary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 84px;
  background-color: #f9f9fa;
  overflow: auto;
`;
const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #e6e6e6;
  }
  height: 40px;
  padding: 0 30px 0 10px;
  margin: 10px 0;
  font-size: 18px;
  ${props => props.expanded && 'border-bottom: 1px solid #D7D7DB;'}
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
const ThumbnailButton = styled.button`
  border: none;
  padding: 10px 6px 10px 10px;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  cursor: pointer;
`;

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

class AllTestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertsSection: false,
      detailsSection: false
    };
  }

  toggleCollapse = expandedSection => {
    this.setState({
      [expandedSection]: !this.state[expandedSection]
    });
  };

  renderDetails = (data, keyName, KeyComponent, ValueComponent) => {
    const DetailsComponent = withExpand(props => {
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
    const { assert, debug_images, ...details } = this.props.test;
    return (
      <Container>
        <TitleSummary>
          <Title>{this.props.test.name}</Title>
          <Description>{this.props.test.description}</Description>
        </TitleSummary>

        <DataContainer>
          <span>Debug images</span>
          <ThumbnailButton type="button">
            <Icon icon="ThumbnailIcon" />
          </ThumbnailButton>
        </DataContainer>

        <DataContainer expanded={this.state.detailsSection}>
          <span>Details</span>
          <ExpandButton type="button" onClick={() => this.toggleCollapse('detailsSection')}>
            <ExpandIcon expanded={this.state.detailsSection} icon="arrowhead-right" />
          </ExpandButton>
        </DataContainer>
        {this.state.detailsSection &&
          this.renderDetails(details, 'details', DetailKey, DetailValue)}
      </Container>
    );
  }
}

export default AllTestDetails;
