import React, { lazy, Suspense } from "react";
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
import { Typography } from "@mui/material";
const Home = lazy(() => import("pages/Home"));
const SolveProblem = lazy(() => import("pages/SolveProblem"));
const Submissions = lazy(() => import("pages/Submissions"));
const Contribute = lazy(() => import("pages/Contribute"));

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
                  <Suspense
                    fallback={
                      <Typography variant="h6" marginTop={2}>
                        Loading...
                      </Typography>
                    }
                  >
                    <Home />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path={`${Paths.SOLVE}/:_id`}
              element={
                <PrivateRoute>
                  <Suspense
                    fallback={
                      <Typography variant="h6" marginTop={2}>
                        Loading...
                      </Typography>
                    }
                  >
                    <SolveProblem />
                  </Suspense>
                </PrivateRoute>
              }
            />
            <Route
              path={`${Paths.SUBMISSIONS}/:username`}
              element={
                <Suspense
                  fallback={
                    <Typography variant="h6" marginTop={2}>
                      Loading...
                    </Typography>
                  }
                >
                  <Submissions />
                </Suspense>
              }
            />
            <Route
              path={Paths.CONTRIBUTE}
              element={
                <PrivateRoute>
                  <Suspense
                    fallback={
                      <Typography variant="h6" marginTop={2}>
                        Loading...
                      </Typography>
                    }
                  >
                    <Contribute />
                  </Suspense>
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
