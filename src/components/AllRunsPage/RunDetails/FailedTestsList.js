import * as React from 'react';
import CheckboxTree from '../../tree/CheckboxTree';

class FailedTestsList extends React.Component {
  render() {
    return (
      <div>
        {/* {this.props.list && this.props.list.map(item =>
          <div>
            {item.children.map(testItem =>
              <div onClick={() => this.props.onSelect(testItem)}>{testItem.name}</div>
            )}
          </div>
        )} */}
        {this.props.list && (
        <CheckboxTree
          nodes={this.props.list}
          checked={this.props.checked}
          expanded={this.props.expanded}
          onCheck={this.props.onCheck}
          onExpand={this.props.onExpand}
          onTestClick={this.props.onTestClick}
        />)}
      </div>
    )
  }
}

export default FailedTestsList;
