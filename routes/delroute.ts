import express from 'express'
import fs from 'fs'
import path from 'path'

export const delroute = express.Router()

const storage_path = '../../public/storage/'

delroute.delete('/:path?', (req, res) => {
    let fullpath: string;

    if(req.params.path) {
        fullpath = path.resolve(__dirname, storage_path + req.params.path.split('+').join('/'))
    } else {
        fullpath = path.resolve(__dirname, storage_path)
    }

    fs.stat(fullpath, (err, stat) => {
        if(err) {
            console.log(err)
            res.status(400).send("No such file or directory exists")
        }
        else {
            fs.rm(fullpath, { recursive: true, force: true }, (err) => {
                if(err)
                    console.log(err)
                else {
                    console.log("File/folder removed")
                }
            })
        }
    })
})
