import * as React from 'react';

class FailedTests extends React.Component {
  render() {
    return (
      <div>
        {/* {console.log(this.props.details)} */}
        {this.props.details.map(item =>
          <div>{item}</div>
        )}
      </div>
    )
  }
}

export default FailedTests;
