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
  const updateFav = (index) => {
    console.log("Fired with", index);
    let newFav = fav;
    console.log(data[index]["fav"]);
    if (data[index].fav === true) return;
    data[index]["fav"] = true;
    newFav.push(data[index]);
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
