// import { onSnapshot, doc } from "firebase/firestore";
// import { useState, useEffect } from "react";
// import { db } from "../firebase";

const RevealPage = () => {
    // FOR TESTING PURPOSES
   //  const gameId = localStorage.getItem("gameId") || "";
   //  const [playerAttempts, setPlayerAttempt] = useState<any|unknown>([]);
   /* 
    useEffect(() => {
        const gameRef = doc(db, "games", gameId);

        const unsubscribe = onSnapshot (
            gameRef, 
            (doc: { exists: () => any; data: () => any }) => {
                if (doc.exists()) {
                    const gameData = doc.data();
                    
                    const rawData = Object.entries(gameData.players);    
               
                    const totalPlayers = Object.entries(gameData.players).length; 
                    const rounds = gameData.rounds;
                   
                    const player_turns: any[][] = []; 

                    const player_inputs: any[][] = []; 

                    for (let i = 0; i < totalPlayers; ++i) {
                        const temp = [rawData[i][0]];
                        const valueTemp: any|unknown[] = []; 
                        let roundState = 1;
                        while (roundState <= rounds) {
                            const nextSource = (i + totalPlayers - roundState) % totalPlayers; 
                            temp.push(rawData[nextSource][0]);
                            roundState += 1; 

                        }

                        rawData[i][1].forEach(x => valueTemp.push(x as any)); 
                        player_turns.push(temp);
                        player_inputs.push(valueTemp);
                    }
                    
                    const gameState = [player_turns, player_inputs]; 
                    console.log(gameState);

                    setPlayerAttempt(gameState);
                    
                     
                } else {
                    console.log("Git gud"); 
                }
            }
        );
        return () => unsubscribe(); 
    }, [gameId]); 

    const renderStatements = () => {
        const statements = []; 

        for (let i = 0; i < playerAttempts.length; i += 1) {
            statements.push(<div><p>{playerAttempts[i]} said {playerAttempts[i+1]}</p>);
            for (let j = i + 2; j < playerAttempts.length; j += 2) {
                const person = playerAttempts[j]; 
                const said = playerAttempts[j+1]; 

                statements.push(<p> {person} responded with {said} </p>); 
            }
            statements.push(</div>);
        }

        return statements; 

    }; 

        // <!--div>            {renderStatements()}     </div-->
    */
    const playerName = localStorage.getItem("playerName"); 

    return (
    <div className="min-h-screen bg-garlic flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-screen-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">The results are in!</h1>
   
        <h1 className="text-xl font-bold mb-4">Player: {playerName}</h1>



      </div>
    </div>
    ); 
};

export default RevealPage; 
