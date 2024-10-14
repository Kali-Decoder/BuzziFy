import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface LikeGraphProps {
  data: { month: string; likes: number }[];
}

const LikeGraph: React.FC<LikeGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Likes",
        data: data.map((d) => d.likes),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Like Growth Over the Past 2 Months",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Likes",
        },
      },
    },
  };

  return ( <div className="h-96 w-full md:w-3/4 lg:w-2/3 mx-auto"><Bar data={chartData} options={options} /></div>);
};

export default LikeGraph;
