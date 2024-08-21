import Header from "../../../Components/User/Header/Header"
import UserOrder from "../../../Components/User/UserOrders/UserOrder"


const UserOrderPage = () => {
  return (
    <div className=" w-screen bg-slate-600 h-screen">
        <Header/>
        <div className="ml-6">
        <UserOrder/>
        </div>
        
    </div>
  )
}

export default UserOrderPage