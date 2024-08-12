
interface Data{
    labels:string,
    timeframe:string,
    totalOrder:Number|undefined
}

export const returnData =(Data:Data)=>{
    const data = {
        labels: [Data.labels],
        datasets: [
          {
            label: `Order (${Data.timeframe})`,
            data: [Data.totalOrder],
            backgroundColor: ["rgba(75, 192, 192, 0.2)"],
            borderColor: ["rgba(75, 192, 192, 1)"],
            borderWidth: 1,
          },
        ],
      };
      return data
}

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