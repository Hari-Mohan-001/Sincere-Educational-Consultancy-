import { format } from "date-fns";
import { useEffect, useState } from "react";
import TableComponent from "../../Layout/Table";
import { toast } from "react-toastify";
import { userApi } from "../../../Api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../Interface/User/UserInterface";
import { Button } from "@mui/material";

interface Order {
    _id: string;
    userName: string;
    userEmail: string;
    enrollType: string;
    enrollImage: string;
    country: string;
    totalAmount: string;
    createdAt: string;
  }

const UserOrder = () => {
    const { user } = useSelector((state: RootState) => state.user);
 const [orderData, setOrderData] = useState<Order[]>([]);

 const fetchOrders = async()=>{
  try {
    const orders = await userApi.getUserOrder(user?.id)
    if(orders){
        setOrderData(orders)
    }else{
        setOrderData([])
    }
  } catch (error) {
    toast.error("Failed to fetch orders")
  }
 }

 useEffect(()=>{
  fetchOrders()
 },[])

 const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatedDate = format(date, "dd-MM-yyyy");
    return formatedDate;
  };

 const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "enrollImage",
      label: "Enroll Image",
      minWidth: 100,
      render: (row: Order) => (
        <img
          src={row.enrollImage}
          alt={row.enrollType}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    { id: "country", label: "Country", minWidth: 100 },
    {
        id: "createdAt",
        label: "Payment",
        minWidth: 100,
        render: ()=> <Button variant="outlined" color="success">Success</Button>
      },
    {
      id: "createdAt",
      label: "Order Date",
      minWidth: 100,
      render: (row: Order) => formatDate(row.createdAt),
    },
    {
      id: "totalAmount",
      label: "Amount (Rs)",
      minWidth: 100,
    },
  ];

  return (
    <div>
        <TableComponent title="Your Orders" columns={columns} data={orderData} />
    </div>
  )
}

export default UserOrder