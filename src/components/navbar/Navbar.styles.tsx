import styled from "styled-components";

import Screen from "constants/screens";

export const StyledNavbar = styled.nav`
  width: 90%;
  display: flex;
  align-items: start;
  flex-direction: column;

  @media (min-width: ${Screen.SM}) {
    width: auto;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
`;

export default StyledNavbar;
