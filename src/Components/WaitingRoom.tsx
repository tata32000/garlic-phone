import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  // list of players from firebase database
  const [players] = useState([]);

  const url = window.location.href; 
  const urlGameId = url.slice(url.indexOf('/waiting-room/') + 14); 
  const gameId = urlGameId.length !== 0 ? urlGameId : ''; 

  const navigate = useNavigate();
 
  const redirectHome = (event: {preventDefault: () => void; }) => {
    event.preventDefault(); 
    navigate('/home'); 
  };

  const toGameScreen = (event: {preventDefault: () => void; }) => {
    event.preventDefault(); 
    navigate(`/game-room/:${gameId}`);
  };

  // show list of players and play button
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Welcome to Room {gameId}</h1>
          <div className="mb-4">
            <label
              htmlFor="players"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Players
            </label>
            <p>{players}</p>
          </div>

          <button 
            onClick={redirectHome} 
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            <a href="/" className="no-underline text-white">
              Home
            </a>
          </button>
          <button
            onClick={toGameScreen}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Play
          </button>
      </div>
    </div>
  );
};

export default WaitingRoom;
