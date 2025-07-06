```jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ image1, image2, onClick }) => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
    onClick();
  };

  return (
    <button onClick={handleClick} className="toggle-button">
      <img src={toggle ? image2 : image1} alt="toggle button" />
    </button>
  );
};

Button.propTypes = {
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
```

```css
/* Button.css */

.toggle-button {
  border: none;
  background: none;
  cursor: pointer;
}

.toggle-button img {
  width: 50px;
  height: 50px;
}
```
This code creates a new Button component in React with props for two images and an onClick function. The component renders an image, which changes based on a piece of state that toggles between true and false. The onClick function toggles this piece of state. The Button.css file contains styles for the button.