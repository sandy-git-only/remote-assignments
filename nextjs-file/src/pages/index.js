import { useState } from 'react';

const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(5);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setLikeCount(prevCount => {
      if (isLiked) {
        setIsLiked(false);
        return prevCount - 1;
      } else {
        setIsLiked(true);
        return prevCount + 1;
      }
    });
  };

  return (
    <button
      className={`text-xl py-2 px-4 bg-blue-700 text-white rounded-md cursor-pointer `}
      onClick={handleLikeClick}
    >
      <span role="img" aria-label="Like">👍</span>
      Like ({likeCount})
    </button>
  );
};


const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LikeButton />
    </div>
  );
};

export default Home;