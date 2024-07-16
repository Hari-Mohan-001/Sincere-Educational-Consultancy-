import {
    createSlice,
    createAsyncThunk,
    AsyncThunk,
    ThunkDispatch,
  } from "@reduxjs/toolkit";
  import { Action } from "redux";
  import { ADMIN_BASE_URL } from "../../Constants/Constants";
import { AdminState, ResponseData, signInAdminData } from "../../Interface/Admin/AdminInterface";
  
  interface AsyncThunkConfig {
    state?: unknown;
    dispatch?: ThunkDispatch<unknown, unknown, Action>;
    extra?: unknown;
    rejectValue?: ResponseData;
  }
  
  const initialState: AdminState = {
    admin: null,
    status: "idle",
    error: null,
  };
  
  
  
  
  
  export const signInAdmin: AsyncThunk<ResponseData, signInAdminData, AsyncThunkConfig> =
    createAsyncThunk("/user/signIn", async (adminData, { rejectWithValue }) => {
      try {
        const response = await fetch(`${ADMIN_BASE_URL}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminData),
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
  
  
  
  const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      signOutAdmin: (state) => {
        state.admin = null;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(signInAdmin.fulfilled,(state,action)=>{
          console.log(action.payload);
          
          console.log('signin....');
          state.status = "succeeded",
          state.admin = action.payload.admin || null
          console.log('act',action.payload.admin);
          
        })
        .addCase(signInAdmin.rejected, (state,action)=>{
          state.status = "failed",
          state.error = action.error.message||null
        })
    },
  });
  export const { signOutAdmin } = adminSlice.actions;
  export default adminSlice.reducer;
  