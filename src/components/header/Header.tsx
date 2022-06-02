import React, { Fragment, useState } from "react";

import AppName from "components/AppName";
import MenuButton from "components/navbar/MenuButton";
import User from "types/user";
import StyledHeader from "./Header.styles";
import HeaderContainer from "./HeaderContainer.styles";
import  Navbar from "components/navbar/Navbar";
import StyledVerticalNavbarContainer from "components/navbar/VerticalNavbarContainer.styles";

type HeaderProps = {
  user: User | null;
};

function Header(props: HeaderProps) {
  const user = props.user;
  const [showVerticalNavbar, setShowVerticalNavbar] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState(window.innerWidth < 640 ? false : true);

  const onWndowResize = (event: UIEvent) => { 
    if (window.innerWidth < 640) {
      if (showNavbar) setShowNavbar(false);
    } else {
      if (!showNavbar) setShowNavbar(true);
    }
  };

  window.addEventListener('resize', onWndowResize);

  return (
    <Fragment>
      <StyledHeader>
        <HeaderContainer>
          <AppName>CodeMore</AppName>
          <MenuButton
            showVerticalNavbar={showVerticalNavbar}
            setShowVerticalNavbar={setShowVerticalNavbar}
          />
          {showNavbar && <Navbar user={user} />}
        </HeaderContainer>
      </StyledHeader>
      <StyledVerticalNavbarContainer show={showVerticalNavbar}>
        <Navbar show={showVerticalNavbar} user={user} />
      </StyledVerticalNavbarContainer>
    </Fragment>
  );
}

export default Header;
