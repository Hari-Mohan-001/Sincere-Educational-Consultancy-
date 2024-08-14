
import Header from '../../../Components/Admin/Header/Header'
import SideNavBar from '../../../Components/Admin/SideNavBar/SideNavBar'
import OrderList from '../../../Components/Admin/Order/OrderList'

const AdminOrderPage = () => {
  return (
    <div>
        <Header/>
        <div className="flex">
          <div>
          <SideNavBar />
          </div>
        <OrderList/>
      </div>
    </div>
  )
}

export default AdminOrderPage