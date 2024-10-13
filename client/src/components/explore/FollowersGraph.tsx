import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface FollowerGraphProps {
  comparisonData: {
    label: string;
    data: { month: string; followers: number }[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const FollowerGraph: React.FC<FollowerGraphProps> = ({ comparisonData }) => {
  const chartData = {
    labels: comparisonData[0].data.map((d) => d.month), // Assumes all datasets share the same labels
    datasets: comparisonData.map((dataset) => ({
      label: dataset.label,
      data: dataset.data.map((d) => d.followers),
      borderColor: dataset.borderColor,
      backgroundColor: dataset.backgroundColor,
      fill: true,
      tension: 0.3,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Comparison of Follower Growth",
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
          text: "Number of Followers",
        },
      },
    },
  };

  return (
    <div className="h-96 w-full md:w-3/4 lg:w-2/3 mx-auto">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default FollowerGraph;
