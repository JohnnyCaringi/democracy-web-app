const express = require('express')
const app = express()

console.log("I'm on a node server");

// TODO add public folder
app.use(express.static('./public/'))
app.get('/', function (req, res) {
  //outdated way
  //res.send('Hello Node From Express on local devbox :))))')
  res.sendFile(__dirname + '/index.html')
  res.sendFile(__dirname + '/styles/style.css')
  res.sendFile(__dirname + '/scripts/script.js')
})

app.listen(5000)