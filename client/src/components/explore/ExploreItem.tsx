import clsx from "clsx";
import Link from "next/link"; // Import Link for navigation in Next.js
import Button from "../Resusables/Button";

interface ExploreItemProps {
  item: {
    id: number;
    name: string;
    imageUrl: string;
    description: string;
    followers: number;
    platform?: string; 
  };
  containerClassName?: string;
}

const ExploreItem: React.FC<ExploreItemProps> = ({ item, containerClassName }) => {
  return (
    <div
      className={clsx(
        "relative w-full h-80 bg-cover bg-center rounded-lg overflow-hidden group transform transition-transform duration-300 hover:scale-105",
        containerClassName
      )}
      style={{ backgroundImage: `url(${item.imageUrl})` }}
    >
     
      <div className="absolute top-2 right-2 g7 text-white text-xs px-2 py-1 rounded shadow-lg">
        {item.platform === "farcaster" && <span>Farcaster</span>}
        {item.platform === "instagram" && <span>Instagram</span>}
        {item.platform === "twitter" && <span>Twitter</span>}
        {item.platform === "youtube" && <span>Youtube</span>}
      </div>

      {/* Overlay for Hover Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center">
        <div className="text-center text-white px-4 mb-12">
          <p className="text-lg font-bold mb-1">{item.name}</p>
          <p className="text-sm mb-2">{item.description}</p>
          <p className="text-sm font-semibold">{item.followers.toLocaleString()} Followers</p>
        </div>

        {/* Button for navigation to /explore/:id */}
        <Button containerClassName="w-full items-center justify-center flex" href={`/explore/${item.id}`}>
          Bet on Creator
        </Button>
      </div>
    </div>
  );
};

export default ExploreItem;
