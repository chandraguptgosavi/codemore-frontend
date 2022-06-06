import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import Problem from "types/problem";
import solveProblemService from "./solveProblemService";
import {
  Language,
  SolveProblemState,
  JudgeResponse,
  SubmissionData,
} from "./types";

const initialState: SolveProblemState = {
  _id: null,
  language: { name: "CPP", selectedIndex: 0 },
  isProblemLoading: false,
  problemError: null,
  problem: null,
  srcCode: "// write your code",
  openConsole: false,
  consoleTabIndex: 0,
  isSubmissionPending: false,
  submissionError: null,
  submissionResponse: null,
  runCodeError: null,
  isCodeRunning: false,
  userInput: "",
  runCodeResponse: null,
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
  JudgeResponse,
  SubmissionData,
  { state: RootState }
>("solveProblem/submitProblem", async ({ _id, language }, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState(),
      token = rootState.auth.user?.token!!,
      srcCode = rootState.solveProblem.srcCode,
      problem = rootState.solveProblem.problem;
    if (_id !== null && problem !== null) {
      return await solveProblemService.submitProblem(
        _id,
        srcCode,
        problem.title,
        token,
        language
      );
    }
    return thunkAPI.rejectWithValue("Could not submit at the moment!");
  } catch (error: any) {
    if (error && error.message) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const runCode = createAsyncThunk<
  JudgeResponse,
  number,
  { state: RootState }
>("solveProblem/runCode", async (langID, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState(),
      token = rootState.auth.user?.token!!,
      srcCode = rootState.solveProblem.srcCode,
      userInput = rootState.solveProblem.userInput;
    return await solveProblemService.runCode(srcCode, langID, userInput, token);
  } catch (error: any) {
    if (error && error.message) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const solveProblemSlice = createSlice({
  name: "solveProblem",
  initialState,
  reducers: {
    resetProblem: (state: SolveProblemState) => {
      state.isProblemLoading = false;
      state.problemError = null;
      state.problem = null;
    },
    resetSubmission: (state: SolveProblemState) => {
      state.isSubmissionPending = false;
      state.submissionError = null;
      state.submissionResponse = null;
    },
    resetRunCode: (state: SolveProblemState) => {
      state.isCodeRunning = false;
      state.runCodeError = null;
      state.runCodeResponse = null;
    },
    setProblemID: (state: SolveProblemState, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    toggleConsole: (
      state: SolveProblemState,
      action: PayloadAction<boolean>
    ) => {
      state.openConsole = action.payload;
    },
    setConsoleTabIndex: (
      state: SolveProblemState,
      action: PayloadAction<number>
    ) => {
      state.consoleTabIndex = action.payload;
    },
    setLanguage: (
      state: SolveProblemState,
      action: PayloadAction<Language>
    ) => {
      state.language = action.payload;
    },
    setSrcCode: (state: SolveProblemState, action: PayloadAction<string>) => {
      state.srcCode = action.payload;
    },
    setUserInput: (state: SolveProblemState, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
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
        state.problemError = action.payload as string;
        state.problem = null;
      })
      .addCase(submitProblem.pending, (state) => {
        state.consoleTabIndex = 0;
        state.isSubmissionPending = true;
        state.openConsole = true;
        state.isCodeRunning = false;
        state.runCodeError = null;
        state.runCodeResponse = null;
      })
      .addCase(
        submitProblem.fulfilled,
        (state, action: PayloadAction<JudgeResponse>) => {
          state.isSubmissionPending = false;
          state.submissionResponse = action.payload;
        }
      )
      .addCase(submitProblem.rejected, (state, action) => {
        state.isSubmissionPending = false;
        state.submissionError = action.payload as string;
        state.submissionResponse = null;
      })
      .addCase(runCode.pending, (state) => {
        state.consoleTabIndex = 0;
        state.isCodeRunning = true;
        state.openConsole = true;
        state.isSubmissionPending = false;
        state.submissionError = null;
        state.submissionResponse = null;
      })
      .addCase(
        runCode.fulfilled,
        (state, action: PayloadAction<JudgeResponse>) => {
          state.isCodeRunning = false;
          state.runCodeResponse = action.payload;
        }
      )
      .addCase(runCode.rejected, (state, action) => {
        state.isCodeRunning = false;
        state.runCodeError = action.payload as string;
        state.runCodeResponse = null;
      });
  },
});

export const {
  resetProblem,
  resetSubmission,
  resetRunCode,
  setProblemID,
  toggleConsole,
  setConsoleTabIndex,
  setLanguage,
  setSrcCode,
  setUserInput,
} = solveProblemSlice.actions;

export const selectLanguage = (state: RootState) => state.solveProblem.language;

export default solveProblemSlice.reducer;
