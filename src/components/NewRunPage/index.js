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

  componentDidMount() {
    ApiClient.get('/data/all_args.json').then(response => {
      const defaults = {};
      for (let key in response) {
        defaults[key] = (response[key].type === 'bool' ? (response[key].default === 'true') : response[key].default);
      }
      this.setState({
        args: response,
        newRun: {
          ...this.state.newRun,
          ...defaults
        }
      });
    });
  }

  handleChange = (name, value) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [name]: value
      }
    });
  }

  handleCheckboxChange = (event) => {
    this.setState({
      newRun: {
        ...this.state.newRun,
        [event.target.name]: event.target.checked ? true : false
      }
    });
  }

  handleSubmit = () => {
    ApiClient.post('/go',this.state);
  }

  handleCancel = () => {
    ApiClient.get('/cancel');
  }

  handleTestSelection = (categoryName, selectedTests) => {
    let tests;
    if (!selectedTests.length) {
      tests = {
        ...this.state.tests
      };
      delete tests[categoryName];
    } else {
      tests = {
        ...this.state.tests,
        [categoryName]: selectedTests
      }
    }

    this.setState({
      tests: tests
    });
  }

  render() {
    return (
      <MainGrid>
        <Tests onSelect={this.handleTestSelection} selections={this.state.tests} />
        <Settings />
      </MainGrid>
    );
  }
}

export default NewRunPage;
