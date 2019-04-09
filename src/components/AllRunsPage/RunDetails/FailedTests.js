import * as React from 'react';
import CheckboxTree from '../../tree/CheckboxTree';
import styled from 'styled-components';
import FailedTestsList from './FailedTestsList';
import FailedTestDetails from './FailedTestDetails';

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(500px, 1fr) 400px;
    height: 100%;
`;

class FailedTests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <MainGrid>
        {/* {this.props.details && this.props.details.map(item =>
          <div>{item.name}</div>
        )}
        {this.props.details && (
        <CheckboxTree
          nodes={this.props.details}
          checked={this.props.checked}
          expanded={this.props.expanded}
          onCheck={this.props.onCheck}
          onExpand={this.props.onExpand}
          onTestClick={this.props.onTestClick}
        />)} */}
        <FailedTestsList list={this.props.details} onSelect={selectedTests => this.setState({ selectedTests })} />
        <FailedTestDetails details={this.state.selectedTests} />
      </MainGrid>
    )
  }
}

export default FailedTests;
