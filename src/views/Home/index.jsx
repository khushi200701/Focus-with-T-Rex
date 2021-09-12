import "./index.scss";
import GrowingDino from "../../assets/growing-dino.png";
import JurrassicParkLogo from "../../assets/jp.png";
import MeteorShower from "../../assets/meteor-shower.png";
import { useEffect, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import Confirmation from "../../components/Modal";

const tag = [{
  "name": "T-Rex",
  "minutes": 25,
  "hours": 0,
  "coinsAdd": 10,
  "dinosAdd": 1,
  "coinsSub": 5,
  "dinosKill": 1
}, {
  "name": "M-Rex",
  "minutes": 55,
  "hours": 0,
  "coinsAdd": 30,
  "dinosAdd": 2,
  "coinsSub": 15,
  "dinosKill": 2
  }, {
  "name": "Z-Rex",
  "minutes": 25,
  "hours": 1,
  "coinsAdd": 75,
  "dinosAdd": 4,
  "coinsSub": 30,
  "dinosKill": 4
}]
var tags=[];

const Home = ({coins, dinos, coinsHandler, dinosHandler}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState();
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState("normal");
  const [focusing, setFocusing] = useState(false);
  const [coinsadd, setCoinsadd] = useState(0);
  const [coinssub, setCoinssub] = useState(0);
  const [dinosadd, setDinosadd] = useState(0);
  const [dinoskill, setDinoskill] = useState(0);

  useEffect(() => {
    if (seconds < 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    }
    if (minutes < 0) {
      setHours((h) => h - 1);
      setMinutes(59);
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      stopTimer();
      if (focusing) {
        coinsHandler((coins) => coins + coinsadd);
        dinosHandler((dinos) => dinos + dinosadd);
        setFocusing(false);
      }
      tags.length = 0;
    }
  }, [hours, minutes, seconds]);

  const stopTimer = () => {
    clearInterval(timer);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };
  const giveUp = (data) => {
    setShow(data);
    stopTimer();
    setFocusing(false);
    setStatus("gave up");
    if (coins < coinssub)
      coinsHandler(0)
    else
      coinsHandler((coins) => coins - coinssub);
    if (dinos < dinoskill)
      dinosHandler(0)
    else
      dinosHandler((dinos) => dinos - dinoskill);
    tags.length = 0;
  };
  const leavePage = () => {
    setTimeout(()=> {
        stopTimer();
    setStatus("gave up");
    }, 5000)

  }
  const title_in = () => (document.title = `Keep Focusing!`);
  window.onfocus = title_in;
  window.visibilitychange = leavePage;
  return (
    <div className="home__wrap">
      <Confirmation show={show} giveUp={giveUp} setShow={setShow} />
      <img src={JurrassicParkLogo} alt="jurassic park" className="logo-img"/>
      <div className="home__content">

        {status === "normal" ? (
          <i> Get back to work! You have {coins} coins and {dinos} dinos.</i>) :
          (
            status === "gave up" && <i>Meteors have hit and your dino died. You have {coins} coins and {dinos} dinos.</i>
          )}

        <div className="timer__wrap">

          <div className="timer__visual">

            {status === "normal" ? (
              <img src={GrowingDino} alt="tree" />
            ) : (
              status === "gave up" && <img src={MeteorShower} alt="tree" />
            )}
          </div>
          <div className="timer__numbers">
            {hours < 10 && "0"}
            {hours}:{minutes < 10 && "0"}
            {minutes}:{seconds < 10 && "0"}
            {seconds}
            <div className="add-remove__time">
              <BiUpArrow
                onClick={
                  minutes < 55
                    ? () => setMinutes((m) => m + 5)
                    : () => {
                        setHours((h) => h + 1);
                        setMinutes(0);
                      }
                }
              />
              <BiDownArrow
                onClick={
                  minutes !== 0
                    ? () => setMinutes((m) => m - 5)
                    : () => {
                        if (hours > 0) {
                          setHours((h) => h - 1);
                          setMinutes(55);
                        }
                      }
                }
              />
            </div>
          </div>
          {!focusing && (<div className="tags__buttons">

          <div className="tags__section">
            <div className="tags__only">{tag.forEach((item, index) => {
            tags.push(<button
              disabled={focusing}
              className="tags__button"
              onClick={() => {
                setMinutes(item["minutes"])
                setHours(item["hours"])
                setCoinsadd(item["coinsAdd"])
                setCoinssub(item["coinsSub"])
                setDinosadd(item["dinosAdd"])
                setDinoskill(item["dinosKill"])

              }}
              >
              {item["name"]}
              </button>)
            })}{tags}</div>
            <div className="tags__info">{(coinsadd>0) && (dinosadd>0) && (<>
              <div>You will earn: {coinsadd} coins and {dinosadd} dinos.</div>
              <div>You might loose: {coinssub} coins and upto {dinoskill} dinos.</div></>)
            }
            </div>
          </div>
          <div className="start_navigation_block" >
            <button
              disabled={minutes === 0 && hours === 0 && seconds === 0 && true}
              className="start__button"
              onClick={() => {
                setTimer(() =>
                  setInterval(
                    () => setSeconds((s) => s - 1),
                    //since setINterval is not an asyncrounous function, time is handled in the useEffect
                    1000
                  )
                );
                document.title = `Keep Focusing!`;
                setStatus("normal");
                setFocusing(true);
              }}
            >
              Start
            </button>
            <div>
              <a href="/sessions">
                <button className="navigation__button" >See your Jurassic Park</button>
             </a>
            </div>
          </div>
            </div>
          )}
          {focusing && (
            <div className="give-up__button" onClick={() => {
              setShow(true);
              }}>
              Give up
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
