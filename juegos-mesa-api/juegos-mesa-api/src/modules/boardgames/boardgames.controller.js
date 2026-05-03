import boardgamesService from './boardgames.service.js';

const boardgamesController = {};

const validateRequiredFields = (data) => {
  const requiredFields = [
    'name',
    'minPlayers',
    'maxPlayers',
    'averageDuration',
    'acquisitionDate',
    'status'
  ];

  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      return `El campo ${field} es obligatorio.`;
    }
  }

  return null;
};

const validateBoardgameData = (data, partial = false) => {
  if (!partial) {
    const requiredError = validateRequiredFields(data);
    if (requiredError) return requiredError;
  }

  if (data.name !== undefined && String(data.name).trim().length < 2) {
    return 'El nombre debe tener al menos 2 caracteres.';
  }

  if (data.minPlayers !== undefined && (!Number.isInteger(Number(data.minPlayers)) || Number(data.minPlayers) < 1)) {
    return 'El mínimo de jugadores debe ser un número entero mayor o igual a 1.';
  }

  if (data.maxPlayers !== undefined && (!Number.isInteger(Number(data.maxPlayers)) || Number(data.maxPlayers) < 1)) {
    return 'El máximo de jugadores debe ser un número entero mayor o igual a 1.';
  }

  if (data.minPlayers !== undefined && data.maxPlayers !== undefined && Number(data.minPlayers) > Number(data.maxPlayers)) {
    return 'El mínimo de jugadores no puede ser mayor que el máximo de jugadores.';
  }

  if (data.averageDuration !== undefined && (!Number.isInteger(Number(data.averageDuration)) || Number(data.averageDuration) < 1)) {
    return 'La duración promedio debe ser un número entero mayor o igual a 1.';
  }

  if (data.acquisitionDate !== undefined && Number.isNaN(Date.parse(data.acquisitionDate))) {
    return 'La fecha de adquisición debe tener un formato válido. Ejemplo: 2026-05-02.';
  }

  if (data.status !== undefined && !boardgamesService.isValidStatus(data.status)) {
    return `Estado inválido. Estados permitidos: ${boardgamesService.getValidStatuses().join(', ')}.`;
  }

  return null;
};

boardgamesController.getBoardgames = (req, res) => {
  const { search } = req.query;

  if (search !== undefined) {
    const results = boardgamesService.searchBoardgames(search);
    return res.status(200).send({
      msg: 'Búsqueda realizada correctamente.',
      total: results.length,
      boardgames: results
    });
  }

  const boardgames = boardgamesService.getBoardgames();
  res.status(200).send({
    total: boardgames.length,
    boardgames
  });
};

boardgamesController.getBoardgame = (req, res) => {
  const { idBoardgame } = req.params;
  const boardgame = boardgamesService.getBoardgame(idBoardgame);

  if (!boardgame) {
    return res.status(404).send({
      msg: 'Juego de mesa no encontrado.'
    });
  }

  res.status(200).send({ boardgame });
};

boardgamesController.addBoardgame = (req, res) => {
  const error = validateBoardgameData(req.body);

  if (error) {
    return res.status(400).send({ msg: error });
  }

  const boardgame = boardgamesService.addBoardgame(req.body);

  res.status(201).send({
    msg: 'Juego de mesa creado exitosamente.',
    boardgame
  });
};

boardgamesController.updateBoardgame = (req, res) => {
  const { idBoardgame } = req.params;

  const currentBoardgame = boardgamesService.getBoardgame(idBoardgame);
  if (!currentBoardgame) {
    return res.status(404).send({
      msg: 'Juego de mesa no encontrado.'
    });
  }

  const mergedData = { ...currentBoardgame, ...req.body };
  const error = validateBoardgameData(mergedData);

  if (error) {
    return res.status(400).send({ msg: error });
  }

  const updatedBoardgame = boardgamesService.updateBoardgame(idBoardgame, req.body);

  res.status(200).send({
    msg: 'Juego de mesa actualizado exitosamente.',
    boardgame: updatedBoardgame
  });
};

boardgamesController.deleteBoardgame = (req, res) => {
  const { idBoardgame } = req.params;
  const deletedBoardgame = boardgamesService.deleteBoardgame(idBoardgame);

  if (!deletedBoardgame) {
    return res.status(404).send({
      msg: 'Juego de mesa no encontrado.'
    });
  }

  res.status(200).send({
    msg: 'Juego de mesa retirado del catálogo exitosamente.',
    boardgame: deletedBoardgame
  });
};

export default boardgamesController;
