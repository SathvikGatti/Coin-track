import React from "react";
import { useState, useEffect } from "react";
import SingleCoin from "./SingleCoin";

const Portfolio = ({ fav, updateFav, data, portfolio, setPortfolio }) => {
  const [requestedCoin, setRequestedCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [addCoin, setAddCoin] = useState(false);
  const [prices, setPrices] = useState([0, 0, 0]);
  const [dashboardValues, setDashboardValues] = useState([0, 0, 0]);

  const updateAddCoin = () => {
    setAddCoin(!addCoin);
  };

  const getDashboardValues = () => {
    let investedValue = 0;
    let currentValue = 0,
      profitLoss = 0;
    portfolio.forEach((element) => {
      const { usdtBuyPrice, current_price, holding } = element;
      investedValue += parseInt(usdtBuyPrice);
      currentValue += holding * current_price;
    });
    console.log(investedValue);
    console.log(currentValue);
    console.log(((investedValue - currentValue) / investedValue) * 100);
    profitLoss = ((currentValue - investedValue) / currentValue) * 100;
    let dbValues = [
      parseInt(investedValue).toFixed(2),
      parseInt(currentValue).toFixed(2),
      parseInt(profitLoss).toFixed(2),
    ];
    console.log(dbValues);
    setDashboardValues(dbValues);
  };
  useEffect(() => {
    getDashboardValues();
  }, [portfolio]);
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
  const handleAddCoin = (e) => {
    e.preventDefault();
    console.log(prices);
    if (prices[0] <= 0 || prices[1] <= 0) {
      alert("Values cannot be zero or negative");
      return;
    }
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].id === requestedCoin.id) return;
    }
    let newCoin = { ...requestedCoin };
    newCoin["buyPrice"] = prices[0];
    newCoin["usdtBuyPrice"] = prices[1];
    newCoin["holding"] = prices[1] / prices[0];
    setAddCoin(newCoin);
    let newList = portfolio.slice();
    newList.push(newCoin);
    setPortfolio(newList);
    getDashboardValues();
  };
  const deleteFromPortfolio = (id) => {
    let newPort = [];
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].id === id) continue;
      newPort.push(portfolio[i]);
    }
    setPortfolio(newPort);
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
        <div className="coin">
          <div className="total-invested dash-ele">
            <h4>Total Invested:{dashboardValues[0]}$</h4>
          </div>
          <div className="current-value dash-ele">
            <h4>Current Value:{dashboardValues[1]}$</h4>
          </div>
          <div
            className={
              dashboardValues[2] > 0 ? "dash-ele db-profit" : "dash-ele db-loss"
            }
          >
            <h4>
              Net Profit/Loss:
              {dashboardValues[2] === "NaN" ? 0 : dashboardValues[2]}%
            </h4>
          </div>
        </div>
      </div>
      {/* ///////////// Search Result container///////////////////////// */}
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
                  from={"Portfolio-search"}
                  updateAddCoin={updateAddCoin}
                />
              </div>
            )}
          </div>
        )}
        {addCoin && (
          <div className="add-form">
            <form onSubmit={handleAddCoin} style={{ width: "100%" }}>
              <div className="form-control">
                <div style={{ marginTop: "2%" }}>
                  <label htmlFor="buyprice">Buy price</label>
                  <input
                    type="number"
                    min="0"
                    className=""
                    step="any"
                    id="buyprice"
                    name="buyprice"
                    value={prices[0]}
                    onChange={(e) => {
                      let temp = prices.slice();
                      temp[0] = e.target.value;
                      setPrices(temp);
                    }}
                  />
                </div>
                <div style={{ marginTop: "2%", marginLeft: "3%" }}>
                  <label htmlFor="amount">Amount in USDT</label>
                  <input
                    type="number"
                    pattern="^\d*(\.\d{0,2})?$"
                    step="any"
                    id="amount"
                    min="0"
                    name="amount"
                    value={prices[1]}
                    onChange={(e) => {
                      let temp = prices.slice();
                      temp[1] = e.target.value;
                      setPrices(temp);
                    }}
                  />
                </div>
                <button className="btn" style={{ marginTop: "1.75%" }}>
                  add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {/* //////////////////Portfolio table ////////////////// */}

      <div className="coins-container">
        {portfolio.length === 0 ? (
          <h3 style={{ margin: "5px auto" }}>Portfolio's empty! :(</h3>
        ) : (
          <>
            <div className="heads">
              <h4>coin</h4>
              <h4>Price</h4>
              <h4>Entry price</h4>
              <h4>24h change</h4>
              <h4>Current value</h4>
              <h4>Bought price</h4>
              <h4>Profit/Loss</h4>
              <h4>Holdings</h4>
            </div>
            {portfolio.map((coin, index) => {
              return (
                <SingleCoin
                  index={index}
                  coin={coin}
                  key={index}
                  updateFav={updateFav}
                  deleteFromPortfolio={deleteFromPortfolio}
                  from={"Portfolio"}
                />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Portfolio;
/**
 buy price
 usdt price
 amount;
 */
