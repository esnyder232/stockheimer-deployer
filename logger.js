const path = require('path');
const fs = require('fs');
const {config} = require('./config.js');

//This creates a log file and logs stuff to it.
//The log file location is driven by config.js (config.dir_logs)
//The deploy version in the constructor is the deploy version made in index.js.
//
//Usage:
// const {Logger} = require('./logger.js);
// var log = new Logger(version);
// log.log('hello');
// --log should be created at config.dir_logs
//
class Logger {
	//initializes the logger.
	constructor(version) {
		
		//read where the log files should go
		this.logFileDir = config.dir_logs;

		//create logfile name
		this.logFileName = "stockheimer_deploy_log__" + version;

		//create full path
		this.logFileFullPath = path.join(this.logFileDir, this.logFileName + ".txt");

		//create log file
		console.log('Creating log file...');
		fs.writeFileSync(this.logFileFullPath, "");
		console.log('Done. Log created at: %s', this.logFileFullPath);
	}

	log(msg) {
		//print to stdout and to the log file with a timestamp
		var timestamp = new Date().toISOString();
		var finalmsg = timestamp + " - " + msg + "\n";
		
		console.log(finalmsg);

		fs.appendFileSync(this.logFileFullPath, finalmsg);
	}
};

exports.Logger = Logger;