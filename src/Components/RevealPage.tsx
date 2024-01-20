import { useState } from "react";

const RevealPage = () => {

    // FOR TESTING PURPOSES
    const arr = "The global poor, regardless of wherever they live in, currently live under a system of oppression. They live under a system of oppression called No Alternatives".split(" ");

    const [playerAttempts] = useState(arr);

    const playerName = localStorage.getItem("playerName"); 

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-screen-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">The results are in!</h1>
   
        <h1 className="text-xl font-bold mb-4">Player: {playerName}</h1>

        <div>
            {playerAttempts.map((response, index) => (
                <p className="w-full" key={index}>{response}</p>
            ))}
        </div>


      </div>
    </div>
    ); 
};

export default RevealPage; 
