const express = require('express')
const getrouter = express.Router()

getrouter.get('/:path?', (req, res) => {
  res.status(200).end()
})

module.export = getrouter
