import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ReadPage = () => {
    const jumbleAndRandom = (s: string) => {
        
        const n : number= s.length; 

        const s_arr = s.split("");

        const numToAlter : number = Math.floor(n / 3) === 0 ? 1 : Math.floor(n / 3); 
    
        const alteredIndices : { [key: number] : number}= {}; 

        for (let j = 0; j < Math.floor(numToAlter/2);  ++j) {
            
            let indexToRemove; 
            let indexToAlter; 

            do {
                indexToRemove = Math.floor(Math.random() * (n+1)); 
            } while (!(indexToRemove in alteredIndices));

            alteredIndices[indexToRemove] = 1;
            s_arr[indexToRemove] = '_';
            
            do {
                indexToAlter = Math.floor(Math.random() * (n+1)); 
            } while (!(indexToAlter in alteredIndices));

            alteredIndices[indexToAlter] = 1;
            s_arr[indexToAlter] = String.fromCharCode(Math.floor(Math.random() * 26));
            
        }

        return s_arr.join(); 

    }
  const [prompt, setPrompt] = useState("");
  const [playerPrompt, setPlayerPrompt] = useState("");
  const gameId: string = localStorage.getItem("gameId") || "";
  const playerIdx: number = Number(localStorage.getItem("playerIndex")) || 0;

  useEffect(() => {
    const gameRef = doc(db, "games", gameId);

    const unsubscribe = onSnapshot(
      gameRef,
      (doc: { exists: () => any; data: () => any }) => {
        if (doc.exists()) {
          const gameData = doc.data();
          const promptList =
            gameData.players[
              gameData.idx_to_player[(playerIdx + 1) % gameData.playerLength]
            ];

          console.log("promptList: ", promptList);
          setPrompt(promptList[promptList.length - 1]);
        } else {
          // Handle the case where the game does not exist
          console.log("No prompt?!");
        }
      }
    );

    // Clean up the listener
    return () => unsubscribe();
  }, [gameId]);

  const navigate = useNavigate();
  const playerName = localStorage.getItem("playerName");

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      </div>
    </div>
  );
};

export default ReadPage;
