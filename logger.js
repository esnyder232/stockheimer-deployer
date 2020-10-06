const path = require('path');
const fs = require('fs');
const {config} = require('./config.js');
const moment = require('moment');

var isInitialized = false;
var logFileFullPath = "";
var logFileName = "";
var logFileDir = "";
//This creates a log file and logs stuff to it. It is intended to be a global singleton.
//The log file location is driven by config.js (config.dir_logs)
//
//Usage:
// const {Logger} = require('./logger.js);
// var log = new Logger();
// log.init();
// log.log('hello');
// --log should be created at config.dir_logs
//
class Logger {
	//initializes the logger.
	constructor() {
		if(!isInitialized)
		{
			//read where the log files should go
			logFileDir = config.dir_logs;

			//create logfile name
			this.dt = new moment();
			logFileName = "stockheimer_deploy_log__" + this.dt.format("YYYY-MM-DD_HH-mm-ss");

			//create full path
			logFileFullPath = path.join(logFileDir, logFileName + ".txt");

			//create log file
			console.log('Creating log file...');
			fs.writeFileSync(logFileFullPath, "");
			console.log('Done. Log created at: %s', logFileFullPath);

			//set isInitialized to true
			isInitialized = true;

			this.logFileDir = logFileDir;
			this.logFileFullPath = logFileFullPath;
			this.logFileName = logFileName;
		}
		return isInitialized;
	}

	log(msg) {
		//print to stdout and to the log file with a timestamp
		var timestamp = new Date().toISOString();
		var finalmsg = timestamp + " - " + msg + "\n";
		
		console.log(finalmsg);
		fs.appendFileSync(logFileFullPath, finalmsg);
	}

	//ew.... Oh well.
	isInitialized() {
		return isInitialized;
	}
};

exports.Logger = Logger;