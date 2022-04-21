import React from "react";
import SingleCoin from "./SingleCoin";

const Favourites = ({ fav, updateFav }) => {
  return (
    <div className="coins-container">
      {fav.length === 0 ? (
        <h3 style={{ margin: "5px auto" }}>No favourites to show :(</h3>
      ) : (
        <>
          <div className="heads">
            <h4 className="coins-rank">Coin Rank</h4>
            <h4>coin</h4>
            <h4>symbol</h4>
            <h4>Price</h4>
            <h4>24h change</h4>
            <h4>Market Cap</h4>
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
        </>
      )}
    </div>
  );
};

export default Favourites;
