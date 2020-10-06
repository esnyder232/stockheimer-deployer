const {Logger} = require('./logger.js');

function script1() {
	var log = new Logger();

	console.log(log.isInitialized());
	log.log('hello from script1');
}

exports.script1 = script1;