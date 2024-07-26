import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { CounsellorRootState } from '../Interface/Counsellor/CounsellorInterface'

const CounsellorPrivateRoute = () => {
    const {counsellor} = useSelector((state:CounsellorRootState)=>state.counsellor)
  return counsellor ? <Outlet/> : <Navigate to={'/counsellor/signin'}/>
}

export default CounsellorPrivateRoute