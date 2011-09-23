

all:
	@echo Usage:
	@echo "   make get-deps"
	@echo "   make run"

get-deps:
	mkdir -p static/lib/
	wget http://code.jquery.com/jquery.min.js -O static/lib/jquery.js
	wget http://sockjs.github.com/sockjs-client/sockjs-latest.min.js -O static/lib/sockjs.js
	npm install sockjs node_static

run:
	node server.js
