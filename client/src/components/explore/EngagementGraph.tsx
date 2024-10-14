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
  TimeScale,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface EngagementGraphProps {
  organicData: { date: string; value: number }[];
  paidData: { date: string; value: number }[];
}

const EngagementGraph: React.FC<EngagementGraphProps> = ({
  organicData,
  paidData,
}) => {
  const data = {
    labels: organicData.map((d) => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: "Organic Engagement",
        data: organicData.map((d) => d.value),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Paid Engagement",
        data: paidData.map((d) => d.value),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scaleFontColor: "#FFFFFF",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            color: "white", 
          },
        },
      },
      title: {
        display: true,
        text: "Engagement Metrics",
        font: {
          size: 18,
          color: "white", 
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "#333", 
        titleFont: { size: 14, weight: "bold", color: "white" }, 
        bodyFont: { size: 12, color: "white" },
        borderColor: "#555", 
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
          font: {
            size: 14,
            color: "white", 
          },
        },
        ticks: {
          font: {
            size: 12,
            color: "white", 
          },
        },
      
      },
      y: {
        title: {
          display: true,
          text: "Engagement",
          font: {
            size: 14,
            color: "white",
          },
        },
        ticks: {
          font: {
            size: 12,
            color: "white", 
          },
        },
      
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 shadow-lg rounded-lg p-6 text-white">
        {/* <h2 className="text-2xl font-semibold text-center text-white mb-4">Engagement Graph</h2> */}
        <div className="h-96 w-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default EngagementGraph;
