const express = require('express');
const app = express();
const port = 3003;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
  res.sendFile('index.html', { root: __dirname });
  next();
})

app.get('/', (req, res) => {
  console.log('next get');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})