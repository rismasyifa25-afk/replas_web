import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useState } from "react"

export function LikeButton () {
  const [isLiked, setIsLiked] = useState(false)

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // ⬅️ mencegah klik naik ke Card
    setIsLiked(!isLiked);
  };
  
  return(

    <button
    onClick={toggleLike}
    className={cn(
      "p-2 rounded-full transition-all duration-200 transform hover:scale-110",
      isLiked ? "text-red-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
    )}
    aria-label={isLiked ? "Unlike product" : "Like product"}
  >
    <Heart
      className={cn("h-6 w-6 transition-all duration-200", isLiked ? "fill-current scale-110" : "scale-100")}
    />
  </button>
  )
}


export default LikeButton;