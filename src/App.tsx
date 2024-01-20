// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import CreateGame from './Components/CreateGame';
import JoinGame from './Components/JoinGame';
import WaitingRoom from './Components/WaitingRoom';
import WritePage from './Components/WritePage.tsx'; 
import ReadPage from './Components/ReadPage.tsx'; 
import RevealPage from './Components/RevealPage.tsx'; 
import PlayerWaiting from './Components/PlayerWaiting.tsx';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/join-game/" element={<JoinGame />} />
          <Route path="/join-game/:gameId" element={<JoinGame />} />
          <Route path='/waiting-room/:gameId' element={<WaitingRoom />} />
          <Route path='/game-room/:gameId' element={<WritePage />} />
          <Route path='/game-room-read/:gameId' element={<ReadPage />} /> 
          <Route path='/game-reveal/:gameId' element={<RevealPage />} /> 
          <Route path='/game-room-wait/:gameId' element={<PlayerWaiting />} />
       </Routes>
    </>
 );
};

export default App;
