const process = require('child_process');
const path = require('path');
const fs = require('fs');
const {config} = require('./config.js');
const {Logger} = require('./logger.js');


//create log
var log = new Logger();

function deployStockheimer(){
	try {
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

	log.log(files)

	var src = path.join(config.dir_staging, "LICENSE");
	var target = config.dir_deploy;
	log.log(src);
	log.log(target);
	//copyFolderRecursiveSync(src, target);
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