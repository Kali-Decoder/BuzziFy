"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaTrophy,
  FaChartLine,
  FaUserFriends,
  FaEtsy,
  FaDollarSign,
} from "react-icons/fa";
import Button from "@/components/Resusables/Button";
import RecentBets from "@/components/explore/RecentBets";
import BetNowModal from "@/components/explore/BetnowModal";
import Countdown from "react-countdown"; // Import the Countdown component

// Define PoolDetails interface
interface PoolDetails {
  name: string;
  description: string;
  totalBets: number;
  totalAmountBet: number;
  uniqueUsers: number;
  averageBetSize: number;
  userBets: number;
  endTime: number; // New field to store pool end time
}

// Sample pool data
const poolDetails: Record<string, PoolDetails> = {
  "1": {
    name: "Pool One",
    description: "Betting pool for the upcoming championship.",
    totalBets: 150,
    totalAmountBet: 7500,
    uniqueUsers: 30,
    averageBetSize: 50,
    userBets: 5,
    endTime: Date.now() + 1000000, // Example end time for the pool
  },
  "2": {
    name: "Pool Two",
    description: "Join us in betting on the next big game.",
    totalBets: 200,
    totalAmountBet: 10000,
    uniqueUsers: 40,
    averageBetSize: 50,
    userBets: 0,
    endTime: Date.now() + 2000000, // Example end time for the pool
  },
};

const betsData = [
  { id: 1, amount: 100, user: "User1", status: "Completed" },
  { id: 2, amount: 50, user: "User2", status: "Pending" },
  // Add more bets as needed
];

const PoolDetailPage: React.FC = () => {
  const { id } = useParams();
  const [poolData, setPoolData] = useState<PoolDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const pool = poolDetails[id as string];
      if (pool) {
        setPoolData(pool);
      } else {
        setError("Pool Not Found");
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  return (
    <section className="text-white items-center flex flex-col justify-center container mx-auto px-4 py-12 mt-24 rounded-lg shadow-lg">
      {/* Tabs Section */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`${
            activeTab === "overview"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400"
          } p-2 rounded-md transition duration-300`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("recentBets")}
          className={`${
            activeTab === "recentBets"
              ? "bg-gray-700 text-white"
              : "bg-gray-800 text-gray-400"
          } p-2 rounded-md transition duration-300`}
        >
          Recent Bets
        </button>
      </div>
      <div className="flex w-full flex-col md:flex-row justify-between gap-6">
        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="p-6 border border-gray-700 rounded-lg shadow-md md:w-3/4 bg-gray-900">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl mb-4 font-bold text-primary-500">
                {poolData?.name}
              </h1>

              <Countdown
                className="text-3xl text-green-400 mb-4"
                date={poolData?.endTime}
                intervalDelay={0}
                precision={3}
              />
            </div>
            <p className="text-lg mb-6">{poolData?.description}</p>

            <h2 className="text-3xl font-bold mt-8 mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-4 mb-6 text-lg">
              <li>Safely link your digital wallet to start placing bets.</li>
              <li>Place your bets on the outcomes of your choice.</li>
              <li>Earn points based on the accuracy of your predictions.</li>
              <li>Monitor your performance and compete on the leaderboard.</li>
            </ol>

            <Button
              containerClassName="flex items-center justify-center w-full"
              icon="/images/Wallet.svg"
              onClick={() => setIsModalOpen(true)}
            >
              Place a Bet
            </Button>
          </div>
        )}

        {/* Pool Details Section */}
        {activeTab === "overview" && (
          <div className="p-6 border border-gray-700 rounded-lg shadow-md md:w-1/2 bg-gray-900">
            <h2 className="text-3xl font-bold mb-2">Pool Details</h2>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li className="flex items-center">
                <FaEtsy className="text-yellow-400 mr-2" />
                <strong>Total Bets:</strong> {poolData?.totalBets}
              </li>
              <li className="flex items-center">
                <FaChartLine className="text-green-400 mr-2" />
                <strong>Total Amount Bet:</strong> ${" "}
                {poolData?.totalAmountBet.toLocaleString()}
              </li>
              <li className="flex items-center">
                <FaUserFriends className="text-purple-400 mr-2" />
                <strong>Unique Users:</strong> {poolData?.uniqueUsers}
              </li>
              <li className="flex items-center">
                <FaTrophy className="text-blue-400 mr-2" />
                <strong>Average Bet Size:</strong> ${" "}
                {poolData?.averageBetSize.toFixed(2)}
              </li>
            </ul>

            {/* User Bets Section */}
            <div className="mt-8 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">My Bets</h3>
              {poolData?.userBets > 0 ? (
                <p className="text-lg">
                  You have placed{" "}
                  <span className="font-semibold">{poolData?.userBets}</span>{" "}
                  bets.
                </p>
              ) : (
                <p className="text-lg text-gray-500">
                  You have not placed any bets yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recent Bets Section */}
      {activeTab === "recentBets" && <RecentBets betsData={betsData} />}
      {/* Bet Now Modal */}
      <BetNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default PoolDetailPage;
