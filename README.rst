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
You can install all of them with ``make deps`` or take a look
at the Makefile it's trivial.
