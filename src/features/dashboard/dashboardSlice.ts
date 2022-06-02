import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import dashboardService from "./dashboardService";
import { DashboardState, GetAllProblemsResponse } from "./types";

const initialState: DashboardState = {
  page: 1,
  totalProblems: 0,
  isLoading: false,
  error: null,
  problems: [],
};

export const getAllProblems = createAsyncThunk(
  "auth/signUp",
  async (page: number, thunkAPI) => {
    try {
      return await dashboardService.getAllProblems(page);
    } catch (error: any) {
      if (error && error.message)
        return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardState: (state: DashboardState) => {
      state.page = 1;
      state.totalProblems = 0;
      state.isLoading = false;
      state.error = null;
      state.problems = [];
    },
    setPage: (state: DashboardState, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<DashboardState>) => {
    builder
      .addCase(getAllProblems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllProblems.fulfilled,
        (state, action: PayloadAction<GetAllProblemsResponse>) => {
          state.isLoading = false;
          state.totalProblems = action.payload.totalProblems;
          state.problems = action.payload.problems;
        }
      )
      .addCase(getAllProblems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.problems = [];
      });
  },
});

export const { resetDashboardState, setPage } = dashboardSlice.actions;

export const selectProblems = (state: RootState) => state.dashboard.problems;
export const selectTotalProblems = (state: RootState) => state.dashboard.totalProblems;
export const selectPage = (state: RootState) => state.dashboard.page;
export const selectIsDashboardLoading = (state: RootState) =>
  state.dashboard.isLoading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

export default dashboardSlice.reducer;
