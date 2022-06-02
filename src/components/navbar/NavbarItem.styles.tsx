import styled from "styled-components";

import Unit from "constants/units";
import Screen from "constants/screens";

type StyledNavbarItemPorps = {
  show?: boolean;
}

const StyledNavbarItem = styled.div<StyledNavbarItemPorps>`
  margin: ${Unit.em.SM} 0;
  width: 100%;
  min-height: ${({ show }) => (show ? "min-content" : "0")};
  overflow: hidden;

  @media (min-width: ${Screen.SM}) {
    margin: 0 ${Unit.em.SM};
    width: auto;
  }
`;

export default StyledNavbarItem;
