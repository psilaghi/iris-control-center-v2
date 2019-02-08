import * as React from 'react';
import TestCategory from '../TestCategory';
import ApiClient from '../apiClient';
import styled from 'styled-components';

function TestDetails(props) {
  return (
    <div>
      <h6>Details:</h6>
      {Object.keys(props.test).map(key => (
        <div className="details" key={key}> <i>{key}:</i> {props.test[key].toString()}</div>
      ))}
    </div>
  );
}

export default TestDetails;
