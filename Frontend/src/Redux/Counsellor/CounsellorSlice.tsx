import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { Action } from "redux";
import { COUNSELLOR_ENDPOINT } from "../../Constants/Constants";
import {
  CounsellorData,
  CounsellorState,
  ResponseCounsellorData,
  ResponseData,
  signInCounsellorData,
} from "../../Interface/Counsellor/CounsellorInterface";
import axiosInstance from "../../Api/axiosInstance";

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

export const signUpCounsellor: AsyncThunk<
  ResponseData,
  CounsellorData,
  AsyncThunkConfig
> = createAsyncThunk(
  "/counsellor/signUp",
  async (counsellorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/signup`,
        counsellorData
      );
      if (response.status != 200 && response.status !== 201) {
        const data: ResponseData = await response.data;
        return rejectWithValue(data);
      }
      const data: ResponseData = await response.data;
      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  }
);

export const signInCounsellor: AsyncThunk<
  ResponseData,
  signInCounsellorData,
  AsyncThunkConfig
> = createAsyncThunk(
  "/counsellor/signIn",
  async (counsellorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${COUNSELLOR_ENDPOINT}/signin`,
        counsellorData
      );

      if (response.status != 200 && response.status !== 201) {
        const data: ResponseData = await response.data;
        return rejectWithValue(data);
      }
      const data: ResponseData = await response.data;

      return data;
    } catch (error) {
      return rejectWithValue({ message: "Network Error" });
    }
  }
);

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
      .addCase(signUpCounsellor.fulfilled, (state, action) => {
        (state.status = "succeeded"),
          (state.counsellor = action.payload.counsellor || null),
          (state.error = null);
      })
      .addCase(signUpCounsellor.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message || null);
      })
      .addCase(signInCounsellor.fulfilled, (state, action) => {
        console.log('Counsellor signed in:', action.payload);

        (state.status = "succeeded"),
          (state.counsellor = action.payload.counsellor || null);
      })
      .addCase(signInCounsellor.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message || null);
      });
  },
});
export const { signOutCounsellor } = CounsellorSlice.actions;
export default CounsellorSlice.reducer;
