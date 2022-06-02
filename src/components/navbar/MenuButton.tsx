import React from "react";
import { CgMenu } from "react-icons/cg";

import StyledMenuButton from "./MenuButton.styles";

type MenuButtonProps = {
  showVerticalNavbar: boolean;
  setShowVerticalNavbar: React.Dispatch<React.SetStateAction<boolean>>;
};

function MenuButton({
  showVerticalNavbar,
  setShowVerticalNavbar,
}: MenuButtonProps) {
  const menuButtonClicked = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowVerticalNavbar(!showVerticalNavbar);
  };

  return (
    <StyledMenuButton onClick={menuButtonClicked}>
      <CgMenu />
    </StyledMenuButton>
  );
}

export default MenuButton;
