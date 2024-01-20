import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGame = () => {
  const [userName, setUserName] = useState("");
  // Generate a random 6-digit number as the initial gameId
  const [gameId] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );

  const navigate = useNavigate();

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (userName.trim() !== "") {
      navigate(`/waiting-room/${gameId}`);
    } else {
      alert("Please enter a valid user name.");
    }
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

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
