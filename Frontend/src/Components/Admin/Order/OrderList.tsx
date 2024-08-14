
import { Box, Button } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import { adminApi } from "../../../Api/adminApi";



interface Order{
  _id: string;
  userName: string;
  userEmail: string;
  enrollType: string;
  enrollImage:string;
  country:string;
  totalAmount: string;
}

interface OrderData{
    orders:Order[];
    grandTotalAmount: number
}
    
const OrderList = () => {
  useEffect(() => {
    const fetchOrders = async () => {
      
      try {
          const orders = await adminApi.getAllOrders()
          setOrderData(orders);
          console.log('setubi',orders);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  const [orderData, setOrderData] = useState<OrderData | null>(null);


  const columns = [
    { id: "userName", label: "Name", minWidth: 100 },
    { id: "userEmail", label: "Email", minWidth: 100 },
    { id: "enrollType", label: "Enroll Type", minWidth: 50 },
    {
      id: "enrollImage",
      label: "Enroll Image",
      minWidth: 100,
      render: (row: Order) => (
        <img src={row.enrollImage} alt={row.enrollType} style={{ width: 50, height: 50 }} />
      ),
    },
    { id: "country", label: "Country", minWidth: 100},
    {
      id: "totalAmount",
      label: "Amount (Rs)",
      minWidth: 100,
    },
  ];

  return (
    <div className="w-screen">
    {orderData && (
      <>
        <TableComponent title="Orders" columns={columns} data={orderData.orders} />
        <div className="mt-4 mr-2 ml-3">
          <h1>Total Order value: <span className="text-xl font-bold">Rs {orderData.grandTotalAmount}</span> </h1>
        </div>
      </>
    )}
    <div className="mt-4 mr-2 ml-3">
      <Button variant="contained">Download Report</Button>
    </div>
  </div>
);
};

export default OrderList;
