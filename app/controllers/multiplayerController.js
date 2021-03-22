const dbQuery = require("../db/dev/dbQuery");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { isEmpty } = require("../helpers/validation");

const createGame = async (req, res) => {
  const {
    game_code,
    player_one,
    player_two,
    questions_one,
    questions_two,
  } = req.body;

  if (isEmpty(game_code)) {
    errorMessage.error = "Error de Operacion";
    return res.status(status.bad).send(errorMessage);
  }

  const createGameQuery =
    "INSERT INTO multi_game (game_code, player_one, player_two, questions_one, questions_two) VALUES($1,$2, $3, $4, $5) RETURNING *";
  const values = [
    game_code,
    player_one,
    player_two,
    questions_one,
    questions_two,
  ];

  try {
    const { rows } = await dbQuery.query(createGameQuery, values);
    const dbResponse = rows[0];

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

const getGame = async (req, res) => {
  const { game_code } = req.params;

  const getGameQuery = "SELECT * FROM multi_game WHERE game_code=$1";

  try {
    const { rows } = await dbQuery.query(getGameQuery, [game_code]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = "No hay informacion del juego";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    errorMessage.data = req.body;
    return res.status(status.error).send(errorMessage);
  }
};

const updateGame = async (req, res) => {
  const {
    game_code,
    player_one,
    questions_one,
    player_two,
    questions_two,
  } = req.body;
  const findGameQuery = "SELECT * FROM multi_game WHERE game_code=$1";
  if (player_one) {
    const updateGameQuery =
      "UPDATE multi_game SET player_one=$1, questions_one=$2 WHERE game_code=$3 RETURNING*";

    try {
      const { rows } = await dbQuery.query(findGameQuery, [game_code]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = "No hay un juego con el Codigo indicado";
        return res.status(status.notfound).send(errorMessage);
      }

      const values = [player_one, questions_one, game_code];
      const response = await dbQuery.query(updateGameQuery, values);

      const dbResults = response.rows[0];
      successMessage.data = dbResults;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = "Hubo un error en la operacion";
      return res.status(status.error).send(errorMessage);
    }
  }

  if (player_two) {
    const updateGameQuery =
      "UPDATE multi_game SET player_two=$1, questions_two=$2 WHERE game_code=$3 RETURNING*";

    try {
      const { rows } = await dbQuery.query(findGameQuery, [game_code]);
      const dbResponse = rows[0];
      if (!dbResponse) {
        errorMessage.error = "No hay un juego con el Codigo indicado";
        return res.status(status.notfound).send(errorMessage);
      }

      const values = [player_two, questions_two, game_code];
      const response = await dbQuery.query(updateGameQuery, values);

      const dbResults = response.rows[0];
      successMessage.data = dbResults;
      return res.status(status.success).send(successMessage);
    } catch (error) {
      errorMessage.error = "Hubo un error en la operacion";
      return res.status(status.error).send(errorMessage);
    }
  }

  errorMessage.error = "Hubo un error en la operacion";
  return res.status(status.error).send(errorMessage);
};

const getGameByUser = async (req, res) => {
  const { username } = req.params;
  const gameByUserQuery =
    "SELECT * FROM multi_game WHERE player_one=$1 OR player_two=$1";

  try {
    const { rows } = await dbQuery.query(gameByUserQuery, [username]);
    const dbResponse = rows;

    if (!dbResponse[0]) {
      errorMessage.error = "No hay juegos disponibles";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = "Hubo un error en la operacion";
    return res.status(status.error).send(errorMessage);
  }
};

module.exports = { createGame, getGame, updateGame, getGameByUser };
