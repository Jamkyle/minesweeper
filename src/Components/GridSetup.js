import { useCallback } from "react";
import { useGame } from "../hooks/useGameStore";
import { isAValidGrid } from "../Modules/gridUtils";

export default function GridSetup() {
  const { setGameStatus, setGameConfig, gameConfig } = useGame();

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setGameConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
    },
    [gameConfig]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAValidGrid(gameConfig)) {
      alert("la configuration de votre gille n'est pas valide");
      return;
    }
    setGameStatus("inGame");
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center justify-around">
      <input
        type="text"
        name="width"
        min={5}
        max={30}
        placeholder="width"
        defaultValue={gameConfig.width}
        onChange={handleChange}
      />
      <input
        type="text"
        name="height"
        min={5}
        max={30}
        placeholder="height"
        defaultValue={gameConfig.height}
        onChange={handleChange}
      />
      <input
        type="text"
        name="bombs"
        max={gameConfig.height * gameConfig.width - 1}
        min={1}
        placeholder="bombes"
        onChange={handleChange}
      />
      <button
        className="button flat text-white"
        type="submit"
        style={{ cursor: "pointer" }}
      >
        Let's play
      </button>
    </form>
  );
}
