import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import Problem from "types/problem";
import solveProblemService from "./solveProblemService";
import { SolveProblemState, SubmissionData, SubmissionResponse } from "./types";

const initialState: SolveProblemState = {
  isProblemLoading: false,
  error: null,
  problem: null,
  isSubmissionPending: false,
  submissionResponse: null
};

export const getProblem = createAsyncThunk(
  "solveProblem/getProblem",
  async (_id: string, thunkAPI) => {
    try {
      return await solveProblemService.getProblem(_id);
    } catch (error: any) {
      if (error && error.message)
        return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const submitProblem = createAsyncThunk<
  SubmissionResponse,
  SubmissionData,
  { state: RootState }
>(
  "solveProblem/submitProblem",
  async (submissionData: SubmissionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token!!;
      return await solveProblemService.submitProblem(submissionData, token);
    } catch (error: any) {
      if (error && error.message)
        return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const solveProblemSlice = createSlice({
  name: "solveProblem",
  initialState,
  reducers: {
    resetProblem: (state: SolveProblemState) => {
      state.isProblemLoading = true;
      state.error = null;
      state.problem = null;
    },
    resetSubmission: (state: SolveProblemState) => {
      state.isSubmissionPending = false;
      state.error = null;
      state.submissionResponse = null;
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<SolveProblemState>) => {
    builder
      .addCase(getProblem.pending, (state) => {
        state.isProblemLoading = true;
      })
      .addCase(
        getProblem.fulfilled,
        (state, action: PayloadAction<Problem>) => {
          state.isProblemLoading = false;
          state.problem = action.payload;
        }
      )
      .addCase(getProblem.rejected, (state, action) => {
        state.isProblemLoading = false;
        state.error = action.payload as string;
        state.problem = null;
      })
      .addCase(submitProblem.pending, (state) => {
        state.isSubmissionPending = true;
      })
      .addCase(
        submitProblem.fulfilled,
        (state, action: PayloadAction<SubmissionResponse>) => {
          state.isSubmissionPending = false;
          state.submissionResponse = action.payload;
        }
      )
      .addCase(submitProblem.rejected, (state, action) => {
        state.isSubmissionPending = false;
        state.error = action.payload as string;
        state.submissionResponse = null;
      });
    
  },
});

export const { resetProblem, resetSubmission } = solveProblemSlice.actions;
export default solveProblemSlice.reducer;
