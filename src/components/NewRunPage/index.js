import * as React from 'react';
import Tests from './Tests';
import Settings from './Settings';
import styled from 'styled-components';
import ApiClient from '../apiClient';
import TestDetails from './TestDetails';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(500px, 1fr) 400px;
  height: 100%;
`
class NewRunPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      args: {},
      tests: {},
      expandedTest: null,
      targetData: null,
      allData: {},
      selectedItems: {}
    };
  }

  componentDidMount() {
    ApiClient.get('/data/targets.json').then(response => {
      const target = response.targets.find(item =>
        item.name.toLowerCase() === this.props.match.params.target
      );
      this.setState({allData: response.targets, targetData: target});
    });
  }
 componentWillReceiveProps(newProps){
   if(newProps.match.params.target !== this.props.match.params.target){
    const target = this.state.allData.find(item =>
      item.name.toLowerCase() === newProps.match.params.target
    );
    this.setState({ targetData: target});
   }
 }
  handleLaunch = () => {
    const {expandedTest, ...data} = this.state;
    ApiClient.post('/go', data);
  }

  handleTestSelection = (selectedTests) => {
    this.setState({
      selectedItems: selectedTests
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
        {this.state.targetData ? (
          <React.Fragment>
            <Tests
              expandedTest={this.state.expandedTest}
              selectedItems={this.state.selectedItems}
              onSelect={this.handleTestSelection}
              onTestClick={this.handleExpandedTest}
              tests={this.state.targetData.tests}
            />
            {this.state.expandedTest ?
              (<TestDetails test={this.state.expandedTest} onClose={this.handleCloseDetails}/>) :
              (<Settings
                selections={this.state.args}
                onLaunch={this.handleLaunch}
                onSelect={this.handleSettingsSelection}
                settings={this.state.targetData.settings}
              />)
            }
          </React.Fragment>
        ) : (
          <span>Loading data...</span>
        )}

      </MainGrid>
    );
  }
}

export default NewRunPage;
