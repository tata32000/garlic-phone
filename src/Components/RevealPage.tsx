import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface PlayerData {
  [playerName: string]: string[]; // Assuming each player's data is an array of strings
}

interface GameData {
  players: PlayerData;
  rounds: number;
}

const RevealPage = () => {
  const gameId = localStorage.getItem("gameId") || "";
  const [playersData, setPlayersData] = useState<[string, string[]][]>([]);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    const fetchGameData = async () => {
      const gameRef = doc(db, "games", gameId);
      const docSnap = await getDoc(gameRef);

      if (docSnap.exists()) {
        const gameData = docSnap.data() as GameData;
        setRounds(gameData.rounds || 0);
        const data2DArray = Object.entries(gameData.players).map(
          ([player, data]) => [player, data] as [string, string[]]
        );
        setPlayersData(data2DArray);
      } else {
        console.log("No such game!");
      }
    };

    fetchGameData();
  }, [gameId]); // Only re-run the effect if gameId changes

  let n = rounds;
  let m = rounds * 2 - 1;

  const playersMap = new Map();
  const player_to_idx = new Map();

  for (let i = 0; i < n; i++) {
    playersMap.set(playersData[i][0], [playersData[i][1][0]]);
    player_to_idx.set(playersData[i][0], i);
  }

  playersMap.forEach((_, key) => {
    for (
      let j = 1, i = (player_to_idx.get(key) + 1) % n;
      j + 1 < m;
      j += 2, (i + 1) % n
    ) {
      playersMap.get(key)?.push(playersData[i][1][j]);
      playersMap.get(key)?.push(playersData[i][1][j + 1]);
    }
  });

  console.log("map: ", playersMap);

  return (
    <div className="min-h-screen bg-cover bg-garlic flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-screen-lg mx-auto">
        <h1 className="text-xl font-bold mb-4">The results are in!</h1>
        <h1 className="text-xl font-bold mb-4">
          Player: {localStorage.getItem("playerName")}
        </h1>

        <div>
          {Array.from(playersMap.entries()).map(([playerName, playerData]) => (
            <div key={playerName} className="mb-4">
              <strong className="font-bold">{playerName}</strong>
              <div className="border rounded p-2 mt-2">
                {playerData.map((dataItem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                  <span
                    key={index}
                    className="data-item mr-2 bg-gray-200 rounded p-1"
                  >
                    {dataItem}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevealPage;
