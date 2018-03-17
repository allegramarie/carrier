var format = require('pg-format');
const { Pool } = require('pg')

const pool = new Pool({
	host: 'localhost' || process.env.DATABASE_URL,
	// connectionString: process.env.DATABASE_URL,
  user: '',
  password: '',
  database: 'newsletterDB'
})

pool.connect((err, client, done) => {
		  if (err) {
		    return console.error('connection error', err.stack)
		  } else {
		    client.query('SELECT * FROM campaigns WHERE id = $1', [1], (err, res) => {
			    done()
			    if (err) {
			      console.log(err.stack)
			    } else {
			      console.log(res.rows)
			    }
			  })
		  }
		})

module.exports = {};