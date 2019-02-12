import * as React from 'react';
import Tests from './Tests';
import Settings from './Settings';
import styled from 'styled-components';
import ApiClient from '../apiClient';
import TestDetails from './TestDetails';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 1fr) minmax(auto, 400px);
`
class NewRunPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {},
      tests: {},
      expandedTest: null
    };
  }

  handleLaunch = () => {
    const {expandedTest, ...data} = this.state;
    ApiClient.post('/go', data);
  }

  handleTestSelection = (selectedTests) => {
    this.setState({
      tests: selectedTests
    });
  }

  handleSettingsSelection = (selectedArgs) => {
    this.setState({
      args: selectedArgs
    });
  }

  handleExpandedTest = (test) => {
    this.setState({
      expandedTest: test
    });
  }

  handleCloseDetails = () => {
    this.setState({
      expandedTest: null
    });
  }

  render() {
    return (
      <MainGrid>
        <Tests
          expandedTest={this.state.expandedTest}
          selections={this.state.tests}
          onSelect={this.handleTestSelection}
          onTestClick={this.handleExpandedTest}
        />
        {this.state.expandedTest ?
          (<TestDetails test={this.state.expandedTest} onClose={this.handleCloseDetails}/>) :
          (<Settings
            selections={this.state.args}
            onLaunch={this.handleLaunch}
            onSelect={this.handleSettingsSelection}
          />)}
      </MainGrid>
    );
  }
}

export default NewRunPage;
