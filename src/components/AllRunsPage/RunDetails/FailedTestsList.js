import * as React from 'react';

class FailedTestsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.list && this.props.list.map(item =>
          <div>
            {item.children.map(testItem =>
              <div onClick={() => this.props.onSelect(testItem)}>{testItem.name}</div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default FailedTestsList;
