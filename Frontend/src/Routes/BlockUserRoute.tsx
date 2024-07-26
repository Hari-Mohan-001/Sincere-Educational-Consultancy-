
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { RootState } from '../Interface/User/UserInterface'
import { signOutUser } from '../Redux/User/UserSlice'

const BlockUserRoute = () => {
    const {user} = useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()
//   return !user?.isBlocked ? <Outlet/> : <Navigate to={'/signIn'}/>
  if(user?.isBlocked){
    console.log('block');
      return !user?.isBlocked ? <Outlet/> : <Navigate to={'/signIn'}/>
  }
}

export default BlockUserRoute