import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CreateGame = () => {
  const [userName, setUserName] = useState("");
  const [gameId] = useState(Math.floor(100000 + Math.random() * 900000));
  const [copySuccess, setCopySuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (userName.trim() !== "") {
      navigate(`/waiting-room/${gameId}`);
    } else {
      alert("Please enter a valid user name.");
    }
  };

  const addToGame = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, JSON.stringify(gameId)), {
        player: userName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    navigate(`/waiting-room/${gameId}`);
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
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
