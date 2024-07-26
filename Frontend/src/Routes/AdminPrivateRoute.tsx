import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { AdminRootState } from '../Interface/Admin/AdminInterface'

const AdminPrivateRoute = () => {
    const {admin} = useSelector((state:AdminRootState)=>state.admin)
  return admin ? <Outlet/> : <Navigate to={'/admin/signin'}/>
}

export default AdminPrivateRoute