import * as React from 'react';
import styled from 'styled-components';
import { Collapse, CardBody, Card } from 'reactstrap';
import TestItem from './TestItem';
import Icon from '../Icon';

const ExpandButton = styled.button`
  margin: auto;
  margin-right: 0;
  border: none;
  padding: 10px;
  background: none;
  color: #0060df;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
  display: flex;
`;
const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  height: 40px;
  background-color: #e5effc;
  &:hover {
    background-color: #c4daf7;
  }
`;
const Checkbox = styled.input`
  margin: 10px;
`;
const Container = styled.div`
  margin: 8px 0;
   .card-body {
    padding: 0;
  }
   .card {
    border: none;
  }
`;

class TestCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleChange = (event) => {
    if (event.target.checked) {
      this.props.onChange(this.props.name, this.props.tests);
    } else {
      this.props.onChange(this.props.name, []);
    }
  }

  toggleCollapse = (event) => {
    if (event.target.type !== 'checkbox') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }

  handleTestSelection = (test, action) => {
    if (action === 'add') {
      this.props.onChange(this.props.name, [...this.props.selectedTests, test])
    } else {
      this.props.onChange(this.props.name, this.props.selectedTests.filter(item => item !== test));
    }
  }

  render() {
    return (
      <Container>
        <SummaryContainer>
          <Checkbox
            type="checkbox"
            checked={this.props.selectedTests.length === this.props.tests.length}
            onChange={this.handleChange}
          />
          <span>
            {this.props.name}
          </span>
          <ExpandButton type="button" onClick={this.toggleCollapse}>
            <Icon icon={this.state.expanded ? 'close' : 'open'} />
          </ExpandButton>
        </SummaryContainer>

        <Collapse isOpen={this.state.expanded}>
          <Card>
            <CardBody>
              {this.props.tests.map(test => (
                <TestItem
                  key={test.name}
                  test={test}
                  checked={this.props.selectedTests.indexOf(test) !== -1}
                  onChange={this.handleTestSelection}
                />
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </Container>
    );
  }
}

export default TestCategory;
