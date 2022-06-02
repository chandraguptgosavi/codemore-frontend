import styled from "styled-components";

import Screen from "constants/screens";
import Color from "constants/colors";

type StyledVerticalNavbarContainerPorps = {
  show: boolean;
};

const StyledVerticalNavbarContainer = styled.div<StyledVerticalNavbarContainerPorps>`
  width: 100%;
  display: flex;
  justify-content: center;
  max-height: ${(props) => (props.show ? `300px` : `0`)};
  transition: max-height 0.5s ease-in-out;
  background-color: ${Color.PRIMARY};
  color: ${Color.TEXT};

  @media (min-width: ${Screen.SM}) {
    display: none;
    transition: none;
  }
`;

export default StyledVerticalNavbarContainer;
