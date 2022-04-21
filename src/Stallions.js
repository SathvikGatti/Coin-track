import React from "react";
import SingleCoin from "./SingleCoin";

const Stallions = ({ data, updateFav }) => {
  return (
    <>
      <div className="coins-container">
        <div className="heads">
          <p className="coins-rank">Coin Rank</p>
          <p>coin</p>
          <p>symbol</p>
          <p>Price</p>
          <p>24h change</p>
          <p>Market Cap</p>
        </div>
        {data.map((coin, index) => {
          return (
            <SingleCoin
              index={index}
              coin={coin}
              key={index}
              updateFav={updateFav}
              from={"Stallions"}
            />
          );
        })}
      </div>
    </>
  );
};

export default Stallions;
