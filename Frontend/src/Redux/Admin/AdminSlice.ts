import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Action } from "redux";
import { ADMIN_ENDPOINT } from "../../Constants/Constants";
import {
  AdminState,
  ResponseData,
  signInAdminData,
} from "../../Interface/Admin/AdminInterface";
import axiosInstance from "../../Api/axiosInstance";

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

export const signInAdmin: AsyncThunk<
  ResponseData,
  signInAdminData,
  AsyncThunkConfig
> = createAsyncThunk(
  "/admin/signIn",
  async (adminData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${ADMIN_ENDPOINT}/signin`,
        adminData
      );

      if (response.status != 200 && response.status !== 201) {
        const data: ResponseData = response.data;
        console.log(data);
        return rejectWithValue(data);
      }
      const data: ResponseData = response.data;

      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  }
);

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
      .addCase(signInAdmin.fulfilled, (state, action) => {
        console.log("signin....");
        (state.status = "succeeded"),
          (state.admin = action.payload.admin || null);
      })
      .addCase(signInAdmin.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message || null);
      });
  },
});
export const { signOutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
