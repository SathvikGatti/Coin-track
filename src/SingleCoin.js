import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { VscChromeClose } from "react-icons/vsc";

const SingleCoin = (props) => {
  const { coin, updateFav, index, from, deleteFromPortfolio } = props;
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
  let { buyPrice, usdtBuyPrice, holding } = coin;
  return (
    <>
      <div key={id} className="coin">
        {from !== "Portfolio" && (
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

            {market_cap_rank >= 0 && market_cap_rank}
          </p>
        )}
        <p>
          {from === "Portfolio" && (
            <button
              className="add-btn"
              onClick={() => {
                deleteFromPortfolio(id);
              }}
            >
              <VscChromeClose />
            </button>
          )}
          <img src={image} alt={name} />
          {name}
        </p>

        {from !== "Portfolio" && <p>{symbol}</p>}
        <p>${current_price}</p>
        {from === "Portfolio" && <p>${buyPrice}</p>}
        {price_change_percentage_24h > 0 ? (
          <p className="profit">
            {price_change_percentage_24h === null
              ? "NULL"
              : `${price_change_percentage_24h.toFixed(2)}%`}
          </p>
        ) : (
          <p className="loss">
            {price_change_percentage_24h === null
              ? "NULL"
              : `${price_change_percentage_24h.toFixed(2)}%`}
          </p>
        )}
        {from === "Portfolio" && <p>${(current_price * holding).toFixed(3)}</p>}
        {from === "Portfolio" && <p>${usdtBuyPrice}</p>}
        {from === "Portfolio" && (
          <p
            className={
              ((current_price * holding - usdtBuyPrice) / current_price) *
                holding *
                100 >
              0
                ? "profit"
                : "loss"
            }
          >
            {(
              ((current_price * holding - usdtBuyPrice) / current_price) *
              holding *
              100
            ).toFixed(2)}
            %
          </p>
        )}
        {from === "Portfolio" && (
          <p>
            {holding.toFixed(3)}
            {symbol}
          </p>
        )}
        {from !== "Portfolio" && (
          <p>
            ${market_cap}
            {from === "Portfolio-search" && (
              <button
                className="add-btn"
                onClick={() => {
                  const { updateAddCoin } = props;
                  updateAddCoin();
                }}
              >
                <GoPlus />
              </button>
            )}
          </p>
        )}
      </div>
      <hr className="solid" />
    </>
  );
};
export default SingleCoin;
/*

coin
current price
entry price
24h change
bought for
current value
profit/loss perc
holdings
*/
