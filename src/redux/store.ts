import { configureStore } from "@reduxjs/toolkit";
import authReducer from 'features/auth/authSlice';
import dashboardReducer from "features/dashboard/dashboardSlice";
import solveProblemReducer from "features/solve-problem/solveProblemSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    solveProblem: solveProblemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
