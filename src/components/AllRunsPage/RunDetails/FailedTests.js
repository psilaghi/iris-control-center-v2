import * as React from 'react';
import styled from 'styled-components';
import FailedTestsList from './FailedTestsList';
import FailedTestDetails from './FailedTestDetails';
import Icon from '../../Icon';

const MainGrid = styled.div`
  display: grid;
  /* grid-template-columns: minmax(500px, 1fr) 400px; */
  grid-template-columns: 30% 1fr;
  /* height: 500px; */
`;
const NoSelection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d7db;
  margin-left: 10px;
  min-height: 150px;
`;
const SyledIcon = styled(Icon)`
  font-size: 100px;
`;
const NoDataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d7db;
  min-height: 150px;
  font-size: 28px;
  color: rgba(215, 215, 219, 0.5);
`;

class FailedTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleExpandedTest = test => {
    this.setState({
      expandedTest: test
    });
  };

  render() {
    return this.props.details.length ? (
      <MainGrid>
        <React.Fragment>
          <FailedTestsList
            list={this.props.details}
            onTestClick={this.handleExpandedTest}
            expanded={this.state.expanded}
            onExpand={expanded => this.setState({ expanded })}
            selectedTest={(this.state.expandedTest || {}).name}
          />
          {this.state.expandedTest ? (
            <FailedTestDetails test={this.state.expandedTest.data} />
          ) : (
            <NoSelection>
              <SyledIcon icon="PoitingFingerLeft" />
            </NoSelection>
          )}
        </React.Fragment>
      </MainGrid>
    ) : (
      <NoDataContainer>No failures</NoDataContainer>
    );
  }
}

export default FailedTests;
