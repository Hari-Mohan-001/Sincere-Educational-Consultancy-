import { Box, Button, TextField } from "@mui/material";
import TableComponent from "../../Layout/Table";
import { useEffect, useState } from "react";
import { adminApi } from "../../../Api/adminApi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

interface OrderData {
  orders: Order[];
  grandTotalAmount: number;
}

const OrderList = () => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const fetchOrders = async (start?: string, end?: string) => {
    try {
      const orders = await adminApi.getAllOrders(start, end);
      setOrderData(orders);
    } catch (error) {
      console.error(error);
      toast.error("failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDateFilter = () => {
    if (startDate && endDate) {
      fetchOrders(startDate, endDate);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formatedDate = format(date, "dd-MM-yyyy");
    return formatedDate;
  };

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getTodayDate();

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
      label: "Date",
      minWidth: 100,
      render: (row: Order) => formatDate(row.createdAt),
    },
    {
      id: "totalAmount",
      label: "Amount (Rs)",
      minWidth: 100,
    },
  ];

  const pdfColumns = columns.filter((column) => column.id !== "enrollImage");

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add title to the document
    doc.text("Sales Report", 14, 15);

    // Add date range if filtered
    if (startDate && endDate) {
      doc.setFontSize(11);
      doc.text(
        `Date Range: ${formatDate(startDate)} to ${formatDate(endDate)}`,
        14,
        25
      );
    }

    // Create the table
    (doc as any).autoTable({
      head: [pdfColumns.map((column) => column.label)],
      body:
        orderData?.orders.map((order) => [
          order.userName,
          order.userEmail,
          order.enrollType,
          order.country,
          formatDate(order.createdAt),
          order.totalAmount,
        ]) || [],
      startY: startDate && endDate ? 30 : 20,
    });

    // Add total amount
    const finalY = (doc as any).lastAutoTable.finalY || 40;
    doc.text(
      `Total Order Value: Rs ${orderData?.grandTotalAmount || 0}`,
      14,
      finalY + 10
    );

    // Save the PDF
    doc.save("order_report.pdf");
  };

  return (
    <div className="">
      <Box sx={{ display: "flex", gap: 2, mb: 2, mt: 5, ml: 4 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
        />
        <Button variant="contained" onClick={handleDateFilter}>
          Filter
        </Button>
      </Box>
      {orderData && (
        <>
          <TableComponent
            title="Orders"
            columns={columns}
            data={orderData.orders}
          />
          <div className="mt-4 mr-2 ml-3">
            <h1>
              Total Order value:{" "}
              <span className="text-xl font-bold">
                Rs {orderData.grandTotalAmount}
              </span>{" "}
            </h1>
          </div>
        </>
      )}
      <div className="mt-4 mr-2 ml-3">
        <Button variant="contained" onClick={downloadPDF}>
          Download Report
        </Button>
      </div>
    </div>
  );
};

export default OrderList;
