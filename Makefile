SCRIPT="static/script/"
STYLE="static/style/"

all:
	@echo Usage:
	@echo "   make get-deps"
	@echo "   make run"

get-deps:
	mkdir -p ${SCRIPT}
	cd ${SCRIPT} && wget -q -N http://code.jquery.com/jquery.min.js
	cd ${SCRIPT} && wget -q -N http://sockjs.github.com/sockjs-client/sockjs-latest.min.js
	cd ${SCRIPT} && wget -q -N http://sandbox.scriptiny.com/tinybox2/tinybox.js
	cd ${SCRIPT} && wget -q -N http://jscrollpane.kelvinluck.com/script/jquery.mousewheel.js
	cd ${SCRIPT} && wget -q -N http://jscrollpane.kelvinluck.com/script/jquery.jscrollpane.min.js
	cd ${STYLE} && wget -q -N http://jscrollpane.kelvinluck.com/style/jquery.jscrollpane.css
	npm install sockjs node-static

run:
	node server.js
