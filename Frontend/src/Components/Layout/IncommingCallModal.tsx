import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { clearIncomingCall } from '../../Redux/IncommingVideoCall/IncommingCallSlice';
import {StoreRootState  } from "../../Redux/Store";

const IncomingCallModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCallIncoming, callerId, callId } = useSelector((state: StoreRootState) => state.incomingCall);

  const handleAccept = () => {
    dispatch(clearIncomingCall());
    navigate(`/video-call/${callId}`);
  };

  const handleReject = () => {
    dispatch(clearIncomingCall());
  };

  return (
    <Dialog open={isCallIncoming} onClose={handleReject}>
      <DialogTitle>Incoming Video Call</DialogTitle>
      <DialogContent>
        <p>You have an incoming video call from {callerId}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="secondary">Reject</Button>
        <Button onClick={handleAccept} color="primary">Accept</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomingCallModal;
