import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NavbarItem from './NavbarItem';
import { Route } from 'react-router-dom';

const Aside = styled.aside`
	width: 271px;
	background-color: #D7D7DB;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

function Navbar(props) {
  return (
    <Aside className={props.className}>
      <nav>
        <Ul>
          <Route path="/runs">
            <NavbarItem label="All Runs" basePath="/runs"/> 
            {/* adaugam un sublinks la comp de navbarItem     */}
          </Route>
          
          <Route path="/new">
            <NavbarItem label="Create New Run" basePath="/new"/>     
          </Route>
        </Ul>
      </nav>
    </Aside>
  );
}

export default Navbar;
