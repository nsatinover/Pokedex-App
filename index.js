const express = require('express');
const path = require('path');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
//const pokemonJS = require('./static/js/pokemon');
const app = express();
const port = 3004;

app.use(express.static(__dirname + '/public'));
app.use("/static", express.static('./static/'));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log(ConnectToMySQL(query_GetAll));
})

app.get('/body', async (req, res) => {
  res.send(ConnectToMySQL(query_GetAll));
})

app.post('/save', (req, res) => {
  let pokeCardArray = [];
  pokeCardArray = req.body.main;
  console.log(pokeCardArray);
  res.render(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


function ConnectToMySQL(query) {

  let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cddvdmp12!',
    database: 'pokedex'
  });

  db.connect(function (err) {
      if (err) {
          return console.error('error: ' + err.message);
      }
      console.log('Connected to the MySQL server.');

      db.query(query, function (err, result, fields) {
          if (err) {
              throw err;
          }
          console.log(result);
          
      });
      EndConnection(db);
  });
  
}

function EndConnection(connection) {
  connection.end(function (err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Closed the database connection.');
  });
}

let query_GetAll = 
`
SELECT p.pokemon_id, p.name, tp.type
FROM pokemon p 
LEFT JOIN pokemon_type pt
ON p.pokemon_id = pt.pokemon_id
LEFT JOIN types tp
ON tp.type_id = pt.type_id
`;