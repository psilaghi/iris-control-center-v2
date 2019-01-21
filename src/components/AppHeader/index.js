import * as React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  align-items: center;
  background-color: #1A1919;
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  height: 150px;
  box-sizing: border-box;
  font-family: 'ZillaSlab';
`;

const HeaderText = styled.div`
  font-size: 94px;
  font-weight: 700;
  color: white;
`;

function AppHeader(props) {
  return (
    <Header className={props.className}>
      <HeaderText>iris</HeaderText>
      <HeaderText>moz://a</HeaderText>
    </Header>
  );
}

export default AppHeader;
