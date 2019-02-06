import * as React from 'react';
import Tests from './Tests';
import Settings from './Settings';
import styled from 'styled-components';
import ApiClient from '../apiClient';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 1fr) minmax(auto, 400px);
`
class NewRunPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {},
      tests: {}
    };
  }

  handleSubmit = () => {
    ApiClient.post('/go',this.state);
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

  render() {
    return (
      <MainGrid>
        <Tests onSelect={this.handleTestSelection} selections={this.state.tests} />
        <Settings onSelect={this.handleSettingsSelection} selections={this.state.args}/>
      </MainGrid>
    );
  }
}

export default NewRunPage;
