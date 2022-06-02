import styled from "styled-components";

import Screen from "constants/screens";

type StyledPageContainerProps = {
  width: string;
  smWidth?: string;
  maxWidth?: string;
};

const StyledPageContainer = styled.div<StyledPageContainerProps>`
  width: ${({ width }) => (width ? width : "auto")};
  max-width: ${({ maxWidth }) => (maxWidth && maxWidth)};

  @media (min-width: ${Screen.SM}) {
    width: ${({ smWidth }) => (smWidth && smWidth)};
`;

export default StyledPageContainer;
