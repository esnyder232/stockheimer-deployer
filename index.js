const process = require('child_process');
const {config} = require('./config.js');
const {Logger} = require('./logger.js');

try {
	//create log
	var log = new Logger();

	log.log("=== stockheimer-deployer start ===");

	copyStagingToDeploy();	
	runNpmInstall();
	modifyClientFiles();
	createBundles();
	createHashNumber();
	renameBundlesWithHash();
	modifyIndexHtml();
}
catch(ex) {
	log.log(ex.stack);
}
finally {
	log.log("=== stockheimer-deployer done ===");
}



function copyStagingToDeploy() {
	log.log('--- copyStagingToDeploy started ---');

	log.log('--- copyStagingToDeploy done ---');
}

function runNpmInstall() {
	log.log('--- runNpmInstall started ---');

	var npmout = process.execSync('npm install',
	{
		cwd: config.dir_deploy
	});

	log.log('npm stdout: ' + npmout);
	log.log('--- runNpmInstall done ---');
}

function modifyClientFiles() {
	log.log('--- modifyClientFiles started ---');

	log.log('--- modifyClientFiles done ---');
}

function createBundles() {
	log.log('--- createBundles started ---');

	log.log('--- createBundles done ---');
}

function createHashNumber() {
	log.log('--- createHashNumber started ---');

	log.log('--- createHashNumber done ---');
}

function renameBundlesWithHash() {
	log.log('--- renameBundlesWithHash started ---');

	log.log('--- renameBundlesWithHash done ---');
}

function modifyIndexHtml() {
	log.log('--- modifyIndexHtml started ---');

	log.log('--- modifyIndexHtml done ---');
}

