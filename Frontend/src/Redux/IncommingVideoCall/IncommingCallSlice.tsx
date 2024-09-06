import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IncomingCallState {
  isCallIncoming: boolean;
  callerId: string;
  callId: string;
}

const initialState: IncomingCallState = {
  isCallIncoming: false,
  callerId: '',
  callId: ''
};

const incomingCallSlice = createSlice({
  name: 'incomingCall',
  initialState,
  reducers: {
    setIncomingCall(state, action: PayloadAction<{ callerId: string, callId: string }>) {
      state.isCallIncoming = true;
      state.callerId = action.payload.callerId;
      state.callId = action.payload.callId;
    },
    clearIncomingCall(state) {
      state.isCallIncoming = false;
      state.callerId = '';
      state.callId = '';
    }
  }
});

export const { setIncomingCall, clearIncomingCall } = incomingCallSlice.actions;
export default incomingCallSlice.reducer;
