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

const QuitButton = styled.button`
  background-color: #fb003b;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
  color: white;
  font-size: 21px;
  height: 62px;	
  margin: 20px;
  width: 150px;	
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
      <QuitButton type="button">Quit Iris</QuitButton>
    </Aside>
  );
};

export default Navbar;
