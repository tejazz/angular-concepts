# Precache-SW-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

# Run the following commands to run the app

1. npm install: Installs the concerned node modules
2. ng build --aot --prod: Builds the dist file with a service-worker file included
3. npm run sw: Generates precaching code for service-worker.js in the build folder
4. npm run static-serve: Runs the app on a live server since the service worker and precaching cannot be tested on deployment server 