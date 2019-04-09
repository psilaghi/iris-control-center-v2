import * as React from 'react';

class FailedTestDetails extends React.Component {
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

export default FailedTestDetails;
