import * as React from 'react';
import styled from 'styled-components';
import NavbarItem from './NavbarItem';
import { Route } from 'react-router-dom';

const Aside = styled.aside`
	width: 271px;
  background-color: #D7D7DB;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Nav = styled.nav`
  width: 100%;
`;
const targets = [
  {path:"/firefox", label: "Firefox", icon: "firefox-logo"}, 
  {path:"/slack", label: "Slack", icon: "slack-logo"}, 
  {path:"/chrome", label: "Chrome", icon: "chrome-logo"}, 
  {path:"/safari", label: "Safari", icon: "safari-logo"}, 
  {path:"/webapp", label: "Web App", icon: "webapp-logo"}];

function Navbar(props) {
  return (
    <Aside className={props.className}>
      <Nav>
        <Ul>
          <Route path="/runs">
            <NavbarItem label="All Runs" basePath="/runs"/>
          </Route>
          
          <Route path="/new">
            <NavbarItem 
              label="Create New Run" 
              basePath="/new" 
              sublinks={targets} 
            />
          </Route>
        </Ul>
      </Nav>
    </Aside>
  );
};

export default Navbar;
