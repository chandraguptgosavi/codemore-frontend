import React, { useState } from "react";
import validator from "validator";
import { TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import StyledForm from "components/form/Form.styles";
import StyledFormItem from "components/form/FormItem.styles";
import useReduxDispatch from "hooks/useReduxDispatch";
import { resetAuthState, selectAuthError, selectIsAuthLoading, signUp } from "./authSlice";
import Paths from "router/paths";
import useReduxSelector from "hooks/useReduxSelector";
import StyledLink from "components/Link.styles";
import ToastMessage from "components/ToastMessage";

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isAuthLoading = useReduxSelector(selectIsAuthLoading);
  const authError = useReduxSelector(selectAuthError);
  const dispatch = useReduxDispatch();

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSignUpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const trimmedUsername = username.trim(),
      trimmedEmail: string = email.trim(),
      trimmedPassword: string = password.trim();
    let hasError: boolean = false;

    if (trimmedUsername.length < 3) {
      hasError = true;
      setUsernameError("Username must contain at least 3 characters!");
    } else setUsernameError("");

    if (!validator.isEmail(trimmedEmail)) {
      hasError = true;
      setEmailError("Enter valid email!");
    } else setEmailError("");

    if (trimmedPassword.length < 8) {
      hasError = true;
      setPasswordError("Password must contain at least 8 characters!");
    } else setPasswordError("");

    if (!hasError) {
      dispatch(
        signUp({
          username: trimmedUsername,
          email: trimmedEmail,
          password: trimmedPassword,
        })
      );
    }
  };

  return (
    <StyledForm>
      <StyledFormItem>
        <Typography variant="h6" align="center" gutterBottom>
          Get Started!
        </Typography>
      </StyledFormItem>
      <StyledFormItem>
        <TextField
          label="Username"
          variant="outlined"
          onChange={onUsernameChange}
          value={username}
          error={usernameError.length > 0}
          helperText={emailError.length > 0 && usernameError}
          fullWidth
          size="small"
        />
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
          onClick={onSignUpClick}
        >
          Sign Up
        </LoadingButton>
      </StyledFormItem>
      <StyledFormItem>
        <Typography variant="body1" align="center" gutterBottom>
          Already have account?
          <StyledLink to={Paths.SIGNIN}>Sign In</StyledLink>
        </Typography>
      </StyledFormItem>
      <ToastMessage
        show={authError !== null}
        severity="error"
        message={authError!!}
        onClose={() => dispatch(resetAuthState())}
      />
    </StyledForm>
  );
}

export default SignUpForm;
