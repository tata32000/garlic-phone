// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import CreateGame from './Components/CreateGame';
import JoinGame from './Components/JoinGame';
import WaitingRoom from './Components/WaitingRoom';

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/join-game" element={<JoinGame />} />
          <Route path='/waiting-room/:gameId' element={<WaitingRoom />} />
       </Routes>
    </>
 );
};

export default App;