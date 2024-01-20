import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const CreateGame = () => {
  const [userName, setUserName] = useState("");
  const [gameId, setGameId] = useState<number | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const navigate = useNavigate();

  const checkGameIdExists = async (id: string) => {
    const gameRef = doc(db, "games", id);
    const docSnap = await getDoc(gameRef);

    return docSnap.exists();
  };

  const generateUniqueGameId = async () => {
    let id = null;
    let exists = true;

    while (exists) {
      id = Math.floor(100000 + Math.random() * 900000);
      exists = await checkGameIdExists(JSON.stringify(id));
    }

    setGameId(id);
  };

  useEffect(() => {
    generateUniqueGameId();
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (userName.trim() !== "") {
      navigate(`/waiting-room/${gameId}`);
    } else {
      alert("Please enter a valid user name.");
    }
  };

  const addToGame = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (gameId === null) {
      alert("Please enter a valid game ID");
      return;
    }

    try {
      const gameRef = doc(db, "games", gameId.toString());

      // Check if the game document exists
      const docSnap = await getDoc(gameRef);
      if (docSnap.exists()) {
        // Game exists, update the game document with the new player
        alert("Game already exists");
        return;
      } else {
        // Game does not exist, create a new game document with the gameId
        await setDoc(gameRef, {
          players: { [userName]: [] }, // Initialize with the first player
          idx_to_player: { 0: userName }, // Initialize with the first player
          rounds: 1,
          start: false,
        });

        localStorage.setItem("playerName", userName);
        localStorage.setItem("gameId", gameId.toString());
        localStorage.setItem("playerIndex", "0");
        console.log("New game created with player: ", userName);
      }

      navigate(`/waiting-room/${gameId}`);
    } catch (error) {
      console.error("Error processing the game: ", error);
    }
  };

  const copyLinkToClipboard = () => {
    const link = `http://localhost:5173/waiting-room/${gameId}`;
    navigator.clipboard.writeText(link).then(
      () => {
        setCopySuccess("Link copied to clipboard!");
      },
      (err) => {
        setCopySuccess("Failed to copy the link.");
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-garlic shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Create Game</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Your Game ID:{" "}
              <span className="font-bold text-gray-800">{gameId}</span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyLinkToClipboard}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Copy Game Link
            </button>

            <button
              type="button"
              onClick={addToGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <span className="no-underline text-white">Create Game</span>
            </button>
          </div>

          {copySuccess && (
            <div className="text-green-500 mb-4">{copySuccess}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
