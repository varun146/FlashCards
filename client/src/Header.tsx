import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div>
          <a href="/">FlashCardSage</a>
        </div>
        <div>
          <a href="/">Decks</a>
        </div>
        <div>
          <a href="/">Login</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
