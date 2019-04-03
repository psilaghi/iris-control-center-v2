import * as React from 'react';

class FailedTests extends React.Component {
  render() {
    return (
      <div>
        {this.props.details.tests && this.props.details.tests.failed_tests.map(item =>
          <div>{item.name}</div>
        )}
      </div>
    )
  }
}

export default FailedTests;
