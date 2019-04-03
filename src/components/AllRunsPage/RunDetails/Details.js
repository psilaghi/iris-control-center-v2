import * as React from 'react';

class Details extends React.Component {
  render() {
    return (
      <div>
        {this.props.details.meta && Object.keys(this.props.details.meta).map(item => (
          <div>{item}</div>
        ))}
      </div>
    )
  }
}

export default Details;
