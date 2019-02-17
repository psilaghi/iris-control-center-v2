import * as React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 28px 0 23px;
  overflow: auto;
`;
const CloseButton = styled.button`
  margin: 0 auto;
  margin-right: 0;
  border: none;
  padding: 22px;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Details = styled.div`
  overflow-x: scroll;
  padding-bottom: 30px;
`;

function TestDetails(props) {
  return (
    <Container>
      <CloseButton type="button" onClick={props.onClose}>
        <Icon icon="exit" />
      </CloseButton>
      <h6>Details:</h6>
      <Details>
        {Object.keys(props.test).map(key => (
          <div className="details" key={key}> <i>{key}:</i> {props.test[key].toString()}</div>
        ))}
      </Details>
    </Container>
  );
}

export default TestDetails;
