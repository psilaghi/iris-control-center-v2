import * as React from 'react';

class Details extends React.Component {
  render() {
    return (
      <div>
        {this.props.details && Object.keys(this.props.details).map(item => (
          <div>{item}</div>
        ))}
      </div>
    )
  }
}

export default Details;
