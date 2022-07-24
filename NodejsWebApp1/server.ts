import http = require('http');
import express from "express";
import fs = require("fs");
import ws from "ws";
import Stream from "node-rtsp-stream";
import { AddressInfo } from 'net';
const port = 80;
const _streamUrl = 'rtsp://34.127.2.194:554';
var app = express();
app.use(express.static('www'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/templates");

app.get('/', (req, res) => {
    //res.contentType("text/plain");
    res.render("index.html", { title: "Stream", streamHost: "34.143.192.209" });
    //res.sendFile(__dirname + "/templates/index.html");
})
app.get('/cam/:id', (req, res) => {
    //res.contentType("text/plain");
    let camId = req.params.id;
    res.render("cam" + camId + ".html", { title: "Stream", streamHost: "34.143.192.209" });
    //res.sendFile(__dirname + "/templates/index.html");
})

let rtspConvToWs1 = new Stream({
    name: 'cam1',
    streamUrl: _streamUrl + '/cam1',
    wsPort: 555,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs2 = new Stream({
    name: 'cam2',
    streamUrl: _streamUrl + '/cam2',
    wsPort: 559,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs3 = new Stream({
    name: 'cam3',
    streamUrl: _streamUrl + '/cam3',
    wsPort: 557,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});
let rtspConvToWs4 = new Stream({
    name: 'cam4',
    streamUrl: _streamUrl + '/cam4',
    wsPort: 558,
    ffmpegOptions: { // options ffmpeg flags
        '-stats': '', // an option with no neccessary value uses a blank string
        '-r': 30 // options with required values specify the value after the key
    }
});

let server = app.listen(port, () => {
    let addressInfo = server.address() as AddressInfo;
    console.log("Nodejs server start listening at %s:%d", addressInfo.address, addressInfo.port)
})

console.log(__filename);