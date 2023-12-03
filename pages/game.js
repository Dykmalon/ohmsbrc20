// pages/game.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Game from "../src/components/Game";
import { auth } from "../src/lib/firebase";

const GamePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);

      // Redirect to the home page if the user is not logged in
      if (!user) {
        router.push("/");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [router]);

  const handleRedeem = () => {
    // Redirect to the redeem page
    router.push("/redeem");
  };

  return (
    <div className="game">
      {/* <h1>Game Page</h1> */}
      {user && <Game userId={user.uid} onRedeem={handleRedeem} />}
    </div>
  );
};

export default GamePage;
