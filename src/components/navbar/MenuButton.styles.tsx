import styled from "styled-components";

import Screen from "constants/screens";
import Unit from "constants/units";
import Color from "constants/colors";

const StyledMenuButton = styled.button`
  padding: ${Unit.em.XS} ${Unit.em.SM};
  color: ${Color.TEXT};
  background-color: ${Color.PRIMARY};
  border: 2px solid ${Color.TEXT};;
  border-radius: ${Unit.em.XS};
  cursor: pointer;

  @media (min-width: ${Screen.SM}) {
    display: none;
  }
`;

export default StyledMenuButton;
