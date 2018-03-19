var format = require("pg-format");
const { Pool } = require("pg");
const mail = require("./schema.sql");

const pool = new Pool({
  host: "thesis-project.coxryxwvinqh.us-east-1.rds.amazonaws.com",
  // connectionString: process.env.DATABASE_URL,
  port: 5432,
  user: "thesis",
  password: "thesis123",
  database: "mail"
});

pool.connect((err, client, done) => {
  if (err) {
    return console.error("connection error", err.stack);
  } else {
    client.query("SELECT * FROM campaigns WHERE id = $1", [1], (err, res) => {
      done();
      if (err) {
        console.log(err.stack);
      } else {
        console.log(res.rows);
      }
    });
  }
});

module.exports = {};
