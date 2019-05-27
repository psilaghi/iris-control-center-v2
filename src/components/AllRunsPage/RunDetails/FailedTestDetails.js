import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';
import Gallery from 'react-grid-gallery';
import IMAGES from './images';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #d7d7db;
  margin-left: 10px;
  /* min-height: 500px; */
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
const AssertKey = styled.div`
  color: #0060df;
  font-weight: bold;
`;
const AssertValue = styled.div`
  background-color: #f9f9fa;
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
  border-bottom: 1px solid transparent;
  ${props => props.expanded && 'border-color: #D7D7DB;'}
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
  padding: 0 10px 0 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 10px;
  margin-right: -4px;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  :hover {
    border-radius: 50%;
    background-color: rgba(115, 115, 115, 0.2);
  }
  cursor: pointer;
`;
const ImagesContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 36px;
  box-sizing: border-box;
  overflow: auto;
`;
const CloseButton = styled.button`
  border: none;
  padding: 10px;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  color: white;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
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

class FailedTestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertsSection: false,
      detailsSection: false,
      displayImages: false
    };
  }

  toggleCollapse = expandedSection => {
    this.setState({
      [expandedSection]: !this.state[expandedSection]
    });
  };

  renderDetails = (data, keyName, KeyComponent, ValueComponent) => {
    const DetailsComponent = withExpand(props => (
      <Detail>
        <ExpandButton type="button" onClick={props.onToggleClick}>
          <ExpandIcon expanded={props.expanded} icon="CarrotRight" />
        </ExpandButton>
        <KeyComponent>{props.attrName}: </KeyComponent>
        {props.expanded && (
          <ValueComponent>
            {this.renderDetails(data[props.attrName], props.attrName, KeyComponent, ValueComponent)}
          </ValueComponent>
        )}
      </Detail>
    ));

    return (
      <Details key={keyName}>
        {Object.keys(data).map(key =>
          data[key] && typeof data[key] === 'object' ? (
            <DetailsComponent key={key} attrName={key} />
          ) : (
            <Detail key={key}>
              <KeyComponent>{key}: </KeyComponent>
              <ValueComponent>{data[key] + ''}</ValueComponent>
            </Detail>
          )
        )}
      </Details>
    );
  };

  render() {
    const { assert, debug_images, ...details } = this.props.test;

    // const {data, name} = this.props.test;
    const showCarousel = this.props.test.debug_images;
    let images = [];
    var path = this.props.test.debug_image_directory;

    if (showCarousel) {
      var new_path = path.replace(/\\/gi, '/') + '/';
      var final_path = new_path.substring(new_path.indexOf('/runs'), new_path.length);

      this.props.test.debug_images.forEach(item => {
        images.push({
          src: final_path + item,
          thumbnail: final_path + item,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
          caption: item
        });
      });
    }
    return (
      <Container>
        {this.state.displayImages && showCarousel && (
          <ImagesContainer
            onKeyDown={event => event.key === 'Escape' && this.setState({ displayImages: false })}
            tabIndex="0"
          >
            <Gallery images={images} enableImageSelection={false} />
            <CloseButton onClick={() => this.setState({ displayImages: false })}>
              <Icon icon="exit" />
            </CloseButton>
          </ImagesContainer>
        )}
        <TitleSummary>
          <Title>{this.props.test.name}</Title>
          <Description>{this.props.test.description}</Description>
        </TitleSummary>

        <DataContainer expanded={this.state.assertsSection}>
          <AssertSummary>
            <StyledWarningIcon icon="Warning" />
            <span>Failed Assert:&nbsp;</span>
            <span>{this.props.test.assert.message}</span>
          </AssertSummary>
          <ExpandButton type="button" onClick={() => this.toggleCollapse('assertsSection')}>
            <ExpandIcon expanded={this.state.assertsSection} icon="arrowhead-right" />
          </ExpandButton>
        </DataContainer>
        {this.state.assertsSection && this.renderDetails(assert, 'assert', AssertKey, AssertValue)}

        <DataContainer>
          <span>Debug images</span>
          <ThumbnailButton
            type="button"
            title="Open image thumbnails"
            onClick={() => this.setState({ displayImages: true })}
          >
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

export default FailedTestDetails;
