import * as React from 'react';
import { useState } from 'react';
import Icon from '../Icon';
import { NavLink, withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';

const Span = styled.span`
  font-size: 21px;
`;

const Li = styled.li`
  ${props => props.selected && `
    box-shadow: inset 8px 0px 0px 0px rgba(69,161,255,1);
    background-color: white;
    font-weight: bold;
  `}
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &:active,
  &:link,
  &:visited {
    color: inherit;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 30px;
`;
const StyledSubNavLink = styled(NavLink)`
  text-decoration: none;
  &:active,
  &:link,
  &:visited {
    color: inherit;
  }
  padding: 10px 20px 10px 30px;
  display: flex;
  align-items: center;
  ${Span} {
    padding: 7px 0 7px 17px;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 10px;
  font-size: 17px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #EDEDF0;
`;

function NavbarItem(props) {
  const [expanded, setExpanded] = useState(!!props.match || false);
  
  return (
    <Li selected={props.match}>
      <StyledNavLink to={props.basePath}>
        <Span>{props.label}</Span>
        <Button type="button" onClick={event => {
          event.preventDefault();
          setExpanded(!expanded);
        }}>
          <Icon icon={expanded ? 'close' : 'open'} />
        </Button>
      </StyledNavLink>
      {expanded && props.sublinks && (
        <Ul>
          {props.sublinks.map(item => (
            <li>
              <StyledSubNavLink to={`${props.basePath}${item.path}`}>
                <Icon icon={item.icon} size="2x" />
                <Span>
                  {item.label}
                </Span>
              </StyledSubNavLink>
            </li>
          ))}
        </Ul>
      )}
    </Li>
  );
}

export default withRouter(NavbarItem);
