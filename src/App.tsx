import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthRoute from "router/AuthRoute";
import Paths from "router/paths";
import Header from "components/header/Header";
import useReduxSelector from "hooks/useReduxSelector";
import { selectUser } from "features/auth/authSlice";
import StyledRouteContainer from "components/RouteContainer.styles";
import StyledMainContainer from "components/MainContainer.styles";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import PrivateRoute from "router/PrivateRoute";
import Home from "pages/Home";
import SolveProblem from "pages/SolveProblem";
import Submissions from "pages/Submissions";
import Contribute from "pages/Contribute";

function App() {
  const user = useReduxSelector(selectUser);

  return (
    <BrowserRouter>
      <StyledMainContainer>
        <Header user={user} />
        <StyledRouteContainer>
          <Routes>
            <Route
              path={Paths.SIGNUP}
              element={
                <AuthRoute>
                  <SignUp />
                </AuthRoute>
              }
            />
            <Route
              path={Paths.SIGNIN}
              element={
                <AuthRoute>
                  <SignIn />
                </AuthRoute>
              }
            />
            <Route
              path={Paths.HOME}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={`${Paths.SOLVE}/:_id`}
              element={
                <PrivateRoute>
                  <SolveProblem />
                </PrivateRoute>
              }
            />
            <Route
              path={`${Paths.SUBMISSIONS}/:username`}
              element={<Submissions />}
            />
            <Route
              path={Paths.CONTRIBUTE}
              element={
                <PrivateRoute>
                  <Contribute />
                </PrivateRoute>
              }
            />
          </Routes>
        </StyledRouteContainer>
      </StyledMainContainer>
    </BrowserRouter>
  );
}

export default App;
