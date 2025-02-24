import "./App.css";
import "./Game.css";
import { GameProvider } from "./hooks/useGameStore";

import Home from "./pages/Home";

const App = () => {
  return (
    <GameProvider>
      <Home />
    </GameProvider>
  );
};

export default App;
