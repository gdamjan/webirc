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
   var status = output; // for now it's the same

   function process (msg) {
      output(msg.data.trim());
   }

   function connect (username, password) {
      var sockjs = new SockJS('/sockjs');

      function send (data) {
         var l = ' [ ] sending: ' + JSON.stringify(data);
         if (sockjs.readyState !== SockJS.OPEN) {
            l += ' (error, connection not established)';
         } else {
            sockjs.send(data + "\r\n");
         }
         console.log(l);
      }

      sockjs.onopen = function() {
         status(' [*] Connected (using: '+sockjs.protocol+')');
      };

      sockjs.onmessage = function(msg) {
         if (msg.data.connected === true) {
            send("PASS " + username + ":" + password);
            send("NICK unimportant");
            send("USER unimportant");
            sockjs.onmessage = function(msg) {
               process(msg);
            };
            TINY.box.hide();
            $('#input_line').focus();
         } else {
            console.log(msg);
         }
      }

      sockjs.onclose = function(e) {
         status(' [*] Disconnected ('+e.status + ' ' + e.reason+ ')');
      };


      $('#input_form').submit(function() {
         var val = $('#input_line').val();
         $('#input_line').val('');
         send(val);
         return false;
      });

      return sockjs;
   }
})
