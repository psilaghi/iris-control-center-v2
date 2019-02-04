import * as React from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import Icon from '../Icon';
import styled from 'styled-components';

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
  display: none;
`;
const SummaryContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  height: 55px;
  background-color: #e5effc;
  &:hover {
    background-color: #c4daf7;
    ${ExpandButton} {
      display: flex;
    }
  }
`;
const Checkbox = styled.input`
  margin: 10px;
  font-size: 16px;
`;
const Container = styled.div`
  margin: 2px 0;
  padding-left: 36px;
`;

const Meta = styled.div`
  font-size: 12px;
  color: gray;
  margin-left: 33px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 20px;
`;

class TestItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  handleChange = (event) => {
    if (event.target.checked) {
      this.props.onChange(this.props.test, 'add');
    } else {
      this.props.onChange(this.props.test, 'remove');
    }
  }

  toggleCollapse = (event) => {
    if (event.target.type !== 'checkbox') {
      this.setState({
        expanded: !this.state.expanded
      });
    }
  }

  render() {
    return (
      <Container>
        <SummaryContainer onClick={this.toggleCollapse}>
          <div>
            <div>
              <Checkbox
                type="checkbox"
                checked={this.props.checked}
                onChange={this.handleChange}
              />
              <span>
                {this.props.test.name}
              </span>
            </div>
            <Meta>
              <span>
                {this.props.test.meta}
              </span>
            </Meta>
          </div>
          <ExpandButton type="button" onClick={this.toggleCollapse}>
            <Icon icon="arrowhead-right" />
          </ExpandButton>
        </SummaryContainer>
        <Collapse isOpen={this.state.expanded}>
          <Card>
            <CardBody>
              <h6>Details:</h6>
              {Object.keys(this.props.test).map(key => (
                <div className="details" key={key}> <i>{key}:</i> {this.props.test[key].toString()}</div>
              ))}
            </CardBody>
          </Card>
        </Collapse>
      </Container>
    );
  }
}

export default TestItem;