import express from 'express'
import fs from 'fs'
import path from 'path'

export const getroute = express.Router()

const storage_path = '../../public/storage/'

getroute.get('/:path?', (req, res) => {
    if(req.params.path) {

        let urlpath = req.params.path.split('+')
        let fullpath = path.resolve(__dirname, storage_path + urlpath.join('/'))

        fs.stat(fullpath, (err, stat) => {
            if(err) {
                console.log(err)
            } else {
                if(stat.isFile()) {
                    res.download(fullpath, (err) => {
                        if(err)
                            console.log(err)
                        else {
                            // TODO(fonsi): log downloaded files on server,
                            // or just do general logging
                        }
                    })
                }
                else if(stat.isDirectory()) {
                    fs.readdir(fullpath, (err, files) => {
                        if(err)
                            console.log(err)
                        else {
                            let filelist: string[] = []
                            let folderlist: string[] = []
                            files.forEach(file => {
                                let stat = fs.statSync(fullpath.concat('/' + file))
                                if(stat.isFile()) {
                                    filelist.push(file)
                                }
                                else {
                                    folderlist.push(file)
                                }
                            })

                            res.json({
                                files: filelist,
                                folders: folderlist
                            }).end()
                        }
                    })
                }
            }
        })


    } else {
        let fullpath = path.resolve(__dirname, '../../' + storage_path)
        fs.readdir(fullpath, (err, files) => {
            if(err)
                console.log(err)
            else {
                let filelist: string[] = []
                let folderlist: string[] = []
                files.forEach(file => {
                    let stat = fs.statSync(fullpath.concat('/' + file))
                    if(stat.isFile()) {
                        filelist.push(file)
                    }
                    else {
                        folderlist.push(file)
                    }
                })

                res.json({
                    files: filelist,
                    folders: folderlist
                }).end()
            }
        })
    }
})
