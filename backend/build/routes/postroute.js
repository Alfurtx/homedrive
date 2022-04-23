"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postroute = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const utils_1 = require("./utils");
exports.postroute = express_1.default.Router();
exports.postroute.use((0, express_fileupload_1.default)());
/*
 * FLAGS: d or f
 * d -> is directory
 * f -> is file
 */
exports.postroute.post('/:path?/:flags', (req, res) => {
    let urlpath;
    if (req.params.path)
        urlpath = req.params.path.split('+').join('/');
    else
        urlpath = '';
    let fullpath = path_1.default.resolve(__dirname, utils_1.storage_path + urlpath);
    if (req.params.flags === 'd') {
        if (!fs_1.default.existsSync(fullpath)) {
            fs_1.default.mkdirSync(fullpath, { recursive: true });
            res.status(200).end();
        }
        else {
            res.send("Folder already exists");
            res.status(201).end();
        }
    }
    else if (req.params.flags === 'f' && req.files) {
        let files = req.files.fileinput;
        if (!Array.isArray(files)) {
            files = Array.of(files);
        }
        files.forEach(file => {
            file.mv(fullpath.concat('/', file.name), (err) => {
                if (err)
                    console.log(err);
            });
        });
        res.status(200).end();
    }
    else {
        res.status(400).send("ERROR: Incorrect flag OR no files attached");
    }
});
