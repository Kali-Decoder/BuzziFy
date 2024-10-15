import React from "react";
import { useDataContext } from "@/context/DataContext";
import { useAccount } from "wagmi";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Bet {
  user: string;
  amount: number;  
  targetScore: number; 
  claimedAmount: number;
  claimed: boolean;
}

const ActivityTab: React.FC = () => {
  const { poolBets } = useDataContext();
  const { address } = useAccount();

 
  const createHistogramData = (bets: Bet[]) => {
    const ranges = [
      { range: "0-100", totalAmount: 0 },
      { range: "100-200", totalAmount: 0 },
      { range: "200-300", totalAmount: 0 },
      { range: "300-400", totalAmount: 0 },
      { range: "400-500", totalAmount: 0 },
    
    ];

    // Aggregate amounts within each range
    bets.forEach((bet) => {
      if (bet.targetScore >= 0 && bet.targetScore < 100) {
        ranges[0].totalAmount += bet.amount;
      } else if (bet.targetScore >= 100 && bet.targetScore < 200) {
        ranges[1].totalAmount += bet.amount;
      } else if (bet.targetScore >= 200 && bet.targetScore < 300) {
        ranges[2].totalAmount += bet.amount;
      } else if (bet.targetScore >= 300 && bet.targetScore < 400) {
        ranges[3].totalAmount += bet.amount;
      } else if (bet.targetScore >= 400 && bet.targetScore <= 500) {
        ranges[4].totalAmount += bet.amount;
      } 
    });

    return ranges;
  };

  const histogramData = createHistogramData(poolBets || []);


  const data = {
    labels: histogramData.map((range) => range.range), 
    datasets: [
      {
        label: "Total Amount",
        data: histogramData.map((range) => range.totalAmount), 
        backgroundColor: "rgba(99, 132, 255, 0.7)",
        borderColor: "rgba(99, 132, 255, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 206, 86, 0.8)", 
        hoverBorderColor: "rgba(255, 206, 86, 1)",
      },
    ],
  };

 
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Total Amount Distribution Histogram",
        color: "#ffffff", 
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", 
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Score Ranges",
          color: "#ffffff",
        },
        ticks: {
          color: "#ffffff", 
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Amount",
          color: "#ffffff",  
        },
        ticks: {
          color: "#ffffff",  
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: "index" as const, 
      intersect: false, 
    },
    animation: {
      duration: 1000, 
      easing: "easeInOutQuad", 
    },
  };

  return (
    <div className="flex flex-col items-center w-full justify-center">
      <div className="sm:border w-full sm:py-6 sm:px-4 rounded-md">
        <h1 className="text-lg font-bold flex items-center gap-2 tracking-wide">
          Transactions
        </h1>
        <table
          className="w-full border-collapse font-thin text-sm
                    hover:[&_tbody>tr]:bg-red-50
                    [&_th]:hidden
                    [&_th]:text-white
                    [&_th]:font-thin
                    [&_th]:text-left
                    [&_tr>*]:px-3
                    [&_tr>*]:py-2
                    [&_td]:font-semibold
                    [&_td]:relative 
                    [&_td]:flex
                    first:[&_tr>td]:pt-6
                    last:[&_tr>td]:pb-6
                    [&_td]:items-center 
                    [&_td]:gap-2
                    before:[&_td]:content-[attr(data-cell)]
                    before:[&_td]:font-normal
                    before:[&_td]:w-20
                    [&_div]:flex
                    [&_div]:items-center
                    [&_div]:gap-1
                    [&_div]:flex-wrap
                    [&_span]:rounded-full
                    [&_span]:text-xs
                    [&_span]:py-1
                    [&_span]:px-2
                    sm:first:[&_tr>td]:py-2
                    sm:last:[&_tr>td]:py-2
                    sm:[&_th]:table-cell
                    sm:[&_td]:table-cell
                    sm:before:[&_td]:hidden
                "
        >
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Predicted Score</th>
              <th>Claimed Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {poolBets?.map((bet: Bet, index: number) => {
              return (
                <tr key={index}>
                  <td data-cell="User">{bet.user}</td>
                  <td data-cell="Amount">{bet.amount} Buzz</td>
                  <td data-cell="Predicted score">{bet.targetScore}</td>
                  <td data-cell="Claimed amount">{bet.claimedAmount}</td>
                  {address === bet.user && bet.claimed ? (
                    <td>
                      <button className="mt-4 md:mt-0 bg-gradient-to-r from-s4 via-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition hover:from-s4 hover:via-blue-600 hover:to-purple-700">
                        Claim Now
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Activity Bar Chart as Histogram */}
      <div className="mt-10 p-6 w-3/4 h-80 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-bold text-center text-white">Total Amount Distribution Histogram</h2>
        <div>
          <Bar data={data} options={options} height={250} />
        </div>
      </div>
    </div>
  );
};

export default ActivityTab;
