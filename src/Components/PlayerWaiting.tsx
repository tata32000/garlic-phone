import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

const PlayerWaiting = () => {
  const navigate = useNavigate();
  const gameId: string = localStorage.getItem("gameId") || "";
  const [counter, setCounter] = useState();
  const [playerLength, setPlayerLength] = useState(0);

  useEffect(() => {
    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(gameRef, (doc) => {
      if (doc.exists()) {
        const gameData = doc.data();
        setCounter(gameData.counter || 0);
        setPlayerLength(gameData.playerLength);

        console.log("gameData.counter: ", gameData.counter);
        console.log("gameData.playerLength: ", gameData.playerLength);
        console.log("gameData.rounds: ", gameData.rounds);

        if (gameData.counter === gameData.playerLength * gameData.rounds) {
          navigate(`/game-reveal/${gameId}`);
          return;
        }
        if (gameData.counter % gameData.playerLength === 0) {
          navigate(`/game-room-read/${gameId}`);
        }
      } else {
        // Handle the case where the game does not exist
        console.log("No such game!");
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, [gameId]);

  return (
    <>
      <div>
        Waiting for other players... {counter} / {playerLength}
      </div>
    </>
  );
};

export default PlayerWaiting;
