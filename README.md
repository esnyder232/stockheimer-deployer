# stockheimer-deployer

This project is to deploy the stockheimer project to a webserver.
This was specifically made for my environments, so if anyone else uses it, it may/may not work.

When this project runs, it does the following list below in order. 
This also serves as documentation for deploys to a degree.

1) In deploy directory, create a version using the date.
 - version: "yyyy-mm-dd_hh-mm-ss"

2) Copy code base from staging to deploy (dir_staging and dir_deploy)

3) In deploy directory, run npm install.

4) In deploy directory, overrite config file values for client and server configs.
   Also put the version in both configs.
 
5) In deploy directory, create the app and vendor bundles.
 - app.bundle.js
 - vendors.bundle.js

6) In deploy directory, rename the app and vendor bundles with the version.
   - app.bundle.js -> app.bundle.yyyy-mm-dd_hh-mm-ss.js
   - vendors.bundle.js -> vendors.bundle.yyyy-mm-dd_hh-mm-ss.js

7) In deploy directory, modify index.html to include the bundles with the hashes (cache busting)


The intended usage of this is to run "node index.js".