
import { useLocation } from 'react-router-dom'
import ChatComponent from '../../Layout/ChatComponent'

interface LocationState{
  counsellorId:string;
  userId:string
}

const CounsellorChat = () => {
const location = useLocation()

  const {counsellorId,userId} = location.state as LocationState
  
  if (!counsellorId || !userId) {
    return <div>Error: Missing required parameters</div>
  }
  return (
    <div>
      <h1 className='text-center text-xl'>Counsellor Chat</h1>
      <ChatComponent 
        counsellorId={counsellorId} 
        counsellorModel="admin" 
        userId={userId} 
        userModel="User" 
        isCounsellor={true}
      />
    </div>
  )
}

export default CounsellorChat