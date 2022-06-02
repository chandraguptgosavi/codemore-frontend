import styled from "styled-components";

import Unit from "constants/units";

type StyledTextProps = {
  center?: boolean;
}

const StyledText = styled.p<StyledTextProps>`
  margin: ${Unit.em.SM} 0;
  text-align: ${({ center=false }) => center ? 'center' : "start"};
`;

export const LargeSizedText = styled(StyledText)`
  margin: ${Unit.em.SM} 0;
  font-size: ${Unit.rem.LG};
  font-weight: 500;
`;

export const ExtraLargeSizedText = styled(StyledText)`
  margin: ${Unit.em.SM} 0;
  font-size: ${Unit.rem.XL};
  font-weight: 600;
`;

export default StyledText;
