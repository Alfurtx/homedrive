"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delroute = void 0;
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
exports.delroute = express_1.default.Router();
exports.delroute.delete('/:path?', (req, res) => {
    let fullpath;
    if (req.params.path) {
        fullpath = path_1.default.resolve(__dirname, utils_1.storage_path + req.params.path.split('+').join('/'));
    }
    else {
        fullpath = path_1.default.resolve(__dirname, utils_1.storage_path);
    }
    fs_1.default.stat(fullpath, (err, stat) => {
        if (err) {
            console.log(err);
            res.status(400).send("No such file or directory exists");
        }
        else {
            fs_1.default.rm(fullpath, { recursive: true, force: true }, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File/folder removed");
                }
            });
        }
    });
});
