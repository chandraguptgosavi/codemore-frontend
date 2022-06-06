import { configureStore } from "@reduxjs/toolkit";
import authReducer from 'features/auth/authSlice';
import dashboardReducer from "features/dashboard/dashboardSlice";
import solveProblemReducer from "features/solve-problem/solveProblemSlice";
import submissionsReducer from "features/submissions/submissionsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    solveProblem: solveProblemReducer,
    submissions: submissionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
