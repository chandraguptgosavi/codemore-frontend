import StyledPageContainer from "components/PageContainer.styles";
import StyledAuthImage from "components/auth/AuthImage.styles";
import SignInImage from "assets/sign-in.svg";
import SignInForm from "features/auth/SignInForm";

function SignIn() {
  return (
    <StyledPageContainer width="90%" maxWidth="540px">
      <StyledAuthImage src={SignInImage} />
      <SignInForm />
    </StyledPageContainer>
  );
}

export default SignIn;
