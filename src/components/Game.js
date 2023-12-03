// components/Game.js
import { useState, useEffect } from "react";
import { addPoints, getPoints } from "../lib/firebaseFunctions";
import Logout from "./Logout";
import Ads from "./Ads";

const Game = ({ onRedeem, userId }) => {
  const [points, setPoints] = useState(0);
  const maxDailyPoints = 10000;
  const pointsPerPress = 0.25;
  const [dailyPointsExceeded, setDailyPointsExceeded] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const userPoints = await getPoints(userId);
      setPoints(userPoints);
    };

    fetchPoints();
  }, [userId]);

  const handlePress = async () => {
    if (points < maxDailyPoints) {
      const newPoints = points + pointsPerPress;
      setPoints(newPoints);

      if (newPoints >= maxDailyPoints) {
        setDailyPointsExceeded(true);
      }

      // Use the updated value of newPoints in addPoints
      await addPoints(userId, pointsPerPress);
    } else {
      setDailyPointsExceeded(true);
    }
  };

  return (
    <div>
      {/* <h2>Press the Button!</h2> */}
      <p className="points">{points}</p>
      {dailyPointsExceeded ? (
        <div className="redeem">
        <p className="daily">Daily points exceeded!</p>
        <button>Redeem</button>
        </div>
      ) : (
        <>
          <div className="game-btn">
            <button onClick={handlePress}>Press</button>
          </div>
          {points >= maxDailyPoints && <button onClick={onRedeem}>Redeem</button>}
          <div className="ads-game">
            <Ads />
          </div>
          <div className="bot-logout" >
              <Logout/>
          </div>
        
        </>
      )}
    </div>
  );
};

export default Game;
