const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let port = process.env.PORT || 5000;

dotenv.config();
const usersRoute = require("./app/routes/usersRoute");
const leaderboardRoute = require("./app/routes/leaderboardRoute");
const multiplayerRoute = require("./app/routes/multiplayerRoute");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use("/api/v1", usersRoute);
app.use("/api/v1", leaderboardRoute);
app.use("/api/v1", multiplayerRoute);

app.listen(port).on("listening", () => {
  console.log(`live from ${port}`);
});