import styled from "styled-components";

import Screen from "constants/screens";

type StyledPageContainerProps = {
  width: string;
  smWidth?: string;
  maxWidth?: string;
  overflow?: string;
  smFlexDirection?: string;
  mdFlexDirection?: string;
  lgFlexDirection?: string;
};

const StyledPageContainer = styled.div<StyledPageContainerProps>`
  width: ${({ width }) => (width ? width : "auto")};
  height: 100%;
  max-width: ${({ maxWidth }) => maxWidth && maxWidth};
  overflow: ${({ overflow }) => overflow && overflow};
  display: flex;
  flex-direction: column;

  @media (min-width: ${Screen.SM}) {
    width: ${({ smWidth }) => smWidth && smWidth};
    flex-direction: ${({ smFlexDirection }) =>
      smFlexDirection && smFlexDirection};
  }
  
  @media (min-width: ${Screen.MD}) {
    flex-direction: ${({ mdFlexDirection }) =>
      mdFlexDirection && mdFlexDirection};
  }

  @media (min-width: ${Screen.LG}) {
    flex-direction: ${({ lgFlexDirection }) =>
      lgFlexDirection && lgFlexDirection};
  }
`;

export default StyledPageContainer;
