import React from "react";
import { useState } from "react";
import SingleCoin from "./SingleCoin";

const Favourites = ({ fav, updateFav, data }) => {
  const [requestedCoin, setRequestedCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const getData = async (apiUrl) => {
    try {
      let response = await fetch(apiUrl);
      if (response.status !== 200) {
        setLoading(false);
        setError("Please check internet connection");
      }
      response = await response.json();
      setLoading(false);
      if (response.length === 0) {
        setError("Could not find what you were looking for:(");
        return;
      }
      let flag = true;
      for (let i = 0; i < fav.length; i++) {
        if (fav[i].id === response[0].id) {
          response[0]["fav"] = true;
          flag = false;
          break;
        }
      }
      if (flag) response[0]["fav"] = false;
      if (response[0].market_cap_rank === null)
        response[0].market_cap_rank = -1;
      setRequestedCoin(response[0]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    setError(false);
    e.preventDefault();
    if (input.length === 0) {
      setError("Please enter something!");
      return;
    }
    setLoading(true);
    let searchCoin = input.toLowerCase();
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${searchCoin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    getData(apiUrl);
  };
  const updateSearchFav = () => {
    let ele = { ...requestedCoin };
    ele.fav = !ele.fav;
    setRequestedCoin(ele);
  };
  return (
    <>
      <div className="coins-container">
        <form className="grocery-form" onSubmit={handleSearch}>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              value={input}
              placeholder="eg: Bitcoin"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />

            <button type="submit" className="submit-btn">
              Search
            </button>
          </div>
        </form>
        {loading === true && <h4>Searching . . .</h4>}
        {requestedCoin.length !== 0 && loading === false && (
          <div>
            <h4>Search Result:</h4>
            {error !== false ? (
              <h4 style={{ width: "50%" }}>{error}</h4>
            ) : (
              <div className="">
                <div className="heads">
                  <h4 className="coins-rank">Coin Rank</h4>
                  <h4>coin</h4>
                  <h4>symbol</h4>
                  <h4>Price</h4>
                  <h4>24h change</h4>
                  <h4>Market Cap</h4>
                </div>
                <SingleCoin
                  index={-1}
                  coin={requestedCoin}
                  key={0}
                  updateFav={updateFav}
                  updateSearchFav={updateSearchFav}
                  from={"Favourites"}
                />
              </div>
            )}
          </div>
        )}
      </div>
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
    </>
  );
};

export default Favourites;
/*
  empty search
  favourites from search
*/
