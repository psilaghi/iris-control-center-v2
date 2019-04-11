import * as React from 'react';

class FailedTestDetails extends React.Component {
  render() {
    return (
      <div>
        {this.props.details && Object.keys(this.props.details).map(item =>
          <div>
            <div>{item}: </div>
            {this.props.details[item]}
          </div>
        )}
      </div>
    )
  }
}

export default FailedTestDetails;
