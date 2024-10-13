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
      {/* Overlay for Hover Content */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center">
        <div className="text-center text-white px-4 mb-12"> {/* Moved the text content to allow space for the button */}
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
