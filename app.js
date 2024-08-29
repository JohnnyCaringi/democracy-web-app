const express = require('express')
const app = express()

app.set('view engine', 'ejs')
console.log("I'm on a node server")

app.use(express.static('./public/'))

app.get('/', function (req, res) {
  //outdated way
  //res.send('Hello Node From Express on local devbox :))))')
  res.sendFile(__dirname + '/index.html')
  res.sendFile(__dirname + '/styles/style.css')
  res.sendFile(__dirname + '/scripts/script.js')
})

app.get('/ejs', (req, res)=>{
    res.render("index", {
      myServerVariable: "Something from server"
    })
})

app.listen(5000)