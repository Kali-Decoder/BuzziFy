"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileHeader from "@/components/explore/ProfileHeader";
import ProfileTabs from "@/components/explore/ProfileTabs";
import PostsGrid from "@/components/explore/PostsGrid";
import EngagementGraph from "@/components/explore/EngagementGraph";
import LikeGraph from "@/components/explore/LikeGraph";
import FollowerGraph from "@/components/explore/FollowersGraph";
import Dropdown from "@/components/Resusables/Dropdown";
import Countdown from "react-countdown";
import PerformanceTable from "@/components/explore/PerformanceTable";

const mockProfileData = {
  id: 0,
  name: "0xcBe600349CE4cF89842Bc371E4a4062140CDCCcD",
  username: "ariana19",
  imageUrl:
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTylcWMdKvrdW88y8JhlrkqTxwIFnVBIzYE6Svp6I2pSo6d1J6k",
  bio: "Content Creator • Singer • Entrepreneur",
  followers: 100000000,
  following: 200,
   posts : [
    {
      id: 0,
      imageUrl:
        "https://www.rollingstone.com/wp-content/uploads/2024/03/GettyImages-2074745918-1.jpg?w=1581&h=1054&crop=1",
      active: true,    
      bets: 15,        
      poolName: "Creator Pool 1",  
      endDate: "Oct 31, 2024",    
      totalAmount: 5000,           
    },
    {
      id: 1,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9RV36uovdWkNPRrXnKDtrv16xN2p0FAfBw&s",
      active: false,   
      bets: 25,        
      poolName: "Creator Pool 2",  
      endDate: "Nov 05, 2024",    
      totalAmount: 8000,           
      finalScore: "4-3",           
      totalRewardDistributed: 6000, 
      winners: ["Alice", "Bob"],   
    },
    {
      id: 2,
      imageUrl:
        "https://media.allure.com/photos/64dfa6396466b2d228974cac/4:3/w_2664,h_1998,c_limit/ariana%20grande%20rem%20foundation%20launch.jpg",
      active: true,    
      bets: 30,        
      poolName: "Creator Pool 3",  
      endDate: "Oct 29, 2024",    
      totalAmount: 7000,           
    },
    {
      id: 3,
      imageUrl:
        "https://www.rollingstone.com/wp-content/uploads/2024/03/GettyImages-2074745918-1.jpg?w=1581&h=1054&crop=1",
      active: false,   
      bets: 18,        
      poolName: "Creator Pool 4",  
      endDate: "Nov 01, 2024",    
      totalAmount: 6500,           
      finalScore: "5-2",           
      totalRewardDistributed: 5000, 
      winners: ["Charlie", "Eve"], 
    },
    {
      id: 4,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9RV36uovdWkNPRrXnKDtrv16xN2p0FAfBw&s",
      active: true,    
      bets: 22,        
      poolName: "Creator Pool 5",  
      endDate: "Oct 30, 2024",    
      totalAmount: 6000,           
    },
    {
      id: 5,
      imageUrl:
        "https://media.allure.com/photos/64dfa6396466b2d228974cac/4:3/w_2664,h_1998,c_limit/ariana%20grande%20rem%20foundation%20launch.jpg",
      active: false,   
      bets: 40,        
      poolName: "Creator Pool 6",  
      endDate: "Nov 07, 2024",    
      totalAmount: 10000,          
      finalScore: "6-4",           
      totalRewardDistributed: 8000, 
      winners: ["Dave", "Frank"],  
    },
  ],
  performanceHistory: [
    {
      poolId: "pool-1",
      score: 75,
      predictions: 80,
      engagementRate: 0.5,
    },
    {
      poolId: "pool-2",
      score: 85,
      predictions: 90,
      engagementRate: 0.6,
    },
    {
      poolId: "pool-3",
      score: 80,
      predictions: 85,
      engagementRate: 0.55,
    },
    {
      poolId: "pool-4",
      score: 90,
      predictions: 88,
      engagementRate: 0.65,
    },
    {
      poolId: "pool-5",
      score: 92,
      predictions: 95,
      engagementRate: 0.70,
    },
    {
      poolId: "pool-6",
      score: 78,
      predictions: 80,
      engagementRate: 0.52,
    },
    {
      poolId: "pool-7",
      score: 88,
      predictions: 87,
      engagementRate: 0.68,
    },
    {
      poolId: "pool-8",
      score: 95,
      predictions: 93,
      engagementRate: 0.72,
    },
    {
      poolId: "pool-9",
      score: 81,
      predictions: 85,
      engagementRate: 0.60,
    },
    {
      poolId: "pool-10",
      score: 86,
      predictions: 89,
      engagementRate: 0.67,
    },
  ],
  
  
};

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(mockProfileData);
  const [activeTab, setActiveTab] = useState("pools");
  const [selectedGraph, setSelectedGraph] = useState("engagement");

  useEffect(() => {
    if (id) {
      setProfileData(mockProfileData);
    }
  }, [id]);

  const graphOptions = [
    { name: "Engagement Graph", id: "engagement" },
    { name: "Likes Growth", id: "likes" },
    { name: "Follower Growth", id: "followers" },
  ];

  const handleGraphSelect = (item: { name: string; id: string }) => {
    setSelectedGraph(item.id);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-12 mt-24">
      <ProfileHeader
        name={profileData.name}
        username={profileData.username}
        imageUrl={profileData.imageUrl}
        bio={profileData.bio}
        followers={profileData.followers}
        following={profileData.following}
      />

      {/* Profile Tabs */}
      <div className="flex items-center justify-between">
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Countdown className="text-3xl text-green-400 mb-4" date={Date.now() + 1000000} intervalDelay={0} precision={3} />
      </div>

      {/* Tab Content */}
      {activeTab === "pools" && <PostsGrid posts={profileData.posts} />}
      {/* {activeTab === "activity" && <ActivityTab />} */}
      {activeTab === "highlights" && (
        <div className="flex justify-between items-center w-full mb-4">
          <div>Highlights Content</div>
          <Dropdown
            items={graphOptions}
            label="Select Graph"
            onSelect={handleGraphSelect}
            selectedItem={graphOptions.find((item) => item.id === selectedGraph) || null}
          />
        </div>
      )}

      {/* Graph based on Dropdown selection */}
      {activeTab === "highlights" && selectedGraph === "engagement" && (
        <EngagementGraph
          organicData={[{ date: "2024-01-01", value: 300 }, { date: "2024-01-02", value: 500 }]}
          paidData={[{ date: "2024-01-01", value: 150 }, { date: "2024-01-02", value: 250 }]}
        />
      )}
      {activeTab === "highlights" && selectedGraph === "likes" && (
        <LikeGraph data={[{ month: "2024-08", likes: 1200 }, { month: "2024-09", likes: 1500 }]} />
      )}
      {activeTab === "highlights" && selectedGraph === "followers" && (
        <FollowerGraph
          comparisonData={[
            {
              label: "Organic Followers",
              data: [
                { month: "2024-08", followers: 8000 },
                { month: "2024-09", followers: 8500 },
                { month: "2024-10", followers: 9000 },
              ],
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
            {
              label: "Paid Followers",
              data: [
                { month: "2024-08", followers: 1000 },
                { month: "2024-09", followers: 1500 },
                { month: "2024-10", followers: 2000 },
              ],
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
            },
          ]}
        />
      )}

      {/* New Tab for Performance History */}
      {activeTab === "performance" && (
        <PerformanceTable profileData={profileData}/>
      )}
    </section>
  );
};

export default ProfilePage;
