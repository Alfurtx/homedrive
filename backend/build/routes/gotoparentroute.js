"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gotoparentroute = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
exports.gotoparentroute = express_1.default.Router();
exports.gotoparentroute.get('/:path?', (req, res) => {
    if (req.params.path) {
        let respath = req.params.path.split('+');
        let machinepath = path_1.default.resolve(__dirname, utils_1.storage_path + respath.join('/') + '/..');
        let reactpath = machinepath.replace(path_1.default.resolve(__dirname, utils_1.storage_path), '');
        console.log(`FOLDER STRUCTURE: ${reactpath.split('/').join('+').slice(1)}`);
        res.send(reactpath.split('/').join('+').slice(1)).end();
    }
    else {
        res.send("").end();
    }
});
