const boardgamesService = {};

const VALID_STATUSES = [
  'En perfectas condiciones',
  'Ligeramente usado',
  'Deteriorado',
  'Dañado'
];

let boardgames = [];
let counterID = 1;

boardgamesService.getValidStatuses = () => VALID_STATUSES;

boardgamesService.getBoardgames = () => boardgames;

boardgamesService.getBoardgame = (id) => {
  return boardgames.find((game) => game.id === Number(id)) || null;
};

boardgamesService.searchBoardgames = (query) => {
  const text = String(query || '').toLowerCase().trim();

  if (!text) return boardgames;

  return boardgames.filter((game) => {
    return (
      game.name.toLowerCase().includes(text) ||
      game.status.toLowerCase().includes(text) ||
      String(game.id).includes(text)
    );
  });
};

boardgamesService.addBoardgame = (data) => {
  const newBoardgame = {
    id: counterID,
    name: data.name,
    minPlayers: Number(data.minPlayers),
    maxPlayers: Number(data.maxPlayers),
    averageDuration: Number(data.averageDuration),
    acquisitionDate: data.acquisitionDate,
    status: data.status
  };

  counterID++;
  boardgames.push(newBoardgame);
  return newBoardgame;
};

boardgamesService.updateBoardgame = (id, data) => {
  const game = boardgamesService.getBoardgame(id);
  if (!game) return null;

  if (data.name !== undefined) game.name = data.name;
  if (data.minPlayers !== undefined) game.minPlayers = Number(data.minPlayers);
  if (data.maxPlayers !== undefined) game.maxPlayers = Number(data.maxPlayers);
  if (data.averageDuration !== undefined) game.averageDuration = Number(data.averageDuration);
  if (data.acquisitionDate !== undefined) game.acquisitionDate = data.acquisitionDate;
  if (data.status !== undefined) game.status = data.status;

  return game;
};

boardgamesService.deleteBoardgame = (id) => {
  const index = boardgames.findIndex((game) => game.id === Number(id));
  if (index === -1) return null;

  const deletedGame = boardgames[index];
  boardgames.splice(index, 1);
  return deletedGame;
};

boardgamesService.isValidStatus = (status) => {
  return VALID_STATUSES.includes(status);
};

export default boardgamesService;
