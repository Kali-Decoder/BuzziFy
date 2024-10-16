"use client";
import React, { useState } from "react";
import BetNowModal from "./BetnowModal";
import Countdown from 'react-countdown';
interface ProfileHeaderProps {
  name: string;
  username: string;
  imageUrl: string;
  bio: string;
  followers: number;
  following: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  username,
  imageUrl,
  bio,
  followers,
  following,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 mb-8 p-4 md:p-8 rounded-lg ">
      {/* Profile Image */}
      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-full border-2 border-s2 p-1.5 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-1 mt-4 md:mt-0 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-p1">@{username}</h2>

          {/* Bet Now Button */}
          <button
            className="mt-4 md:mt-0 bg-gradient-to-r from-s4 via-blue-500 to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition hover:from-s4 hover:via-blue-600 hover:to-purple-700"
            onClick={() => setIsModalOpen(true)}
          >
            Bet Now
          </button>
        </div>

        <p className="mt-1 text-s3 small-compact uppercase">{name}</p>
        <p className="mt-2 text-gray-600">{bio}</p>

        <div className="mt-4 flex justify-center md:justify-start space-x-8">
          {/* Format followers with specific locale */}
          <p className="text-lg font-semibold">
            {followers.toLocaleString("en-IN")} <span className="text-gray-500">Followers</span>
          </p>
          <p className="text-lg font-semibold">
            {following.toLocaleString("en-IN")} <span className="text-gray-500">Following</span>
          </p>
        </div>
      </div>


      {/* Bet Now Modal */}
      <BetNowModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfileHeader;
