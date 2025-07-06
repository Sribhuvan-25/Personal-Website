import React, { useState } from 'react';

const Tile = () => {
  return <div>Yyoyoy</div>;
};

const Button = () => {
  const [showTile, setShowTile] = useState(false);

  const handleClick = () => {
    setShowTile(!showTile);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle Tile</button>
      {showTile && <Tile />}
    </div>
  );
};

export default Button;