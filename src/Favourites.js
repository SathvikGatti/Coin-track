import React from "react";
import SingleCoin from "./SingleCoin";

const Favourites = ({ fav, updateFav }) => {
  return (
    <div className="coins-container">
      <div className="heads">
        <p className="coins-rank">Coin Rank</p>
        <p>coin</p>
        <p>symbol</p>
        <p>Price</p>
        <p>24h change</p>
        <p>Market Cap</p>
      </div>
      {fav.map((coin, index) => {
        return (
          <SingleCoin
            index={index}
            coin={coin}
            key={index}
            updateFav={updateFav}
            from={"Favourites"}
          />
        );
      })}
    </div>
  );
};

export default Favourites;
