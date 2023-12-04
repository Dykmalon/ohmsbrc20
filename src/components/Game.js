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
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      const userPoints = await getPoints(userId);
      setPoints(userPoints);
    };

    fetchPoints();
  }, [userId]);

  const handlePress = async () => {
    if (points < maxDailyPoints && !isUpdating) {
      setIsUpdating(true);
      const newPoints = points + pointsPerPress;
      setPoints(newPoints);

      if (newPoints >= maxDailyPoints) {
        setDailyPointsExceeded(true);
      }

      // Use the updated value of newPoints in addPoints
      await addPoints(userId, pointsPerPress);
      setIsUpdating(false);
    } else {
      setDailyPointsExceeded(true);
    }
  };

  return (
    <div>
      <div className="bot-logout" >
        <Logout />
      </div>
      <div className="intro">
      <h2>Press It and Earn Points</h2>
      <p>Daily point limit is 100000</p>
      </div>

      {dailyPointsExceeded ? (
        <div className="redeem">
          <p className="daily">Daily points exceeded!</p>
          <button>Redeem</button>
        </div>
      ) : (
        <>
          <div className="game-btn">
            <div>
              <button onClick={handlePress} disabled={isUpdating}></button>
            </div>
          </div>

          {points >= maxDailyPoints && <button onClick={onRedeem}>Redeem</button>}

          <Ads />
          {/* <div className="ads-game">
           
          </div> */}
          {/* <div className="line-grp">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        
          </div> */}
          <p className="points">{points}</p>
        </>
      )}
    </div>
  );
};

export default Game;