import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import Problem from "types/problem";
import contributionService from "./contributionService";
import { ContributionState } from "./types";

const initialState: ContributionState = {
  isLoading: false,
  error: null,
  response: null,
};

export const createProblem = createAsyncThunk<
  string,
  Problem,
  { state: RootState }
>("submissions/createProblem", async (porblem, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token!!;
    return await contributionService.createProblem(porblem, token);
  } catch (error: any) {
    if (error && error.message) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const contributionSlice = createSlice({
  name: "contribution",
  initialState,
  reducers: {
    resetContributionState: (state: ContributionState) => {
      state.isLoading = false;
      state.error = null;
      state.response = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ContributionState>) => {
    builder
      .addCase(createProblem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createProblem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = null;
          state.response = action.payload;
        }
      )
      .addCase(createProblem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.response = null;
      });
  },
});

export const { resetContributionState } = contributionSlice.actions;

export default contributionSlice.reducer;
