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

const mockProfileData = {
  id: 1,
  name: "0xcBe600349CE4cF89842Bc371E4a4062140CDCCcD",
  username: "ariana19",
  imageUrl:
    "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTylcWMdKvrdW88y8JhlrkqTxwIFnVBIzYE6Svp6I2pSo6d1J6k",
  bio: "Content Creator • Singer • Entrepreneur",
  followers: 100000000,
  following: 200,
  posts: [
    {
      id: 1,
      imageUrl:
        "https://www.rollingstone.com/wp-content/uploads/2024/03/GettyImages-2074745918-1.jpg?w=1581&h=1054&crop=1",
      likes: 230,
      comments: 12,
    },
    {
      id: 2,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9RV36uovdWkNPRrXnKDtrv16xN2p0FAfBw&s",
      likes: 120,
      comments: 8,
    },
    {
      id: 3,
      imageUrl:
        "https://media.allure.com/photos/64dfa6396466b2d228974cac/4:3/w_2664,h_1998,c_limit/ariana%20grande%20rem%20foundation%20launch.jpg",
      likes: 390,
      comments: 50,
    },
    {
        id: 4,
        imageUrl:
          "https://www.rollingstone.com/wp-content/uploads/2024/03/GettyImages-2074745918-1.jpg?w=1581&h=1054&crop=1",
        likes: 230,
        comments: 12,
      },
      {
        id: 5,
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9RV36uovdWkNPRrXnKDtrv16xN2p0FAfBw&s",
        likes: 120,
        comments: 8,
      },
      {
        id: 6,
        imageUrl:
          "https://media.allure.com/photos/64dfa6396466b2d228974cac/4:3/w_2664,h_1998,c_limit/ariana%20grande%20rem%20foundation%20launch.jpg",
        likes: 390,
        comments: 50,
      },
  ],
};

const ProfilePage: React.FC = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(mockProfileData);
  const [activeTab, setActiveTab] = useState("posts");
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
      {/* Profile Header */}
      <ProfileHeader
        name={profileData.name}
        username={profileData.username}
        imageUrl={profileData.imageUrl}
        bio={profileData.bio}
        followers={profileData.followers}
        following={profileData.following}
      />

      {/* Profile Tabs */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab Content */}
      {activeTab === "posts" && <PostsGrid posts={profileData.posts} />}
      {activeTab === "highlights" && (
        <div className="flex justify-between items-center w-full mb-4">
          <div>Highlights Content</div>

          {/* Dropdown component for graph selection */}
          <Dropdown
            items={graphOptions}
            label="Select Graph"
            onSelect={handleGraphSelect}
            selectedItem={graphOptions.find(item => item.id === selectedGraph) || null}
          />
        </div>
      )}

      {/* Graph based on Dropdown selection */}
      {activeTab === "highlights" && selectedGraph === "engagement" && (
        <EngagementGraph
          organicData={[
            { date: "2024-01-01", value: 300 },
            { date: "2024-01-02", value: 500 },
          ]}
          paidData={[
            { date: "2024-01-01", value: 150 },
            { date: "2024-01-02", value: 250 },
          ]}
        />
      )}
      {activeTab === "highlights" && selectedGraph === "likes" && (
        <LikeGraph
          data={[
            { month: "2024-08", likes: 1200 },
            { month: "2024-09", likes: 1500 },
          ]}
        />
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
    </section>
  );
};

export default ProfilePage;
