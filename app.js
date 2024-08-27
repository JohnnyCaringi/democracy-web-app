const express = require('express')
const app = express()

console.log("I'm on a node server");

app.get('/', function (req, res) {
  res.send('Hello Node From Express on local devbox :))))')
  //res.sendFile('index.html')
})

app.listen(5000)