import * as React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 28px 0 23px;
  overflow: auto;
`;
const CloseButton = styled.button`
  margin: 0 auto;
  margin-right: 0;
  border: none;
  padding: 0 0 19px 0;
  background: none;
  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 12px;
`;
const Title = styled.div`
  font-size: 18px;
  padding-bottom: 15px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
`;
const DetailTitle = styled.i`
  color: #0060df;
`;

function TestDetails(props) {
  return (
    <Container>
      <CloseButton type="button" onClick={props.onClose}>
        <Icon icon="exit" />
      </CloseButton>
      <Title>{props.test.name}</Title>
      <Details>
        {Object.keys(props.test).map(key =>
          typeof props.test[key] === 'object' ? (
            Object.keys(props.test[key]).map(objKey => (
              <Detail key={objKey}>
                <DetailTitle>{objKey}: </DetailTitle>
                {props.test[key][objKey]}
              </Detail>
            ))
          ) : (
            <Detail key={key}>
              <DetailTitle>{key}: </DetailTitle>
              {props.test[key]}
            </Detail>
          )
        )}
      </Details>
    </Container>
  );
}

export default TestDetails;
