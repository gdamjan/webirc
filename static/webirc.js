jQuery(function ($) {
   window.output = function() {
     var obj = $('#output');
     return function (m) {
        obj.append($("<code>").text(m));
        obj.append($("<br>"));
        obj.scrollTop(obj.scrollTop()+10000);
     }
   }();

   var sockjs = new SockJS("http://127.0.0.1:9999/sockjs");
   sockjs.onopen = function() {
      output(' [*] Connected (using: '+sockjs.protocol+')');
   };
   sockjs.onclose = function(e) {
      output(' [*] Disconnected ('+e.status + ' ' + e.reason+ ')');
   };
   sockjs.onmessage = function(e) {
      output(e.data);
   };

   $('#input').focus();
   $('#form').submit(function() {
      var val = $('#input').val();
      $('#input').val('');
      var l = ' [ ] sending: ' + JSON.stringify(val);
      if (sockjs.readyState !== SockJS.OPEN) {
         l += ' (error, connection not established)';
      } else {
         sockjs.send(val);
      }
      console.log(l);
      return false;
   });
});
