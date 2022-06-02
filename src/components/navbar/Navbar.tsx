import React, { Fragment } from "react";

import StyledLink from "components/Link.styles";
import Paths from "router/paths";
import User from "types/user";
import StyledNavbar from "./Navbar.styles";
import StyledNavbarItem from "./NavbarItem.styles";
import styled from "styled-components";
import Color from "constants/colors";
import useReduxDispatch from "hooks/useReduxDispatch";
import { signOut } from "features/auth/authSlice";
import Unit from "constants/units";

type NavbarProps = {
  show?: boolean;
  user: User | null;
};

const SignOutButton = styled.button`
  all: unset;
  margin: 0 ${Unit.em.XS};
  color: ${Color.TEXT};
  cursor: pointer;
`;

function Navbar(props: NavbarProps) {
  const show = props.show;
  const dispatch = useReduxDispatch();

  const onSignOutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(signOut());
  };

  return (
    <StyledNavbar>
      {!props.user ? (
        <Fragment>
          <StyledNavbarItem show={show}>
            <StyledLink to={Paths.SIGNUP}>Sign Up</StyledLink>
          </StyledNavbarItem>
          <StyledNavbarItem show={show}>
            <StyledLink to={Paths.SIGNIN}>Sign In</StyledLink>
          </StyledNavbarItem>
        </Fragment>
      ) : (
        <Fragment>
          <StyledNavbarItem show={show}>
            <StyledLink to={Paths.HOME}>Problems</StyledLink>
          </StyledNavbarItem>
          <StyledNavbarItem show={show}>
            <StyledLink to={Paths.PROFILE}>My Profile</StyledLink>
          </StyledNavbarItem>
          <StyledNavbarItem show={show}>
            <SignOutButton onClick={onSignOutClick}>Sign out</SignOutButton>
          </StyledNavbarItem>
        </Fragment>
      )}
    </StyledNavbar>
  );
}

export default Navbar;
