import React from "react";

const Navbar = ({ updateTab, tab }) => {
  return (
    <nav>
      <ul>
        <h2>Coin-Track</h2>
        <div className="links">
          <button
            className={tab === "Stallions" ? "btn-selected" : "btn"}
            onClick={() => {
              updateTab("Stallions");
            }}
          >
            Stallions
          </button>
          <button
            className={tab === "Favourites" ? "btn-selected" : "btn"}
            onClick={() => {
              updateTab("Favourites");
            }}
          >
            Favourites
          </button>
          <button
            className={tab === "Portfolio" ? "btn-selected" : "btn"}
            onClick={() => {
              updateTab("Portfolio");
            }}
          >
            Portfolio
          </button>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
