# stockheimer-deployer

This project is to deploy the stockheimer project to a webserver.
This was specifically made for my environments, so if anyone else uses it, it may/may not work.

When this project runs, it does the following list below in order. 
This also serves as documentation for deploys to a degree.

1) Copy code base from staging to deploy (dir_staging and dir_deploy)

2) In deploy directory, run npm install.

3) In deploy directory, modify any client files that are necessary to get clients working in a prod server/client environment.
 
4) In deploy directory, create the app and vendor bundles.
 - app.bundle.js
 - vendors.bundle.js

5) In deploy directory, hash the app.bundle.js to get a hash number, and store the number in a file somewhere.

6) In deploy directory, rename the app and vendor bundles with the hash.
   - app.bundle.js -> app.bundle.12345.js
   - vendors.bundle.js -> vendors.bundle.12345.js

7) In deploy directory, modify index.html to include the bundles with the hashes (cache busting)


The intended usage of this is to run "node index.js".