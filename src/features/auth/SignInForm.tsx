import React, { useState } from "react";
import validator from "validator";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import StyledForm from "components/form/Form.styles";
import StyledFormItem from "components/form/FormItem.styles";
import useReduxDispatch from "hooks/useReduxDispatch";
import { selectAuthError, selectIsAuthLoading, signIn } from "./authSlice";
import Paths from "router/paths";
import StyledLink from "components/Link.styles";
import useReduxSelector from "hooks/useReduxSelector";
import ToastMessage from "components/ToastMessage";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isAuthLoading = useReduxSelector(selectIsAuthLoading);
  const authError = useReduxSelector(selectAuthError);
  const dispatch = useReduxDispatch();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSignInClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const trimmedEmail: string = email.trim(),
      trimmedPassword: string = password.trim();
    let hasError: boolean = false;

    if (!validator.isEmail(trimmedEmail)) {
      hasError = true;
      setEmailError("Enter valid email!");
    } else setEmailError("");

    if (trimmedPassword.length < 8) {
      hasError = true;
      setPasswordError("Password must contain at least 8 characters!");
    } else setPasswordError("");

    if (!hasError) {
      dispatch(signIn({ email: trimmedEmail, password: trimmedPassword }));
    }
  };

  return (
    <StyledForm>
      <StyledFormItem>
        <Typography variant="h6" align="center" gutterBottom>
          Welcome back!
        </Typography>
      </StyledFormItem>
      <StyledFormItem>
        <TextField
          label="Email"
          variant="outlined"
          onChange={onEmailChange}
          value={email}
          error={emailError.length > 0}
          helperText={emailError.length > 0 && emailError}
          fullWidth
          size="small"
        />
      </StyledFormItem>
      <StyledFormItem>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={onPasswordChange}
          value={password}
          error={passwordError.length > 0}
          helperText={passwordError.length > 0 && passwordError}
          fullWidth
          size="small"
        />
      </StyledFormItem>
      <StyledFormItem>
        <LoadingButton
          loading={isAuthLoading}
          loadingIndicator="Loading..."
          variant="contained"
          fullWidth
          onClick={onSignInClick}
        >
          Sign In
        </LoadingButton>
      </StyledFormItem>
      <StyledFormItem>
        <Typography variant="body1" align="center" gutterBottom>
          New user?
          <StyledLink to={Paths.SIGNUP}>Sign Up</StyledLink>
        </Typography>
      </StyledFormItem>
      <ToastMessage
        show={authError !== null}
        severity="error"
        message={authError!!}
      />
    </StyledForm>
  );
}

export default SignInForm;
