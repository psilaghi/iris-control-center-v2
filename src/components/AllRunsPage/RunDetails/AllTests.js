import * as React from 'react';

class AllTests extends React.Component {
  render() {
    return (
      <div>
        {this.props.details && this.props.details.map(item =>
          <div>{item.name}</div>
        )}
      </div>
    )
  }
}

export default AllTests;
