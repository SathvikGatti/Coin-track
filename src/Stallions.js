import React from "react";
import SingleCoin from "./SingleCoin";

const Stallions = ({ data, updateFav }) => {
  return (
    <>
      <div className="coins-container">
        <div className="heads">
          <h4 className="coins-rank">Coin Rank</h4>
          <h4>coin</h4>
          <h4>symbol</h4>
          <h4>Price</h4>
          <h4>24h change</h4>
          <h4>Market Cap</h4>
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
