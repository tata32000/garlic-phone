import { useState } from "react";

const WritePage = () => {
    
  const[playerPrompt, setPlayerPrompt] = useState('');
 
  const postPlayerPrompt = () => {
  
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Enter Your Prompt!</h1>
      
        <input id="userInput" type="text" value={playerPrompt}
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
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        <a href="/" className="no-underline text-white">
        Reset
        </a>
        </button>

      </div>
    </div>
  );
};

export default WritePage; 
