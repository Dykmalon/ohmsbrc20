// components/Game.js
import { useState, useEffect } from "react";
import { addPoints, getPoints, setRedeemStatus, getRedeemStatus } from "../lib/firebaseFunctions";
import Logout from "./Logout";
import Ads from "./Ads";
import Coin from "./Coin";

const Game = ({ onRedeem, userId }) => {
  const [points, setPoints] = useState(0);
  const maxDailyPoints = 20;
  const pointsPerPress = 0.25;
  const [dailyPointsExceeded, setDailyPointsExceeded] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [redeemedPoints, setRedeemedPoints] = useState(false);
  const [pointsRedeemed, setPointsRedeemed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userPoints = await getPoints(userId);
      const userRedeemStatus = await getRedeemStatus(userId);
      setPoints(userPoints);
      setPointsRedeemed(userRedeemStatus);
    };

    fetchData();
  }, [userId]);

  const handlePress = async () => {
    if (points < maxDailyPoints && !isUpdating) {
      setIsUpdating(true);
      const newPoints = points + pointsPerPress;
      setPoints(newPoints);

      if (newPoints >= maxDailyPoints) {
        setDailyPointsExceeded(true);
      }

      setIsUpdating(false);

      if (newPoints % 1 === 0) {
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 100); // Remove flash after 1 second
      }
    } else if (!dailyPointsExceeded) {
      setDailyPointsExceeded(true);
    }
  };

  const handleRedeem = async () => {
    setIsUpdating(true);

    // Update the points and redemption status on the server
    await addPoints(userId, points);
    await setRedeemStatus(userId, true);

    // Reset points, show redeemed message, and disable the button until the next day
    setPoints(0);
    setDailyPointsExceeded(false);
    setRedeemedPoints(true);
    setPointsRedeemed(true);
    setIsUpdating(false);
    setTimeout(() => setRedeemedPoints(false), 5000); // Reset redeemed message after 5 seconds
    setTimeout(() => {
      onRedeem();
      setPointsRedeemed(false); // Enable the button after 24 hours (next day)
    }, 86400000);
  };

  return (
    <div className={`mask ${showFlash ? "flash" : ""}`}>
      <div className="bot-logout">
        <Logout />
      </div>
      <div className="intro">
        <h2>Press It and Earn Points</h2>
        <p>Daily point limit is 100000</p>
      </div>

      {dailyPointsExceeded ? (
        <div className="redeem">
          <p className="daily">Daily points exceeded!</p>
          {pointsRedeemed && <p>Daily points redeemed!</p>}
          {redeemedPoints && <p>Points redeemed!</p>}
          {!pointsRedeemed && (
            <button onClick={handleRedeem} disabled={isUpdating}>
              {isUpdating ? "Redeeming..." : "Redeem"}
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="game-btn">
            <div>
            <button onClick={handlePress} disabled={isUpdating || pointsRedeemed}>
                <Coin onClick={handlePress} />
              </button>

            </div>
          </div>

          {points >= maxDailyPoints && (
            pointsRedeemed ? <p className="rdm">Daily points redeemed!</p> : (
              <button onClick={onRedeem} disabled={isUpdating}>
                Redeem
              </button>
            )
          )}

          <Ads />
          <p className="points">{points}</p>
        </>
      )}
    </div>
  );
};

export default Game;
