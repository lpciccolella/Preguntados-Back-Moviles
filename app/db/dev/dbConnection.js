const pool = require("./pool");

pool.on("connect", () => {
  console.log("Success on conecting to DB");
});

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (user_id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  username VARCHAR(100) UNIQUE NOT NULL,  
  password VARCHAR(100) NOT NULL)`;

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLeaderNormalTable = () => {
  const leaderNormalQuery = `CREATE TABLE IF NOT EXISTS leader_normal
  (leaderNormal_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL,  
  questions float NOT NULL)`;

  pool
    .query(leaderNormalQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createLeaderRushTable = () => {
  const leaderRushQuery = `CREATE TABLE IF NOT EXISTS leader_rush
  (leaderRush_id SERIAL PRIMARY KEY, 
  username VARCHAR(100) NOT NULL,  
  questions float NOT NULL)`;

  pool
    .query(leaderRushQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createMultiPlayerTable = () => {
  const multiPlayerQuery = `CREATE TABLE IF NOT EXISTS multi_game
  (game_id SERIAL PRIMARY KEY, 
  game_code VARCHAR(100) NOT NULL,
  player_one VARCHAR(100),  
  player_two VARCHAR(100),
  questions_one float,
  questions_two float)`;

  pool
    .query(multiPlayerQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const usersDropQuery = "DROP TABLE IF EXISTS users";

  pool
    .query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLeaderNormalTable = () => {
  const LeaderNormalQuery = "DROP TABLE IF EXISTS leader_normal";
  pool
    .query(LeaderNormalQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropLeaderRushTable = () => {
  const LeaderRushQuery = "DROP TABLE IF EXISTS leader_rush";
  pool
    .query(LeaderRushQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropMultiPlayerTable = () => {
  const multiPlayerQuery = "DROP TABLE IF EXISTS multi_game";
  pool
    .query(multiPlayerQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createUserTable();
  createLeaderNormalTable();
  createLeaderRushTable();
  createMultiPlayerTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropLeaderNormalTable();
  dropLeaderRushTable();
  dropMultiPlayerTable();
};
pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = { createAllTables, dropAllTables };

const makeRunnable = require("make-runnable");
makeRunnable;
