import * as React from 'react';

class AllTests extends React.Component {
  render() {
    return (
      <div>
        {this.props.details.tests && this.props.details.tests.all_tests.map(item =>
          <div>{item.name}</div>
        )}
      </div>
    )
  }
}

export default AllTests;
