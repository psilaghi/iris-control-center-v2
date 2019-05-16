import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* display: flex;
    flex-direction: column; */
  overflow: auto;
  border: 1px solid #d7d7db;
  /* margin-left: 10px; */
  padding: 10px;
`;
const Details = styled.div`
  word-wrap: break-word;
  font-size: 12px;
  padding-left: 10px;
`;
const Detail = styled.div`
  padding-bottom: 12px;
  float: right;
  width: 50%;
  &:nth-child(odd) {
    float: left;
  }
`;
const DetailTitle = styled.i`
  color: #0060df;
`;

function SelectedRunDetails(props) {
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
              {data[key] + ''}
            </Detail>
          )
        )}
      </Details>
    );
  };
  return <Container>{props.details && renderDetails(props.details, 'details')}</Container>;
}

export default SelectedRunDetails;
