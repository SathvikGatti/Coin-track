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
  const getData = async () => {
    let response = await fetch(url);
    response = await response.json();
    response.map((obj) => {
      obj["fav"] = false;
    });
    setData(response);
  };
  const updateFav = (index, from) => {
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
      {tab === "Favourites" && <Favourites fav={fav} updateFav={updateFav} />}
      {tab === "Portfolio" && <Portfolio />}
    </>
  );
}

export default App;
