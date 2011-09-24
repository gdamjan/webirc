var path = require('path');
var http = require('http');
var tls = require('tls');

// 3rd party
var sockjs = require('sockjs');
var node_static = require('node-static');

var sockjs_opts = {sockjs_url: "sockjs.js"};

var sockjs_server = new sockjs.Server(sockjs_opts);

/*
 * Once the SockJS connection is established, connect to the irc server and
 * funnel data back and forward. The web browser will have to handle all of the
 * irc communication including authorization to the znc server.
 *
 * When one of the sockets is closed also close the other socket.
 */
sockjs_server.on('open', function(web_sock) {
   // hardcoded host & port… this is my znc irc bouncer
   // you should customize this to your own liking
   var irc_sock = tls.connect(6666, "damjan.softver.org.mk", function () {
      irc_sock.setEncoding('utf-8');
      web_sock.on('message', function(msg) {
         console.log(msg.data);
         irc_sock.write(msg.data);
      });
      irc_sock.on('data', function(data) {
         console.log(data);
         web_sock.send(data);
      });
      // handle close & errors
      web_sock.on('close', function(e) {
         console.log('close ' + web_sock, e);
         irc_sock.destroySoon();
      });
      irc_sock.on('close', function(e) {
         console.log('irc connection closed');
         web_sock.close();
      });
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
