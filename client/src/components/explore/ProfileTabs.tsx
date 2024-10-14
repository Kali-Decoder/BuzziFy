import React from "react";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-s2 mb-6">
      <ul className="flex space-x-6 text-lg">
        <li
          className={`cursor-pointer py-3 ${activeTab === "posts" ? "border-b-2 border-blue-500 font-semibold text-p4" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </li>
        <li
          className={`cursor-pointer py-3 ${activeTab === "highlights" ? "border-b-2 font-semibold border-blue-500 text-p4" : ""}`}
          onClick={() => setActiveTab("highlights")}
        >
          Highlights
        </li>
        <li
          className={`cursor-pointer py-3 ${activeTab === "activity" ? "border-b-2 font-semibold border-blue-500 text-p4" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          Activity
        </li>
      </ul>
    </div>
  );
};

export default ProfileTabs;
