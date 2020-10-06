const process = require('child_process');
const path = require('path');
const fs = require('fs');
const moment = require('moment');
const {config} = require('./config.js');
const {Logger} = require('./logger.js');

//create deploy version
this.dt = new moment();
var version = this.dt.format("YYYY-MM-DD_HH-mm-ss");

//create log
var log = new Logger(version);

function deployStockheimer(){
	try {
		log.log("=== stockheimer-deployer start ===");
		log.log("Deploy version is: " + version);
		copyStagingToDeploy();
		runNpmInstall();
		overriteConfigValues();
		createBundles();
		// renameBundlesWithVersion();
		// modifyIndexHtml();
	
	}
	catch(ex) {
		log.log(ex.stack);
	}
	finally {
		log.log("=== stockheimer-deployer done ===");
	}
}

function copyStagingToDeploy() {
	log.log('--- copyStagingToDeploy started ---');

	//blacklist of files to not copy over to the deploy directory
	var fileBlacklist = [
		".git",
		".vscode",
		"client-dist",
		"node_modules",
		".gitignore"
	];

	var files = fs.readdirSync(config.dir_staging);
	var filesArr = [];
	files.forEach( (file) => {
		filesArr.push(file);
	});

	for(var i = 0; i < filesArr.length; i++)
	{
		//check if the name is in the blacklist
		var currentFile = filesArr[i]
		var blacklistIndex = fileBlacklist.findIndex((x) => {return currentFile.toLowerCase() == x.toLowerCase()});
		if(blacklistIndex >= 0)
		{
			//intentionally blank
		}
		else
		{
			var curSource = path.join( config.dir_staging, currentFile );
			if ( fs.lstatSync( curSource ).isDirectory() ) {
				copyFolderRecursiveSync( curSource, config.dir_deploy );
			} else {
				copyFileSync( curSource, config.dir_deploy );
			}
		}
	}

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

function overriteConfigValues() {
	log.log('--- overriteConfigValues started ---');

	var truthClientConfig = JSON.parse(fs.readFileSync("./client-config.json"));
	var stockheimerClientConfig = JSON.parse(fs.readFileSync(path.join(config.dir_deploy, "client/client-config.json")));

	var truthServerConfig = JSON.parse(fs.readFileSync("./server-config.json"));
	var stockheimerServerConfig = JSON.parse(fs.readFileSync(path.join(config.dir_deploy, "server/server-config.json")));
	
	var finalClientJson = myJsonMerge(truthClientConfig, stockheimerClientConfig);
	var finalServerJson = myJsonMerge(truthServerConfig, stockheimerServerConfig);

	//put the new version in them as well
	finalClientJson.version = version;
	finalServerJson.version = version;

	//finally, write the configs to deploy
	fs.writeFileSync(path.join(config.dir_deploy, "client/client-config.json"), JSON.stringify(finalClientJson));
	fs.writeFileSync(path.join(config.dir_deploy, "server/server-config.json"), JSON.stringify(finalServerJson));
	log.log('--- overriteConfigValues done ---');
}

function createBundles() {
	log.log('--- createBundles started ---');

	var npmout = process.execSync('npm run build-prod',
	{
		cwd: config.dir_deploy
	});

	log.log('npm stdout: ' + npmout);
	log.log('--- createBundles done ---');
}


function renameBundlesWithVersion() {
	log.log('--- renameBundlesWithVersion started ---');

	log.log('--- renameBundlesWithVersion done ---');
}

function modifyIndexHtml() {
	log.log('--- modifyIndexHtml started ---');

	log.log('--- modifyIndexHtml done ---');
}

//returns the otherJson with the values overwritten by the sourceOfTruthJson
function myJsonMerge(sourceOfTruthJson, otherJson) {
	var finalJson = JSON.parse(JSON.stringify(otherJson));
	for(var key in sourceOfTruthJson)
	{
		if(finalJson[key] !== undefined)
		{
			finalJson[key] = sourceOfTruthJson[key];
		}
	}
	return finalJson;
}


//something i ordered off the internet
function copyFileSync( source, target ) {

    var targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

//something i ordered off the internet
function copyFolderRecursiveSync( source, target ) {
    var files = [];

    //check if folder needs to be created or integrated
    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

deployStockheimer();