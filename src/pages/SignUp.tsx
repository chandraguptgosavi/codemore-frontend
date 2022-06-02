import StyledPageContainer from "components/PageContainer.styles";
import StyledAuthImage from "components/auth/AuthImage.styles";
import SignUpImage from "assets/sign-up.svg";
import SignUpForm from "features/auth/SignUpForm";

function SignUp() {
  return (
    <StyledPageContainer width="90%" maxWidth="540px">
      <StyledAuthImage src={SignUpImage} />
      <SignUpForm />
    </StyledPageContainer>
  );
}

export default SignUp;
