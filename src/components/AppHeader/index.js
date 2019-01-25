import * as React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  align-items: center;
  background-color: #1A1919;
  box-sizing: border-box;
  display: flex;
  font-family: 'ZillaSlab';
  height: 150px;
  justify-content: space-between;
  padding: 20px 50px;
`;

const HeaderText = styled.div`
  color: white;
  font-size: 94px;
  font-weight: 700;
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
