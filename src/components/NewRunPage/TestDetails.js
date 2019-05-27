import * as React from 'react';
import styled from 'styled-components';
import Icon from '../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px 28px 0 13px;
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
  color: #0060df;
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 12px;
  padding-left: 10px;
`;
const Title = styled.div`
  font-size: 18px;
  padding-bottom: 15px;
  padding-left: 10px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
`;
const DetailTitle = styled.i`
  color: #0060df;
`;

function TestDetails(props) {
  const renderDetails = (data, keyName) => {
    return (
      <Details key={keyName}>
        {Object.keys(data).map(key =>
          data[key] && typeof data[key] === 'object' ? (
            <Detail key={key}>
              <DetailTitle>{key}: </DetailTitle>
              {renderDetails(data[key], key)}
            </Detail>
          ) : (
            <Detail key={key}>
              <DetailTitle>{key}: </DetailTitle>
              {data[key] || 'null'}
            </Detail>
          )
        )}
      </Details>
    );
  };

  return (
    <Container>
      <CloseButton type="button" onClick={props.onClose}>
        <Icon icon="exit" />
      </CloseButton>
      <Title>{props.test.name}</Title>
      {renderDetails(props.test, 'test')}
    </Container>
  );
}

export default TestDetails;
