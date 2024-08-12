import { useEffect, useState } from "react";
import { adminApi } from "../../../Api/adminApi";
import { ResponseUserData } from "../../../Interface/User/UserInterface";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartOptions, returnData } from "./DataAndOptionsChart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard  = () => {

  const [users, setUsers] = useState<ResponseUserData[]>([]);
  const[enrolledCount, setEnrolledCount] = useState<Number>()
  const[totalUsers, setTotalUsers] = useState()
  const[totalRevenue , setTotalRevenue] = useState()
  const[totalOrder, setTotalOrder] = useState<Number>()
  const [timeframe, setTimeframe] = useState<string>("monthly"); // Default to monthly
  const [orderTimeframe, setOrderTimeframe] = useState<string>("monthly");

  useEffect(()=>{
     const getUsers = async()=>{
      const data = await adminApi.getAllUsers()
      if (!data) {
        // Show error toast notification
        toast.error("failed to fetch users");
      } else {
        // Set users data to state
        setUsers(data);
        setTotalUsers(data.length)
      }
     } 
     getUsers()
  },[])

  useEffect(() => {
    // Move the logic for counting enrolled users to a separate useEffect
    if (users.length > 0) {
      const count = users.filter((user) => user.isEnrolled).length;
      console.log(count);
      setEnrolledCount(count);
    }
  }, [users]); 

  useEffect(() => {
    // Fetch revenue data based on the selected timeframe
    const getTotalAmount = async () => {
      const amount = await adminApi.getTotalRevenue(timeframe);
      if (amount || amount==0) {
        setTotalRevenue(amount);
      }
       else {
        toast.error("Failed to fetch amount");
      }
    };

    getTotalAmount();
  }, [timeframe]); // Update when the timeframe changes

  useEffect(()=>{
       const getTotalOrders = async()=>{
        const orders = await adminApi.getTotalOrders(orderTimeframe)
        if (orders || orders==0) {
          setTotalOrder(orders);
        }
         else {
          toast.error("Failed to fetch orders");
        }
       }
       getTotalOrders()
  },[orderTimeframe])

   // Chart.js data
   const data = {
    labels: ["Total Revenue"],
    datasets: [
      {
        label: `Revenue (${timeframe})`,
        data: [totalRevenue],
        backgroundColor: ["rgb(255, 102, 102,0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

   // Chart.js options
   const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Revenue Chart",
      },
    },
  };
const orderData = returnData({labels:'Total Order',timeframe:orderTimeframe,totalOrder:totalOrder})
const orderOptions = ChartOptions("Total Order Chart")



  return (
    
    <section className=" w-full">
      <div className="flex p-5 w-full max-h-64 justify-around ">
        <div className="bg-green-500 min-w-40 h-40 shadow-xl rounded-lg">
          <h1 className="p-3 text-center text-2xl font-bold">Total Students</h1>
            {totalUsers && <h1 className="text-center mt-5 text-xl font-semibold">{totalUsers}</h1>}
        </div>
        <div className="bg-orange-500 min-w-40 h-40 shadow-xl rounded-lg">
        <h1 className="p-3 text-center text-2xl font-bold">Enrolled Students</h1>
        {enrolledCount && <h1 className="text-center mt-5 text-xl font-semibold">{enrolledCount.toString()}</h1>}
        </div>
        <div className="bg-violet-700 min-w-40 h-40 shadow-xl rounded-lg">
        <h1 className="p-3 text-center text-2xl font-bold">Total Revenue</h1>
        {totalRevenue && <h1 className="text-center mt-5 text-xl font-semibold">Rs. {totalRevenue}</h1>}
        </div>

      </div>
      <div className="w-full flex justify-center mt-10">
        <div style={{ width: "80%", height: "350px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <select
          className="p-2 border rounded"
          value={timeframe}
         onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div className="w-full flex justify-center mt-10">
        <div style={{ width: "80%", height: "350px" }}>
          <Bar data={orderData} options={orderOptions} />
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <select
          className="p-2 border rounded"
          value={orderTimeframe}
         onChange={(e) => setOrderTimeframe(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </section>

    
  );
};

export default AdminDashboard;
