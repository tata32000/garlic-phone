import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ReadPage = () => {
  const modifyString = (str: string) => {
    const strLength = str.length;
    const thirdLength = Math.floor(strLength / 3);

    let newStr = str.split("");
    let processedIndices = new Set();

    // Replace 1/3 of the characters with underscores
    for (let i = 0; i < thirdLength; ) {
      const randomIndex = Math.floor(Math.random() * strLength);
      if (!processedIndices.has(randomIndex)) {
        newStr[randomIndex] = "_";
        processedIndices.add(randomIndex);
        i++;
      }
    }

    // Randomize another 1/3 of the characters
    for (let i = 0; i < thirdLength; ) {
      const randomIndex = Math.floor(Math.random() * strLength);
      if (!processedIndices.has(randomIndex)) {
        const randomChar = String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        ); // Random lowercase letter
        newStr[randomIndex] = randomChar;
        processedIndices.add(randomIndex);
        i++;
      }
    }

    return newStr.join("");
  };

  // NOTE: Change this to generatePrompt()
  const [prompt, setPrompt] = useState("");
  const [playerPrompt, setPlayerPrompt] = useState("");
  const gameId: string = localStorage.getItem("gameId") || "";
  const playerIdx: number = Number(localStorage.getItem("playerIndex")) || 0;

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameRef = doc(db, "games", gameId);
        const docSnap = await getDoc(gameRef);

        if (docSnap.exists()) {
          const gameData = docSnap.data();
          const promptList =
            gameData.players[
              gameData.idx_to_player[(playerIdx + 1) % gameData.playerLength]
            ];

          console.log("promptList: ", promptList);
          const randomizedPrompt = modifyString(
            promptList[promptList.length - 1]
          );
          setPrompt(randomizedPrompt);
        } else {
          console.log("No such game or prompt!");
        }
      } catch (error) {
        console.error("Error fetching game data: ", error);
      }
    };

    fetchGameData();
  }, [gameId]);

  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName");

  const postPlayerPrompt = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (playerPrompt.trim() === "") {
      alert("Please enter a valid prompt");
      return;
    }

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
        playerPrompts.push(prompt); // Append randomized prompt
        playerPrompts.push(playerPrompt); // Append new prompt
        updatedPlayers[playerName] = playerPrompts;

        if (gameData.counter + 1 === playerLength * gameData.rounds) {
          if (gameData.rounds === playerLength) {
            await updateDoc(gameRef, {
              players: updatedPlayers,
              counter: gameData.counter + 1,
            });
            console.log("Player prompt submitted: ", playerPrompt);
            navigate(`/game-reveal/${gameId}`);
            return;
          }
          await updateDoc(gameRef, {
            players: updatedPlayers,
            counter: gameData.counter + 1,
            rounds: gameData.rounds + 1,
          });

          console.log("Player prompt submitted: ", playerPrompt);
          navigate(`/game-room-wait/${gameId}`);
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
    <div className="min-h-screen bg-garlic flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Your prompt is {prompt}</h1>
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
          Submit
        </button>
        <button
          onClick={() => setPlayerPrompt("")}
          className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ReadPage;
