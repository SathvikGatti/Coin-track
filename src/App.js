import Navbar from "./Navbar";
import Stallions from "./Stallions";
import { useState, useEffect } from "react";
import Favourites from "./Favourites";
import Portfolio from "./Portfolio";

let url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
function App() {
  const [data, setData] = useState([]);
  const [tab, setTab] = useState("Stallions");
  const [fav, setFav] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const getData = async () => {
    let response = await fetch(url);
    response = await response.json();
    response.map((obj) => {
      return (obj["fav"] = false);
    });
    setData(response);
  };
  const updateFav = (index, from, coin) => {
    console.log(index);
    let newData = data.slice();
    let newFav = [];
    if (from === "Stallions") {
      if (newData[index].fav === true) {
        newData[index].fav = false;
        for (let i = 0; i < fav.length; i++) {
          if (newData[index].id === fav[i].id) continue;
          newFav.push(fav[i]);
        }
      } else {
        newFav = fav.slice();
        newData[index].fav = true;
        newFav.push(newData[index]);
      }
    } else {
      newFav = fav.slice();
      if (index === -1) {
        if (coin.fav === false) {
          coin.fav = true;
          newFav.push(coin);
          setFav(newFav);
          if (coin.market_cap_rank <= 100 && coin.market_cap_rank >= 1) {
            newData[coin.market_cap_rank - 1].fav = true;
            setData(newData);
          }
          return;
        }
        let temp = [];
        for (let i = 0; i < newFav.length; i++) {
          if (coin.id === newFav[i].id) continue;
          temp.push(newFav[i]);
        }
        setFav(temp);
        if (coin.market_cap_rank <= 100 && coin.market_cap_rank >= 1) {
          newData[coin.market_cap_rank - 1].fav = false;
          setData(newData);
        }
        return;
      }
      const ele = newFav[index];
      newFav.splice(index, 1);
      setFav(newFav);
      if (ele.market_cap_rank > 100) return;
      newData = data.slice();
      newData[ele.market_cap_rank - 1].fav = false;
      setData(newData);
    }
    setData(newData);
    setFav(newFav);
  };
  useEffect(() => {
    getData();
  }, []);
  const updateTab = (tab) => {
    setTab(tab);
  };
  return (
    <>
      <Navbar updateTab={updateTab} tab={tab} />
      {tab === "Stallions" && <Stallions data={data} updateFav={updateFav} />}
      {tab === "Favourites" && (
        <Favourites fav={fav} updateFav={updateFav} data={data} />
      )}
      {tab === "Portfolio" && (
        <Portfolio
          fav={fav}
          updateFav={updateFav}
          data={data}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
        />
      )}
    </>
  );
}

export default App;
