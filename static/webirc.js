jQuery(function ($) {
   // first show a login form
   TINY.box.show({url:'login.html', close:false, boxid:'tinybox', openjs: function() {
      $("#login_form").submit(function() {
         var username = $("#username").val();
         var password = $("#password").val();
         $("#tinybox").html("<div style='text-align: center'><img src='images/preload.gif'></div>");
         connect(username, password);
         return false;
      })
   }})

   var view = $('#output');
   var w = $(window);
   function output (m) {
      view.append('<div>' + m + '</div>');
      w.scrollTop(w.scrollTop()+10000);
   }


   function connect (username, password) {
      var sockjs = new SockJS('/sockjs');
      function send (data) {
         sockjs.send(data + "\r\n");
      }
      sockjs.onopen = function() {
         TINY.box.hide();
         $('#input_line').focus();
         output(' [*] Connected (using: '+sockjs.protocol+')');
         // FIXME this delay of 100ms is a hack around stupid behaviour in sockjs-node,
         // will see.
         setTimeout(function() {
            send("PASS " + username + ":" + password);
            send("NICK unimportant");
            send("USER unimportant");
         }, 100);
      };
      sockjs.onclose = function(e) {
         output(' [*] Disconnected ('+e.status + ' ' + e.reason+ ')');
      };
      sockjs.onmessage = function(msg) {
         output(msg.data.trim());
      };

      $('#input_form').submit(function() {
         var val = $('#input_line').val();
         $('#input_line').val('');
         var l = ' [ ] sending: ' + JSON.stringify(val);
         if (sockjs.readyState !== SockJS.OPEN) {
            l += ' (error, connection not established)';
         } else {
            send(val);
         }
         console.log(l);
         return false;
      });
      return sockjs;
   }
})
