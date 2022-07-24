"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_rtsp_stream_1 = __importDefault(require("node-rtsp-stream"));
const port = 80;
const _streamUrl = 'rtsp://34.127.2.194:554';
var app = (0, express_1.default)();
app.use(express_1.default.static('www'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/templates");
app.get('/', (req, res) => {
    //res.contentType("text/plain");
    res.render("index.html", { title: "Stream", streamHost: "34.143.192.209" /* "localhost"  "34.143.192.209" */ });
    //res.sendFile(__dirname + "/templates/index.html");
});
app.get('/cam/:id', (req, res) => {
    //res.contentType("text/plain");
    let camId = req.params.id;
    res.render("cam" + camId + ".html", { title: "Stream", streamHost: "34.143.192.209" });
    //res.sendFile(__dirname + "/templates/index.html");
});
let rtspConvToWs1 = new node_rtsp_stream_1.default({
    name: 'cam1',
    streamUrl: _streamUrl + '/cam1',
    wsPort: 81,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs2 = new node_rtsp_stream_1.default({
    name: 'cam2',
    streamUrl: _streamUrl + '/cam2',
    wsPort: 82,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs3 = new node_rtsp_stream_1.default({
    name: 'cam3',
    streamUrl: _streamUrl + '/cam3',
    wsPort: 85,
    ffmpegOptions: {
        '-stats': '',
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs4 = new node_rtsp_stream_1.default({
    name: 'cam4',
    streamUrl: _streamUrl + '/cam4',
    wsPort: 84,
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