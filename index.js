const express = require('express')
const app = express()
const port = 3000
const postrouter = require('./routes/postrouter')
const getrouter = require('./routes/getrouter');

app.use('/post', postrouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
