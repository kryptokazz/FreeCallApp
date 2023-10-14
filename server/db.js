const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "S1lSun+",
    host: "localhost",
    port: 5432,
    database: "freecalldb"
});

module.exports =pool;

