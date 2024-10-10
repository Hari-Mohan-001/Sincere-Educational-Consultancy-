
import Header from '../../../Components/Admin/Header/Header'
import SideNavBar from '../../../Components/Admin/SideNavBar/SideNavBar'
import OrderList from '../../../Components/Admin/Order/OrderList'

const AdminOrderPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Full-width Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5">
          <SideNavBar />
        </div>

        {/* Main Content: Student List */}
        <div className="w-4/5 p-0">
          <OrderList />
        </div>
      </div>
    </div>
  );
}

export default AdminOrderPage