export const generateBombs = ({ B, W, H }) => {
  const bombSet = new Set();
  while (bombSet.size < B) {
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    bombSet.add(`${x},${y}`);
  }
  return Array.from(bombSet).map((pos) => {
    const [x, y] = pos.split(",").map(Number);
    return { x, y };
  });
};

export const fillGrid = ({ bombs, W, H }) => {
  const grid = new Map();
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const isBomb = bombs.some((bomb) => bomb.x === x && bomb.y === y);
      let bombCount = 0;
      if (!isBomb) {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            if (bombs.some((bomb) => bomb.x === x + dx && bomb.y === y + dy)) {
              bombCount++;
            }
          }
        }
      }
      grid.set(`${x},${y}`, {
        x,
        y,
        val: isBomb ? "B" : bombCount || "",
        isShow: false,
      });
    }
  }
  return grid;
};

export const resetGrid = (prevGrid) => {
  const resetGrid = new Map(prevGrid);
  resetGrid.forEach((cell) => (cell.isShow = false));
  return resetGrid;
};
