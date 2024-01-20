import { useState } from "react";

const WaitingRoom = () => {
  // list of players from firebase database
  const [players] = useState([]);

  // show list of players and play button
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Waiting Room</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="players"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Players
            </label>
            <p>{players}</p>
          </div>

          <button className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            <a href="/" className="no-underline text-white">
              Home
            </a>
          </button>
          <button
            type="submit"
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Play
          </button>
        </form>
      </div>
    </div>
  );
};

export default WaitingRoom;
