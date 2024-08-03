import { useParams } from 'react-router-dom'
import ChatComponent from '../../Layout/ChatComponent'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Interface/User/UserInterface'

const UserChat = () => {
    const {user} = useSelector((state:RootState)=>state.user)
   
  const {counsellorId,userId} = useParams()
  console.log('usr',counsellorId,'user',userId);
  
  if (!counsellorId || !userId) {
    return <div>Error: Missing required parameters</div>
  }
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