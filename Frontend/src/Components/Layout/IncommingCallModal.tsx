import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { clearIncomingCall, setIncomingCall } from '../../Redux/IncommingVideoCall/IncommingCallSlice';
import {store, StoreRootState  } from "../../Redux/Store";
import { useSocket } from '../../Context/SocketContext';

const IncomingCallModal: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isCallIncoming, callerId, callId } = useSelector((state: StoreRootState) => state.incomingCall);
  const {socket} = useSocket()
  const [incomingOffer, setIncomingOffer] = useState(null);

   React.useEffect(()=>{
    console.log('socketconet');
    
    if(socket){
      socket.on('receiveOffer', (offer, callerId, callId) => {
        console.log('received offer head callerId',callerId);
        setIncomingOffer(offer)
        store.dispatch(setIncomingCall({ callerId, callId }));
      });
    }
    return()=>{
      socket?.off('receiveOffer')
    }
  },[socket])

   React.useEffect(()=>{
    console.log('socketinit');
    
    if(socket){
      socket.on('receiveInitCall', (callerId, callId) => {
        console.log('received offer head callerId',callerId);
        setIncomingOffer(null)
        store.dispatch(setIncomingCall({ callerId, callId }));
      });
    }
    return()=>{
      socket?.off('receiveOffer')
    }
  },[socket])

  const handleAccept = () => {
    dispatch(clearIncomingCall());
    if(incomingOffer){
      console.log('incomming offer in ghandle accept- callerId,callid',callerId,callId);
      
      navigate(`/video-call`, {state:{callId,incomingOffer}});
    }else{
      navigate(`/video-call`, {state:{callId,incomingOffer}});
    }
   
  };

  const handleReject = () => {
    dispatch(clearIncomingCall());
  };

  return (
    <Dialog open={isCallIncoming} onClose={handleReject}>
      <DialogTitle>Incoming Video Call</DialogTitle>
      <DialogContent>
        <p>You have an incoming video call from counsellor</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleReject} color="secondary">Reject</Button>
        <Button onClick={handleAccept} color="primary">Accept</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncomingCallModal;
