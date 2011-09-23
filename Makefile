

all:
	@echo Usage:
	@echo "   make deps"
	@echo "   make run"

deps:
	wget http://code.jquery.com/jquery.min.js -O static/jquery.js
	wget http://sockjs.github.com/sockjs-client/sockjs-latest.min.js -O static/sockjs.js
	npm install sockjs node_static

run:
	node server.js
