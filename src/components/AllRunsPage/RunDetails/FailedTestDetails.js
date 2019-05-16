import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../Icon';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  border: 1px solid #d7d7db;
  margin-left: 10px;
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 12px;
  padding-left: 10px;
`;
const Title = styled.div`
  font-size: 21px;
  color: #4a4a4f;
  padding-left: 40px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
`;
const DetailTitle = styled.i`
  color: #0060df;
`;
const Description = styled.div`
  font-size: 15px;
  color: #737373;
  white-space: nowrap;
  padding-left: 40px;
`;
const Summary = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 84px;
  background-color: #f9f9fa;
  margin-bottom: 12px;
  overflow: auto;
`;
const AssertSummary = styled.div`
  display: flex;
  align-items: center;
`;
const StyledIcon = styled(Icon)`
  margin: 0 10px;
`;

function FailedTestDetails(props) {
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
      <Summary>
        <Title>{props.test.name}</Title>
        <Description>{props.test.description}</Description>
      </Summary>
      {/* {renderDetails(props.test, 'test')} */}
      <div>
        <AssertSummary>
          <StyledIcon icon="Warning" />
          Failed Assert:
          <span>{props.test.assert.message}</span>
        </AssertSummary>
        {renderDetails(props.test.assert, 'assert')}
      </div>
    </Container>
  );
}

export default FailedTestDetails;
