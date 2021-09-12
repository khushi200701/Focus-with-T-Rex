import "./App.css";
import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import JurrassicPark from "./views/JurrassicPark";
import { useEffect, useState } from "react";

function App() {
  const [coins, setCoins] = useState(100);
  const [dinos, setDinos] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("dinos")) {
      setDinos(JSON.parse(localStorage.getItem("dinos")));
    }
    if (localStorage.getItem("coins")) {
      setCoins(JSON.parse(localStorage.getItem("coins")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dinos", JSON.stringify(dinos));
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins, dinos]);

  return (
    <BrowserRouter>
      <Route exact path="/">
        <Home
          coins={coins}
          dinos={dinos}
          coinsHandler={setCoins}
          dinosHandler={setDinos}
        />
      </Route>
      <Route exact path="/sessions">
        <JurrassicPark coins={coins} dinos={dinos} />
      </Route>
    </BrowserRouter>
  );
}
export default App;
