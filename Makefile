SCRIPT="static/script/"

all:
	@echo Usage:
	@echo "   make get-deps"
	@echo "   make run"

get-deps:
	mkdir -p ${SCRIPT}
	cd ${SCRIPT} && wget -q -N http://code.jquery.com/jquery.min.js
	cd ${SCRIPT} && wget -q -N http://sockjs.github.com/sockjs-client/sockjs-latest.min.js
	cd ${SCRIPT} && wget -q -N http://sandbox.scriptiny.com/tinybox2/tinybox.js
	npm install sockjs node-static

run:
	node server.js
