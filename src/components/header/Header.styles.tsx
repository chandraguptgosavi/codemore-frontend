import styled from "styled-components";

import Color from "constants/colors";

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Color.PRIMARY};
  color: ${Color.TEXT};
  box-shadow: 2px 2px 5px ${Color.PRIMARY_LIGHT};
`;

export default StyledHeader;
