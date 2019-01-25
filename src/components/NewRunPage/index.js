import * as React from 'react';
import Tests from './Tests';
import Settings from './Settings';
import styled from 'styled-components';

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;

`

function NewRunPage(props) {
  return (
    <MainGrid>
      <Tests />
      <Settings />
    </MainGrid>
  );
}

export default NewRunPage;
