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

const targets = [
  {path:"/firefox", label: "Firefox", icon: "firefox-logo"}, 
  {path:"/slack", label: "Slack", icon: "slack-logo"}, 
  {path:"/chrome", label: "Chrome", icon: "chrome-logo"}, 
  {path:"/safari", label: "Safari", icon: "safari-logo"}, 
  {path:"/webapp", label: "Web App", icon: "webapp-logo"}];

function Navbar(props) {
  return (
    <Aside className={props.className}>
      <nav>
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
      </nav>
    </Aside>
  );
};

export default Navbar;
