import "./index.scss";
import Coin from "../../assets/coin.png";
import Dino from "../../assets/dino.png";
import JP from "../../assets/jp.png";

const JurrassicPark = ({coins, dinos}) => {
  const title_in = () => (document.title = `Keep Focusing!`);
  window.onfocus = title_in;

  return (
    <div className="home__wrap" >
       <img src={JP} alt="jurassic park" className="logo-img"/>
      <div class="row">
        <div class="column" >
          <img src={Coin} alt="coin" width={300} height={300} /><br />
          {"Coins  :  " + coins}
        </div>
        <div class="column"><img src={Dino} alt="dino" width={300} height={300}/>
              {"Dinos  :  " + dinos}
        </div>
      </div>
      <div>
        <a href="/">
          <button className="start__button" >Make more coins & Dinos</button>
        </a>
      </div>
    </div>
  );
};
export default JurrassicPark;
