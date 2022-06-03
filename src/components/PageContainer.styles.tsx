import styled from "styled-components";

import Screen from "constants/screens";

type StyledPageContainerProps = {
  width: string;
  smWidth?: string;
  maxWidth?: string;
  smFlexDirection?: string;
};

const StyledPageContainer = styled.div<StyledPageContainerProps>`
  width: ${({ width }) => (width ? width : "auto")};
  max-width: ${({ maxWidth }) => maxWidth && maxWidth};
  display: flex;
  flex-direction: column;

  @media (min-width: ${Screen.SM}) {
    width: ${({ smWidth }) => smWidth && smWidth};
    flex-direction: ${({ smFlexDirection }) =>
      smFlexDirection && smFlexDirection};
  }
`;

export default StyledPageContainer;
