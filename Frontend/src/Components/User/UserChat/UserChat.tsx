import { useParams } from 'react-router-dom'
import ChatComponent from '../../Layout/ChatComponent'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Interface/User/UserInterface'
import { useEffect } from 'react'
import { AppDispatch } from '../../../Redux/Store'
import { clearNotifications } from '../../../Redux/Notification/NotificationSlice'

const UserChat = () => {
    const {user} = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch<AppDispatch>()
  const {counsellorId,userId} = useParams()
  console.log('usr',counsellorId,'user',userId);
  
  if (!counsellorId || !userId) {
    return <div>Error: Missing required parameters</div>
  }

  useEffect(() => {
    dispatch(clearNotifications(userId));
  }, [dispatch]);
  return (
    <div>
      
      <ChatComponent 
        counsellorId={counsellorId} 
        counsellorModel="admin" 
        userId={userId} 
        userModel="User" 
        isCounsellor={false}
      />
    </div>
  )
}

export default UserChat