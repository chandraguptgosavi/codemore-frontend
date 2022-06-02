import { Link } from "react-router-dom";
import styled from "styled-components";

import Unit from "constants/units";

const StyledLink = styled(Link)`
  all : unset;
  margin: 0 ${Unit.em.XS};
  cursor: pointer;
`;

export default StyledLink;
