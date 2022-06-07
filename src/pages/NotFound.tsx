import StyledPageContainer from "components/PageContainer.styles";
import Error404Image from "assets/404.svg";
import StyledImage from "components/Image.styles";
import { Typography } from "@mui/material";
import CodemoreString from "constants/strings";

function NotFound() {
    return (
      <StyledPageContainer width="90%" maxWidth="540px">
        <StyledImage src={Error404Image} />
        <Typography variant="h5" align="center" color="secondary" gutterBottom margin={2}>
          {CodemoreString.pageNotFoundHeading}
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          {CodemoreString.pageNotFoundMessage}
        </Typography>
      </StyledPageContainer>
    );
}

export default NotFound;