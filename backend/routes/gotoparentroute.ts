import express from 'express'
import path from 'path'
import { storage_path } from './utils'

export const gotoparentroute = express.Router()

gotoparentroute.get('/:path?', (req, res) => {
    if(req.params.path) {

        let respath = req.params.path.split('+')
        let machinepath = path.resolve(__dirname, storage_path + respath.join('/') + '/..')
        let reactpath = machinepath.replace(path.resolve(__dirname, storage_path), '')

        console.log(`FOLDER STRUCTURE: ${reactpath.split('/').join('+').slice(1)}`)
        res.send(reactpath.split('/').join('+').slice(1)).end()

    } else {
                res.send("").end()
    }
})
