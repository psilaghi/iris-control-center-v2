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
  font-size: 15px;
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

const MarginContainer = styled.div`
  margin-left: 36px;
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
      this.props.onChange(this.props.name, this.props.data.children);
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
    debugger;
    if (action === 'add') {
      this.props.onChange(this.props.name, [...this.props.selectedItems, test])
    } else {
      this.props.onChange(this.props.name, this.props.selectedItems.filter(item => item !== test));
    }
  }

  handleCategorySelection = (categoryName, selectedTests) => {
    this.props.onChange(this.props.name, selectedTests);
  }

  render() {
    const isCategory = !!this.props.data.children;
    const isDisabled = isCategory && !!this.props.data.children.length;
    const isCategoryChecked = isCategory && !isDisabled && 
      this.props.selectedItems.length === this.props.data.children.length;
   debugger;
    return (
      <Container>
        {isCategory && 
          <SummaryContainer>
            <Checkbox
              type="checkbox"
              disabled={!isDisabled}
              checked={isCategoryChecked}
              onChange={this.handleChange}
            />
            <span>
              {this.props.name}
            </span>
            <ExpandButton type="button" onClick={this.toggleCollapse}>
              <Icon icon={this.state.expanded ? 'close' : 'open'} />
            </ExpandButton>
          </SummaryContainer>
        }

        {isCategory &&
          <Collapse isOpen={this.state.expanded}>
            <Card>
              <CardBody>
                  {this.props.data.children.map(
                    item => (
                    <MarginContainer key={item.name}>
                      <TestCategory
                        key={item.name}
                        name={item.name}
                        data={item}
                        onChange={this.handleCategorySelection}
                        selectedItems={this.props.selectedItems || []}
                        onTestClick={this.props.onTestClick}
                        expandedTest={this.props.expandedTest}
                      />
                    </MarginContainer>
                    )
                  )}
              </CardBody>
            </Card>
          </Collapse>
        }
        {!isCategory &&
          <TestItem
              key={this.props.data.name}
              test={this.props.data}
              checked={this.props.selectedItems.find(item => item.name === this.props.data.name)}
              onChange={this.handleTestSelection}
              onTestClick={this.props.onTestClick}
              selected={this.props.data===this.props.expandedTest}
            />
        }
      </Container>
    );
  }
}

export default TestCategory;
