import http = require('http');
import express from "express";
import fs = require("fs");
import ws from "ws";
import Stream from "node-rtsp-stream";
import { AddressInfo } from 'net';
const port = 80
var app = express();
app.use(express.static('www'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + "/templates");

app.get('/', (req, res) => {
    //res.contentType("text/plain");
    res.render("index.html", { title: "Stream" });
    //res.sendFile(__dirname + "/templates/index.html");
})

let rtspConvToWs = new Stream({
    name: 'name',
    streamUrl: 'rtsp://localhost:554/mystream',
    wsPort: 9999,
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