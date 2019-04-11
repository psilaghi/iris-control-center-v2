import * as React from 'react';
import styled from 'styled-components';
import FailedTestsList from './FailedTestsList';
import FailedTestDetails from './FailedTestDetails';

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(500px, 1fr) 400px;
    height: 100%;
`;

class FailedTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainGrid>
        <FailedTestsList
          list={this.props.details}
          onTestClick={selectedTests => this.setState({ selectedTests })}
          expanded={this.state.expanded}
          onExpand={expanded => this.setState({ expanded })}
        />
        <FailedTestDetails details={this.state.selectedTests} />
      </MainGrid>
    )
  }
}

export default FailedTests;
