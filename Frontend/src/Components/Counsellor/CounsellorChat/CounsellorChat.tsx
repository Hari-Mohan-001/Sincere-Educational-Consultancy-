
import { useParams } from 'react-router-dom'
import ChatComponent from '../../Layout/ChatComponent'

const CounsellorChat = () => {

  const {counsellorId,userId} = useParams()
  console.log('coun',counsellorId,'user',userId);
  
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