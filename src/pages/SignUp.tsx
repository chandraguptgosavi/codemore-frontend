import StyledPageContainer from "components/PageContainer.styles";
import StyledImage from "components/Image.styles";
import SignUpImage from "assets/sign-up.svg";
import SignUpForm from "features/auth/SignUpForm";

function SignUp() {
  return (
    <StyledPageContainer width="90%" maxWidth="540px">
      <StyledImage src={SignUpImage} />
      <SignUpForm />
    </StyledPageContainer>
  );
}

export default SignUp;
