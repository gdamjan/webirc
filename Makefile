

all:
	@echo Usage:
	@echo "   make get-deps"
	@echo "   make run"

get-deps:
	mkdir -p static/script/
	wget http://code.jquery.com/jquery.min.js -O static/script/jquery.js
	wget http://sockjs.github.com/sockjs-client/sockjs-latest.min.js -O static/script/sockjs.js
	wget http://sandbox.scriptiny.com/tinybox2/tinybox.js -O static/script/tinybox.js
	npm install sockjs node_static

run:
	node server.js
