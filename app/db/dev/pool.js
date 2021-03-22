const pg = require("pg")
const dotenv = require("dotenv");
const { Pool } = pg;
const url = require ("url");
dotenv.config();

const params = url.parse(process.env.DB_URL) || 
'postgres://postgres:1234@localhost:5432/preguntados';
const auth = params.auth.split(":");

const pool = new Pool({
    username: auth[0] || postgres,
    password: auth[1] || 1234,
    host: params.hostname || localhost,
    port: params.port || 5432,
    database: params.pathname.split("/")[1] || preguntados
})

module.exports = pool;