const express = require("express");

const {
  createGame,
  getGame,
  updateGame,
  getGameByUser,
} = require("../controllers/multiplayerController");

const router = express.Router();

router.post("/multiplayer/addGame", createGame);
router.get("/multiplayer/getGame/:game_code", getGame);
router.get("/multiplayer/getGameByUser/:username", getGameByUser);
router.put("/multiplayer/updateGame", updateGame);

module.exports = router;