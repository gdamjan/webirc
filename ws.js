// node.js builtins
var http = require('http');
var path = require('path');
var net  = require('net');

// 3rd party - npm install them
var WebSocketServer = require('ws').Server;
var node_static = require('node-static');

// vars
var target_host = 'chat.freenode.net';
var target_port = 6667;
var ws_port = 8000;
var http_port = process.env['OPENSHIFT_DIY_PORT'] || 9999;


// create ws server and setup bidirectional proxying
wss = new WebSocketServer({port: ws_port});
wss.on('connection', function(ws) {
   var target = net.connect(target_port, target_host);
   target.setEncoding('utf8');

   target.on('data', function (data) {
      ws.send(data);
   });
   target.on('close', function () {
      console.log('[target closed]');
      ws.close();
   });
   ws.on('close', function () {
      console.log('[websocket closed]');
      target.end();
   });

   target.on('connect', function () {
      console.log('[both sides connected]');
      ws.on('message', function(message) {
         target.write(message);
      });
   });
});

// static files from ./static
var static_handler = new node_static.Server(path.join(__dirname, 'static'));
var server = http.createServer(function(req, res) {
    static_handler.serve(req, res);
});

// run!
server.listen(http_port, function() { });
