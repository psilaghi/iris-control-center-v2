import * as React from 'react';
import TestCategory from '../TestCategory';
import ApiClient from '../apiClient';
import styled from 'styled-components';

const ContentContainer = styled.div`
  box-sizing: border-box;
  padding: 50px;
`;

class Tests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: {}
    };
  }

  componentDidMount() {
    ApiClient.get('/data/all_tests.json').then(response => this.setState({tests: response}));
  }

  handleTestSelection = (categoryName, selectedTests) => {
    let tests;
    if (!selectedTests.length) {
      tests = {
        ...this.props.selections
      };
      delete tests[categoryName];
    } else {
      tests = {
        ...this.props.selections,
        [categoryName]: selectedTests
      }
    }

    this.props.onSelect(tests);
  }

  render() {
    return (
      <ContentContainer>
        {Object.keys(this.state.tests).map(categoryName => (
          <TestCategory
            key={categoryName}
            name={categoryName}
            tests={this.state.tests[categoryName] || []}
            onChange={this.props.onSelect}
            selectedTests={this.props.selections[categoryName] || []}
          />
        ))}
      </ContentContainer>
    );
  }
}

export default Tests;
