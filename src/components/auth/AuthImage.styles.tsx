import styled from "styled-components";

import Screen from "constants/screens";
import Unit from "constants/units";

const StyledAuthImage = styled.img`
  width: 100%;
  max-width: 100%;
  max-height: 300px;
  margin: ${Unit.em.MD} 0;

  @media (min-width: ${Screen.SM}) {
    max-height: 400px;
  }
`;

export default StyledAuthImage;
