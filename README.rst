==================
Web client for IRC
==================

This will be a quick&dirty web interface for IRC. I plan to run it for
myself only, connecting to my znc bouncer. So no multi user functionality.

Also most things will be hard locked, and I don't plan to provide too much
configuration options.

The nodejs server acts only as a funnel (a pipe) between the IRC TCP(ssl)
socket and the websocket as implemented by SockJS. IRC protocol will be
implemented in the clients browser.


Getting started
---------------

Dependencies are sockjs-node, node_static, jquery and sockjs.
You can install all of them with ``make get-deps`` or take a look
at the Makefile it's trivial.

Next, change the server and port in ``login.html`` to your own irc bouncer
(or even a real irc server). Choose a SSL port, since for now that's only one
supported (the secure field in login.html doesn't do anything).

At last, ``make run`` will run the server (i.e. ``node server.js``).


TODO
----

Investigate how to pack it all together in chromeless (or similar). Maybe even change
SockJS with a native socket.

Modal popup window:
http://sandbox.scriptiny.com/tinybox2/
http://www.scriptiny.com/2011/03/javascript-modal-windows/

Automatic custom scrollbar:
http://naeka.github.com/jquery-scrollbar/

Maybe use this for a tabbar on top
http://robertnyman.com/2010/02/24/css-display-inline-block-why-it-rocks-and-why-it-sucks/


Licensing
---------

Copyright (C) 2011 Damjan Georgievski <gdamjan@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
