import express from 'express'
import fs from 'fs'
import path from 'path'
import fileupload from 'express-fileupload'
import { storage_path } from './utils'

export const postroute = express.Router()

postroute.use(fileupload())

/*
 * FLAGS: d or f
 * d -> is directory
 * f -> is file
 */

postroute.post('/:path?/:flags', (req, res) => {
    console.log(`POST REQ => \npath: ${req.params.path}\nflags: ${req.params.flags}\n=====`)
    let urlpath

    if(req.params.path)
        urlpath = req.params.path.split('+').join('/')
    else
        urlpath = ''

    let fullpath = path.resolve(__dirname, storage_path + urlpath)

    if(req.params.flags === 'd') {

        if(!fs.existsSync(fullpath)) {
            fs.mkdirSync(fullpath, { recursive: true })
            res.status(200).end()
        } else {
            res.send("Folder already exists")
            res.status(201).end()
        }

    } else if(req.params.flags === 'f' && req.files) {

        let files = req.files.fileinput
        if(!Array.isArray(files)) {
            files = Array.of(files)
        }

        files.forEach(file => {
            console.log(file)
            file.mv(fullpath, (err) => {
                if(err)
                    console.log(err)
            })
        })

        res.status(200).end()

    } else {
        res.status(400).send("ERROR: Incorrect flag OR no files attached")
    }

})
