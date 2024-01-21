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
      <div className="min-h-screen bg-cover bg-garlic flex items-center justify-center bg-gray-100">
        <div className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-sm text-center">
          <h2 className="text-xl font-semibold mb-4">
            Waiting for other players...
          </h2>
          <p className="text-gray-700 text-lg">
            {counter === undefined ? 0 : counter % playerLength} /{" "}
            {playerLength}
          </p>
          <div className="mt-4">
            <div className="inline-flex w-full overflow-hidden bg-gray-200 rounded-full">
              <div
                style={{
                  width: `${
                    ((counter === undefined ? 0 : counter % playerLength) /
                      playerLength) *
                    100
                  }%`,
                }}
                className="bg-blue-500 h-2 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerWaiting;
