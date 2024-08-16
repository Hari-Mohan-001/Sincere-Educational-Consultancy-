
interface OrderData {
  labels: string | string[];
  timeframe: string;
  totalOrder: number | number[];
}
interface RevenueData {
  labels: string | string[];
  timeframe: string;
  totalRevenue: number | number[];
}

export const returnRevenueData = ({ labels, timeframe, totalRevenue }: RevenueData) => {
  return {
    labels: Array.isArray(labels) ? labels : [labels],
    datasets: [
      {
        label: `Revenue (${timeframe})`,
        data: Array.isArray(totalRevenue) ? totalRevenue : [totalRevenue],
        backgroundColor: ["rgb(55, 102, 102,0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
      },
    ],
  };
};



export const returnOrderData = ({ labels, timeframe, totalOrder }: OrderData) => {
  return {
    labels: Array.isArray(labels) ? labels : [labels],
    datasets: [
      {
        label: `Orders (${timeframe})`,
        data: Array.isArray(totalOrder) ? totalOrder : [totalOrder],
        backgroundColor: ["rgb(255, 102, 102,0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
      },
    ],
  };
};

export const ChartOptions = (textName:string)=>{

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
        text: textName,
      },
    },
  };
  return options
}