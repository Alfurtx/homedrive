const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')

const project_path = '/home/fonsi/proyectos/homedrive/'

const postrouter = express.Router()
postrouter.use(fileupload())

postrouter.post('/:path?', (req, res) => {

  if(req.files) {
    console.log(req.files)
  } else {
    console.log("There are no files")
  }

  res.status(200).end()
})

module.exports = postrouter
