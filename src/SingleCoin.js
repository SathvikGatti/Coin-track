import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const SingleCoin = ({ coin, updateFav, index }) => {
  const {
    id,
    symbol,
    name,
    image,
    current_price,
    market_cap,
    market_cap_rank,
    price_change_percentage_24h,
  } = coin;
  return (
    <>
      <div key={id} className="coin">
        <p className="coins-rank">
          <AiOutlineHeart
            onClick={() => {
              updateFav(index);
            }}
            style={{ position: "relative", top: "2px", right: "2px" }}
          />
          {market_cap_rank}
        </p>
        <p>
          <img
            src={image}
            alt={name}
            style={{ position: "relative", top: "4px", right: "2px" }}
          />
          {name}
        </p>
        <p>{symbol}</p>
        <p>${current_price}</p>
        {price_change_percentage_24h > 0 ? (
          <p className="profit">{price_change_percentage_24h.toFixed(2)}%</p>
        ) : (
          <p className="loss">{price_change_percentage_24h.toFixed(2)}%</p>
        )}

        <p>${market_cap}</p>
      </div>
      <hr className="solid" />
    </>
  );
};
export default SingleCoin;
