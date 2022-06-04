import {
  createSlice,
  createAsyncThunk,
  ActionReducerMapBuilder,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { AuthData, AuthState } from "./types";
import User from "types/user";
import authService from "./authService";

// Get user from localStorage
const jsonUser: string | null = localStorage.getItem("user");
const user: User = jsonUser ? JSON.parse(jsonUser) : null;

const initialState: AuthState = {
  user: user ? user : null,
  error: null,
  isLoading: false,
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (authData: AuthData, thunkAPI) => {
    try {
      return await authService.signUp(authData);
    } catch (error: any) {
      if (error && error.message)
        return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (authData: AuthData, thunkAPI) => {
    try {
      return await authService.signIn(authData);
    } catch (error: any) {
      if (error && error.message)
        return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    return await authService.signOut();
  } catch (error: any) {
    if (error && error.message) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state: AuthState) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.user = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;
