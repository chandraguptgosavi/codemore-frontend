import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import submissionsService from "./submissionsService";
import { SubmissionResponse, SubmissionsState } from "./types";

const initialState: SubmissionsState = {
  submissionsLoading: false,
  error: null,
  submissions: [],
};

export const getSubmissions = createAsyncThunk<
  SubmissionResponse[],
  string,
  { state: RootState }
>("submissions/getSubmissions", async (username, thunkAPI) => {
  try {
    return await submissionsService.getSubmissions(username);
  } catch (error: any) {
    if (error && error.message) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    resetSubmissionsState: (state: SubmissionsState) => {
      state.submissionsLoading = false;
      state.error = null;
      state.submissions = [];
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<SubmissionsState>) => {
    builder
      .addCase(getSubmissions.pending, (state) => {
        state.submissionsLoading = true;
      })
      .addCase(
        getSubmissions.fulfilled,
        (state, action: PayloadAction<SubmissionResponse[]>) => {
          state.submissionsLoading = false;
          state.error = null;
          state.submissions = action.payload;
        }
      )
      .addCase(getSubmissions.rejected, (state, action) => {
        state.submissionsLoading = false;
        state.error = action.payload as string;
        state.submissions = [];
      });
  },
});

export const { resetSubmissionsState } = submissionsSlice.actions;

export default submissionsSlice.reducer;
