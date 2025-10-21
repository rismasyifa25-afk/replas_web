"use client";

import { useNavigate } from "react-router-dom";
import LikeButton from "../element/Button/Like";

interface CardProps {
  id: string | number;
  image: string;
  title: string;
  price: string;
}

export function SiswaCard({ id, image, title, price }: CardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/siswa/product/${id}`)}
      className="bg-white dark:bg-[#100C0C] border border-black dark:border-white rounded-lg shadow-md p-4 cursor-pointer
                 transition-all duration-300 hover:shadow-lg hover:border-red-500 dark:hover:border-red-600 w-full"
    >
      {/* Product Image */}
      <div className="flex justify-center mb-3">
        <img
          width={200}
          height={240}
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-50 h-60 object-cover rounded-md"
        />
      </div>

      {/* Product Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      {/* Price & Like */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Harga
          </span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {price}
          </span>
        </div>
        <LikeButton />
      </div>
    </div>
  );
}

export default SiswaCard;
