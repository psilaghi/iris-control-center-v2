import * as React from 'react';
import TestCategory from '../TestCategory';
import ApiClient from '../apiClient';
import styled from 'styled-components';

const ContentContainer = styled.div`
  box-sizing: border-box;
  padding: 50px;
`;
const Title = styled.h1`
  color: #737373;
  font-size: 28px;
  font-weight: normal;
`;
const SelectAllCheckbox = styled.input`
  margin: 10px;
`;
const Span = styled.span`
  font-size: 20px;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  margin: 0;
`;
const Hr = styled.hr`
  margin: 0;
  background-color: #0060DF;
  height: 1px;
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

  handleSelectAll = (event) => {
    this.props.onSelect(
      event.target.checked ? this.state.tests : {}
    );
  }

  render() {
    return (
      <ContentContainer>
        <Title>
          Tests
        </Title>
        <Label>
          <SelectAllCheckbox 
            checked={this.state.tests === this.props.selections} 
            type="checkbox" 
            onChange={this.handleSelectAll} 
          />
          <Span>
            Select all tests
          </Span>
        </Label>
        <Hr/>
        {Object.keys(this.state.tests).map(categoryName => (
          <TestCategory
            key={categoryName}
            name={categoryName}
            tests={this.state.tests[categoryName] || []}
            onChange={this.handleTestSelection}
            selectedTests={this.props.selections[categoryName] || []}
          />
        ))}
      </ContentContainer>
    );
  }
}

export default Tests;
