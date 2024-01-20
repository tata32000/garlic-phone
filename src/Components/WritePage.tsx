import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const WritePage = () => {
  const [playerPrompt, setPlayerPrompt] = useState("");
  const gameId = localStorage.getItem("gameId");
  const playerName = localStorage.getItem("playerName");
  const navigate = useNavigate();

  const postPlayerPrompt = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!gameId || !playerName) {
      console.error("Game ID or Player Name is missing");
      return;
    }

    try {
      const gameRef = doc(db, "games", gameId);
      const docSnap = await getDoc(gameRef);

      if (docSnap.exists()) {
        const gameData = docSnap.data();
        const updatedPlayers = gameData.players || {};
        const playerPrompts = updatedPlayers[playerName] || [];
        const playerLength = Object.keys(updatedPlayers).length || 0;
        playerPrompts.push(playerPrompt); // Append new prompt
        updatedPlayers[playerName] = playerPrompts;

        // console.log("gameData.counter: ", gameData.counter);
        // console.log("playerLength: ", playerLength);
        // console.log("gameData.rounds: ", gameData.rounds);

        if (gameData.counter + 1 === playerLength * gameData.rounds) {
          await updateDoc(gameRef, {
            players: updatedPlayers,
            counter: gameData.counter + 1,
            rounds: gameData.rounds + 1,
          });
          console.log("Player prompt submitted: ", playerPrompt);
          navigate(`/game-room-read/${gameId}`);
          return;
        }

        await updateDoc(gameRef, {
          players: updatedPlayers,
          counter: gameData.counter + 1,
        });
        console.log("Player prompt submitted: ", playerPrompt);

        navigate(`/game-room-wait/${gameId}`);
      } else {
        console.error("Game does not exist");
      }
    } catch (error) {
      console.error("Unable to submit player prompt! ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Enter Your Prompt!</h1>

        <input
          id="userInput"
          type="text"
          value={playerPrompt}
          onChange={(e) => setPlayerPrompt(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <button
          onClick={postPlayerPrompt}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          <a href="/" className="no-underline text-white">
            Submit
          </a>
        </button>

        <button
          onClick={() => setPlayerPrompt("")}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          <a href="/" className="no-underline text-white">
            Reset
          </a>
        </button>
      </div>
    </div>
  );
};

export default WritePage;
