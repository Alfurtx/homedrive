"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getroute = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.getroute = express_1.default.Router();
const storage_path = 'public/storage/';
exports.getroute.get('/:path?', (req, res) => {
    if (req.params.path) {
        let urlpath = req.params.path.split('+');
        let fullpath = path_1.default.resolve(__dirname, '../../' + storage_path + urlpath.join('/'));
        fs_1.default.stat(fullpath, (err, stat) => {
            if (err) {
                console.log(err);
            }
            else {
                if (stat.isFile()) {
                    res.download(fullpath, (err) => {
                        if (err)
                            console.log(err);
                        else {
                            // TODO(fonsi): log downloaded files on server,
                            // or just do general logging
                        }
                    });
                }
                else if (stat.isDirectory()) {
                    fs_1.default.readdir(fullpath, (err, files) => {
                        if (err)
                            console.log(err);
                        else {
                            let filelist = [];
                            let folderlist = [];
                            files.forEach(file => {
                                let stat = fs_1.default.statSync(fullpath.concat('/' + file));
                                if (stat.isFile()) {
                                    filelist.push(file);
                                }
                                else {
                                    folderlist.push(file);
                                }
                            });
                            res.json({
                                files: filelist,
                                folders: folderlist
                            }).end();
                        }
                    });
                }
            }
        });
    }
    else {
        let fullpath = path_1.default.resolve(__dirname, '../../' + storage_path);
        fs_1.default.readdir(fullpath, (err, files) => {
            if (err)
                console.log(err);
            else {
                let filelist = [];
                let folderlist = [];
                files.forEach(file => {
                    let stat = fs_1.default.statSync(fullpath.concat('/' + file));
                    if (stat.isFile()) {
                        filelist.push(file);
                    }
                    else {
                        folderlist.push(file);
                    }
                });
                res.json({
                    files: filelist,
                    folders: folderlist
                }).end();
            }
        });
    }
});
