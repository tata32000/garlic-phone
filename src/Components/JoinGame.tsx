import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const JoinGame = () => {
    const [userName, setUserName] = useState('');
    const gameIdReg = /:(\d+)/;

    const url = window.location.href; 

    const urlGameId = url.slice(url.indexOf('join-game')).match(gameIdReg);
    const [gameId, setGameId] = useState(urlGameId ? urlGameId[1] : '');


    const navigate = useNavigate();

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        if (gameId === "") {
            alert("Please enter a valid game ID"); 
        }
        navigate(`/waiting-room/${gameId}`);
    };

    // Redirects to home 
    const redirectHome = (event: { preventDefault: () => void; }) => {
        event.preventDefault(); 
        navigate('/home/');
    };


    return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-4">Join Game</h1>
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
            <div className="mb-6">
            <label
            htmlFor="gameId"
            className="block text-gray-700 text-sm font-bold mb-2"
            >
            Game ID
            </label>
            <input
            id="gameId"
            type="text"
            value={gameId}
    onChange={(e) => setGameId(e.target.value)}
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        </div>
        <button 
        onClick={redirectHome}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
        <a href="/" className="no-underline text-white">
        Home
        </a>
        </button>
        <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
        Join Game
        </button>
        </form>
        </div>
        </div>
        );
}

export default JoinGame;
