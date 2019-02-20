import * as React from 'react';
import TestCategory from '../TestCategory';
import styled from 'styled-components';

const ContentContainer = styled.div`
  border-right: 1px solid lightgray;
  box-sizing: border-box;
  padding: 50px;
  overflow-y: auto;
`;
const Title = styled.h1`
  color: #737373;
  font-size: 28px;
  font-weight: normal;
  margin-bottom: 40px;
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
      event.target.checked ? this.props.tests : {}
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
            checked={this.props.tests === this.props.selections}
            type="checkbox"
            onChange={this.handleSelectAll}
          />
          <Span>
            Select all tests
          </Span>
        </Label>
        <Hr/>
        {this.props.tests.map(categoryName => (
          <TestCategory
            key={categoryName}
            name={categoryName}
            tests={this.props.tests[categoryName] || []}
            onChange={this.handleTestSelection}
            selectedTests={this.props.selections[categoryName] || []}
            onTestClick={this.props.onTestClick}
            expandedTest={this.props.expandedTest}
          />
        ))}
      </ContentContainer>
    );
  }
}

export default Tests;
