import React from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiTwotoneEyeInvisible,
} from "react-icons/ai";

const SingleCoin = (props) => {
  const { coin, updateFav, index, from } = props;
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
          {coin.fav === true ? (
            <AiFillHeart
              onClick={() => {
                if (index === -1) {
                  const { updateSearchFav } = props;
                  updateSearchFav();
                  updateFav(index, from, coin);
                } else updateFav(index, from);
              }}
              className="fav"
            />
          ) : (
            <AiOutlineHeart
              onClick={() => {
                if (index === -1) {
                  const { updateSearchFav } = props;
                  updateSearchFav();
                  updateFav(index, from, coin);
                } else updateFav(index, from);
              }}
              className="fav"
            />
          )}

          {market_cap_rank}
        </p>
        <p>
          <img src={image} alt={name} />
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
