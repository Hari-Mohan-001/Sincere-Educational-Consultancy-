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
  googleAuthData,
  UpdateUserData,
} from "../../Interface/User/UserInterface";
import { USER_ENDPOINT } from "../../Constants/Constants";
import axiosInstance, { setRefreshToken } from "../../Api/axiosInstance";


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
     
      const response = await axiosInstance.post(`${USER_ENDPOINT}/signUp`,userData)
      console.log('sigup',response);
      
      if (response.status!= 200 && response.status!= 201) {
        const data: ResponseData = await response.data;
  
        return rejectWithValue(data);
      }
      const data: ResponseData = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  });

export const verifyOtp: AsyncThunk<ResponseData, string, AsyncThunkConfig> =
  createAsyncThunk("/user/verifyOtp", async (otp, { rejectWithValue }) => {
    try {
     
      const response = await axiosInstance.post(`${USER_ENDPOINT}/verifyOtp`,{otp})
      if (response.status!= 200 && response.status!= 201) {
        const data: ResponseData = await response.data;
        console.log(data);
        return rejectWithValue(data);
      }
      const data: ResponseData = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  });

export const signInUser: AsyncThunk<ResponseData, signInUserData, AsyncThunkConfig> =
  createAsyncThunk("/user/signIn", async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${USER_ENDPOINT}/signIn`,userData)
      
      if (response.status!= 200 && response.status!= 201) {
        const data: ResponseData = response.data;
        return rejectWithValue(data);
      }
      const data: ResponseData = response.data;
      setRefreshToken(response.data.refreshToken)
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  });

export const googleAuth: AsyncThunk<ResponseData,googleAuthData, AsyncThunkConfig> =
  createAsyncThunk("/user/googleAuth", async (userData, { rejectWithValue }) => {
    try {
      // const response = await fetch(`${BASE_URL}/google-auth`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(userData),
      //   credentials: "include",
      // });
      const response = await axiosInstance.post(`${USER_ENDPOINT}/google-auth`,userData)
      if (response.status!= 200 && response.status!= 201) {
        const data: ResponseData = await response.data;
        console.log(data);
        return rejectWithValue(data);
      }
      const data: ResponseData = await response.data;
      
      
      return data;
    } catch (error) { 
      return rejectWithValue({ message: "Network Error" });
    }
  });

  export const updateUser: AsyncThunk<ResponseData, { userData: UpdateUserData, userId: string }, AsyncThunkConfig> =
  createAsyncThunk("/user/updateUser", async ({ userData, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/${USER_ENDPOINT}/${userId}`,{userData});
      
      if (response.status === 200 || response.status === 201 ) {
        const data: ResponseData = response.data.user
        console.log(data);
        return response.data; // Assuming the updated user data is returned in response
      } else {
        return rejectWithValue({ message: "Failed to update user" });
      }
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  });




const userSlice = createSlice({
  name:"user",
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
        console.log('User signed in:', action.payload);
        
        console.log('signin....');
        state.status = "succeeded",
        state.user = action.payload.user || null
        
      })
      .addCase(signInUser.rejected, (state,action)=>{
        state.status = "failed",
        state.error = action.error.message||null
      })
      .addCase(googleAuth.fulfilled,(state,action)=>{
        state.status = "succeeded",
        state.user = action.payload.user || null,
        state.error = null
      })
      .addCase(updateUser.pending,(state)=>{
        state.status = 'loading'
      })
      .addCase(updateUser.fulfilled,(state,action)=>{
        state.status = "succeeded";
        state.user = action.payload.user || null; // Update user data in state
        console.log('act',action.payload);
        state.error = null;
      })
      .addCase(updateUser.rejected,(state, action)=>{
        state.status = "failed";
        state.error = action.error.message || null;
      })
  },
});
export const { signOutUser } = userSlice.actions;
export default userSlice.reducer;
