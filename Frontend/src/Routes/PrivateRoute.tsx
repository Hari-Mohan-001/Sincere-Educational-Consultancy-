
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../Interface/User/UserInterface'

const UserPrivateRoute = () => {
    const {user} = useSelector((state:RootState)=>state.user)
  return user ? <Outlet/> : <Navigate to={'/signIn'}/>
}

export default UserPrivateRoute