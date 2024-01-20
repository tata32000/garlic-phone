import { useState } from "react";

const ReadPage = () => {
/*
    const getPlayerInputFromServer = async() => {
        
        const currPlayerId = localStorage.getItem("playerName"); 
        const currGameId = localStorage.getItem("gameId"); 
    }; 
  */ 
    
    const jumbleAndRandom = (s: string) => {
        
        const n = s.length; 

        const s_arr = s.split("");

        const numToAlter = Math.floor(n / 3) === 0 ? 1 : Math.floor(n / 3); 
    
        const alteredIndices = {}; 

        for (let j = 0; j < Math.floor(numToAlter/2);  ++j) {
            
            let indexToRemove = undefined; 
            let indexToAlter = undefined; 

            while (alteredIndices[indexToRemove] !== undefined) {
                indexToRemove = Math.floor(Math.random() * (n+1)); 
                alteredIndices[indexToRemove] = 1;
                s_arr[indexToRemove] = '_';
            }

            while (alteredIndices[indexToAlter] !== undefined) {
                indexToAlter = Math.floor(Math.random() * (n+1)); 
                alteredIndices[indexToAlter] = 1;
                s_arr[indexToAlter] = String.fromCharCode(Math.floor(Math.random() * 26));
            }
        }

        return s_arr.join(); 

    }

    // NOTE: Change this to generatePrompt()
    const [prompt] = useState(""); 
    const [playerPrompt, setPlayerPrompt] = useState("");

    const generatePrompt = () => {
    }; 


    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Your prompt is</h1>
        
        <a className="text-xl font-bold mb-4" >{prompt}</a>

        <input
          id="userInput"
          type="text"
          value={playerPrompt}
          onChange={(e) => setPlayerPrompt(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />


      </div>
    </div>

    );
};

export default ReadPage; 
