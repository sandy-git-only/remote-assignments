import React, { useState } from 'react';
import styled from 'styled-components';

const LikeButton = styled.button`
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  }
`;

function App() {
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
    <div className="App">
      <LikeButton onClick={handleLikeClick}>
        <span role="img" aria-label="Like">👍</span> 
        ({likeCount})
      </LikeButton>
    </div>
  );
}

export default App;
