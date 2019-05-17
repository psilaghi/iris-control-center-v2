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
  font-size: 12px;
  /* padding-left: 10px; */
  background-color: #f9f9fa;
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
const DetailTitle = styled.i`
  color: #0060df;
`;
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
const AssertContainer = styled.div`
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
`;
const AssertSummary = styled.div`
  display: flex;
  align-items: center;
`;
const StyledWarningIcon = styled(Icon)`
  margin-right: 10px;
`;
const ExpandIcon = styled(Icon)`
  ${props => props.expanded && 'transform: rotate(90deg);'}
`;
const ExpandButton = styled.button`
  border: none;
  padding: 10px;
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
  padding: 10px;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  cursor: pointer;
`;

class FailedTestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleCollapse = event => {
    if (event.target.type !== 'checkbox') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  };

  renderDetails = (data, keyName) => (
    <Details key={keyName}>
      {Object.keys(data).map(key =>
        data[key] && typeof data[key] === 'object' ? (
          <Detail key={key}>
            <DetailTitle>{key}: </DetailTitle>
            {this.renderDetails(data[key], key)}
          </Detail>
        ) : (
          <Detail key={key}>
            <DetailTitle>{key}: </DetailTitle>
            {data[key] + ''}
          </Detail>
        )
      )}
    </Details>
  );

  render() {
    const { assert, debug_images, ...details } = this.props.test;
    return (
      <Container>
        <TitleSummary>
          <Title>{this.props.test.name}</Title>
          <Description>{this.props.test.description}</Description>
        </TitleSummary>

        <AssertContainer>
          <AssertSummary>
            <StyledWarningIcon icon="Warning" />
            <span>Failed Assert:&nbsp;</span>
            <span>{this.props.test.assert.message}</span>
          </AssertSummary>
          <ExpandButton type="button" onClick={this.toggleCollapse}>
            <ExpandIcon expanded={this.state.expanded} icon="arrowhead-right" />
          </ExpandButton>
        </AssertContainer>
        {this.state.expanded && this.renderDetails(assert, 'assert')}

        <AssertContainer>
          <span>Debug images</span>
          <ThumbnailButton type="button">
            <Icon icon="ThumbnailIcon" />
          </ThumbnailButton>
        </AssertContainer>

        <AssertContainer>
          <span>Details</span>
          <ExpandButton type="button" onClick={this.toggleCollapse}>
            <ExpandIcon expanded={this.state.expanded} icon="arrowhead-right" />
          </ExpandButton>
        </AssertContainer>
        {this.state.expanded && this.renderDetails(details, 'assert')}
      </Container>
    );
  }
}

export default FailedTestDetails;
