import * as React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  box-shadow: none;
  border-bottom: 2px solid rgba(215, 215, 219, 0.5);
  font-size: 18px;
  font-weight: bold;
  color: #B1B1B3;
  /* margin-bottom: 10px; */
  margin: 50px;
`;

const HeaderText = styled.div`
  display: inline;
  box-shadow: none;
  margin-right: 60px;
  :hover {
    color: black;
    border-bottom: 3px solid #0060DF;
  }
`;

class RunDetails extends React.Component {
  render() {
    return (
      <Header>
        <HeaderText>Failed Tests</HeaderText>
        <HeaderText>All Tests</HeaderText>
        <HeaderText>Run Details</HeaderText>
      </Header>
    )
  }
}

export default RunDetails;
