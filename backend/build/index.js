"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const getroute_1 = require("./routes/getroute");
const postroute_1 = require("./routes/postroute");
const delroute_1 = require("./routes/delroute");
const gotoparentroute_1 = require("./routes/gotoparentroute");
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/parent', gotoparentroute_1.gotoparentroute);
app.use('/get', getroute_1.getroute);
app.use('/post', postroute_1.postroute);
app.use('/del', delroute_1.delroute);
app.listen(port, () => {
    console.log(`[homedrive] listening to port ${port}`);
});
