import {
    createSlice,
    createAsyncThunk,
    AsyncThunk,
    ThunkDispatch,
  } from "@reduxjs/toolkit";
  import { Action } from "redux";
  import { COUNSELLORBASEURL } from "../../Constants/Constants";
import { CounsellorData, CounsellorState, ResponseCounsellorData, ResponseData, signInCounsellorData } from "../../Interface/Counsellor/CounsellorInterface";
  
  interface AsyncThunkConfig {
    state?: unknown;
    dispatch?: ThunkDispatch<unknown, unknown, Action>;
    extra?: unknown;
    rejectValue?: ResponseCounsellorData;
  }
  
  const initialState: CounsellorState = {
    counsellor: null,
    status: "idle",
    error: null,
  };
  
  export const signUpCounsellor: AsyncThunk<ResponseData, CounsellorData, AsyncThunkConfig> =
    createAsyncThunk("/counsellor/signUp", async (counsellorData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${COUNSELLORBASEURL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(counsellorData),
          credentials: "include",
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
  
  
  
  export const signInCounsellor: AsyncThunk<ResponseData, signInCounsellorData, AsyncThunkConfig> =
    createAsyncThunk("/counsellor/signIn", async (counsellorData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${COUNSELLORBASEURL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(counsellorData),
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
  
  const CounsellorSlice = createSlice({
    name: "counsellor",
    initialState,
    reducers: {
      signOutCounsellor: (state) => {
        state.counsellor = null;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(signUpCounsellor.pending, (state) => {
          state.status = "loading";
        })
        .addCase(signUpCounsellor.fulfilled, (state,action) => {
          (state.status = "succeeded"), 
          state.counsellor = action.payload.counsellor||null,
          (state.error = null);
        })
        .addCase(signUpCounsellor.rejected, (state, action) => {
          (state.status = "failed"), (state.error = action.error.message || null);
        })
        .addCase(signInCounsellor.fulfilled,(state,action)=>{
          console.log(action.payload);
          
          console.log('signin....');
          state.status = "succeeded",
          state.counsellor = action.payload.counsellor || null
          console.log('act',state.counsellor);
          
        })
        .addCase(signInCounsellor.rejected, (state,action)=>{
          state.status = "failed",
          state.error = action.error.message||null
        })
        
    },
  });
  export const { signOutCounsellor } = CounsellorSlice.actions;
  export default CounsellorSlice.reducer;
  