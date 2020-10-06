const {Logger} = require('./logger.js');
const {script1} = require('./script1.js');


try {
	//create log
	var log = new Logger();

	log.log("=== stockheimer-deployer start ===");

	script1();

}
catch(ex) {
	if(log.isInitialized()){
		log.log(ex.stack);
	}
	else //atleast console log it
	{
		console.log(ex.stack);
	}
}
finally {
	if(log.isInitialized()){
		log.log("=== stockheimer-deployer done ===");
	}
	else //atleast console log it
	{
		console.log("=== stockheimer-deployer done ===");
	}	
}
