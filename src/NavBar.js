import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({align}) => {
  return (
    
    <nav className={align}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/flutter-app">Live Yatzy</Link>
        </li>
        <li>
          <Link to="/brickgame">Brick Game</Link>
        </li>
        <li>
          <Link to="/todos">Todo Notes</Link>
        </li>
        <li >
          <Link to="/meme">Meme Generator</Link>
        </li>
      </ul>
    </nav>
   
  );
};

export default NavBar;
