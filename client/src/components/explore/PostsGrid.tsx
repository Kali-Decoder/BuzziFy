import React from "react";
import Image from "next/image";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

interface Post {
  id: number;
  imageUrl: string;
  likes: number;
  comments: number;
}

interface PostsGridProps {
  posts: Post[];
}

const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {posts.map((post) => (
        <div key={post.id} className="relative group">
          <Image
            src={post.imageUrl}
            alt={`Post ${post.id}`}
            width={300}
            height={300}
            className="object-cover w-full h-full"
          />
          {/* Overlay with likes/comments */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center space-x-4">
            <p className="text-white font-semibold flex items-center gap-2">
              {post.likes} <AiFillLike/>
            </p>
            <p className="text-white font-semibold flex items-center gap-2">
              {post.comments} <FaComment/>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsGrid;
