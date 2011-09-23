var path = require('path');
var http = require('http');

// 3rd party
var sockjs = require('sockjs');
var node_static = require('node-static');

var sockjs_opts = {sockjs_url: "sockjs.js"};

var sockjs_server = new sockjs.Server(sockjs_opts);
sockjs_server.on('open', function(conn) {
   conn.on('message', function(e) {
      conn.send(e.data);
   });
});

var static_directory = new node_static.Server(path.join(__dirname, 'static'));

var http_server = http.createServer();
http_server.addListener('request', function(req, res) {
   static_directory.serve(req, res);
});
http_server.addListener('upgrade', function(req,res){
   res.end();
});

sockjs_server.installHandlers(http_server, {prefix:'[/]sockjs'});

console.log(' [*] Listening on http://0.0.0.0:9999' );
http_server.listen(9999, '0.0.0.0');
