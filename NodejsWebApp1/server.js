"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_rtsp_stream_1 = __importDefault(require("node-rtsp-stream"));
const port = 80;
var app = (0, express_1.default)();
app.use(express_1.default.static('www'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/templates");
app.get('/', (req, res) => {
    //res.contentType("text/plain");
    res.render("index.html", { title: "Stream" });
    //res.sendFile(__dirname + "/templates/index.html");
});
let rtspConvToWs = new node_rtsp_stream_1.default({
    name: 'name',
    streamUrl: 'rtsp://localhost:554/mystream',
    wsPort: 9999,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let server = app.listen(port, () => {
    let addressInfo = server.address();
    console.log("Nodejs server start listening at %s:%d", addressInfo.address, addressInfo.port);
});
console.log(__filename);
//# sourceMappingURL=server.js.map