const express = require('express')
const app = express()

console.log("I'm on a node server");

app.get('/', function (req, res) {
  //outdated way
  //res.send('Hello Node From Express on local devbox :))))')
  res.sendFile(__dirname + '/index.html')
})

app.listen(5000)