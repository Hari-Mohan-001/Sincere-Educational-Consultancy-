import {
    createSlice,
    createAsyncThunk,
    AsyncThunk,
    ThunkDispatch,
  } from "@reduxjs/toolkit";
  import { Action } from "redux";
  import {
    UserData,
    ResponseData,
    UserState,
    signInUserData,
  } from "../../Interface/User/UserInterface";
  import { BASE_URL } from "../../Constants/Constants";
  
  interface AsyncThunkConfig {
    state?: unknown;
    dispatch?: ThunkDispatch<unknown, unknown, Action>;
    extra?: unknown;
    rejectValue?: ResponseData;
  }
  
  const initialState: UserState = {
    user: null,
    status: "idle",
    error: null,
  };
  
  export const signUpUser: AsyncThunk<ResponseData, UserData, AsyncThunkConfig> =
    createAsyncThunk("/user/signUp", async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/signUp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          const data: ResponseData = await response.json();
          return rejectWithValue(data);
        }
        const data: ResponseData = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue({ message: "Network Error" });
      }
    });
  
  export const verifyOtp: AsyncThunk<ResponseData, string, AsyncThunkConfig> =
    createAsyncThunk("/user/verifyOtp", async (otp, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/verifyOtp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp }),
          credentials: "include",
        });
       
        if (!response.ok) {
          const data: ResponseData = await response.json();
          console.log(data);
          return rejectWithValue(data);
        }
        const data: ResponseData = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue({ message: "Network Error" });
      }
    });
  
  export const signInUser: AsyncThunk<ResponseData, signInUserData, AsyncThunkConfig> =
    createAsyncThunk("/user/signIn", async (userData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${BASE_URL}/signIn`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        });
  
        if (!response.ok) {
          const data: ResponseData = await response.json();
          console.log(data);
          return rejectWithValue(data);
        }
        const data: ResponseData = await response.json();
        
        
        return data;
      } catch (error) {
        return rejectWithValue({ message: "Network Error" });
      }
    });
  
  
  
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      signOutUser: (state) => {
        state.user = null;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(signUpUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(signUpUser.fulfilled, (state) => {
          (state.status = "succeeded"), (state.error = null);
        })
        .addCase(signUpUser.rejected, (state, action) => {
          (state.status = "failed"), (state.error = action.error.message || null);
        })
        .addCase(verifyOtp.fulfilled, (state, action) => {
          (state.status = "succeeded"),
            (state.user = action.payload.user || null),
            (state.error = null);
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          (state.status = "failed"), (state.error = action.error.message || null);
        })
        .addCase(signInUser.fulfilled,(state,action)=>{
          console.log(action.payload);
          
          console.log('signin....');
          state.status = "succeeded",
          state.user = action.payload.user || null
          console.log('act',action.payload.user);
          
        })
        .addCase(signInUser.rejected, (state,action)=>{
          state.status = "failed",
          state.error = action.error.message||null
        })
    },
  });
  export const { signOutUser } = userSlice.actions;
  export default userSlice.reducer;
  