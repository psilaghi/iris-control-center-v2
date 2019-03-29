import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNav = styled.nav`
  box-shadow: none;
  border-bottom: 2px solid rgba(215, 215, 219, 0.5);
  font-size: 18px;
  font-weight: bold;
  color: #B1B1B3;
  margin: 35px 50px 13px 50px;
`;

const StyledNavLink = styled(NavLink)`
  box-shadow: none;
  margin-right: 60px;
  &:active,
  &:link,
  &:hover,
  &:visited {
    color: inherit;
    text-decoration: none;
  }
  &.active {
    color: black;
    border-bottom: 3px solid #0060DF;
  }
  ${props => props.disabled && 'pointer-events: none;'}
`;

const StyledUl = styled.ul`
  margin: 0;
  padding: 0;
`;
const StyledLi = styled.li`
  display: inline;
`;


class DetailsHeader extends React.Component {
  render() {
    return (
      <StyledNav>
        <StyledUl>
          <StyledLi><StyledNavLink to={`${this.props.basePath}/failed`} disabled={this.props.disabled}>Failed Tests</StyledNavLink></StyledLi>
          <StyledLi><StyledNavLink to={`${this.props.basePath}/tests`} disabled={this.props.disabled}>All Tests</StyledNavLink></StyledLi>
          <StyledLi><StyledNavLink to={`${this.props.basePath}/details`} disabled={this.props.disabled}>Run Details</StyledNavLink></StyledLi>
        </StyledUl>
      </StyledNav>
    )
  }
}

export default DetailsHeader;
