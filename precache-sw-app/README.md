# Precache-SW-App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.1.

# Run the following commands to run the app

1. <strong>npm install</strong>: Installs the concerned node modules
2. <strong>ng build --aot --prod</strong>: Builds the dist file with a service-worker file included
3. <strong>npm run sw</strong>: Generates precaching code for service-worker.js in the build folder
4. <strong>npm run static-serve</strong>: Runs the app on a live server since the service worker and precaching cannot be tested on deployment server 

# Steps to set up precache and service worker in your Angular-4 app

1. Add the following script code just before the end of the body section in index.html
   <pre>
    <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Service Worker registered');
      }).catch(function(err) {
        console.log('Service Worker registration failed: ', err);
      });
    }
    </script></pre>
    
2. Include service-worker.js reference in the assets portion in .angular-cli.json
    <pre>
    "assets": [
      "assets",
      "favicon.ico",
      "service-worker.js"
    ],</pre>
    
3. Create a service-worker.js file in the src directory
4. Run <strong>npm install --save-dev sw-precache</strong> to install and save sw-precache library
5. Create sw-precache-config.js file in the root directory and include the following code
  <pre>
   module.exports = {
      navigateFallback: '/index.html',
      stripPrefix: 'dist',
      root: 'dist/',
      staticFileGlobs: [
        'dist/index.html',
        'dist/**.js',
        'dist/**.css'
      ]
   };</pre>
   
6. Run <strong>npm install -g live-server</strong> to install and save the live-server configuration
7. Add the following script commands in package.json file  
    <pre>
    "scripts": {
        "start": "ng serve",
        "lint": "tslint \"src/**/*.ts\"",
        "test": "ng test",
        "pree2e": "webdriver-manager update",
        "e2e": "protractor",
        "sw": "sw-precache --root=dist --config=sw-precache-config.js",
        "static-serve": "cd dist && live-server --port=4200 --host=localhost --entry-file=/index.html"
      }</pre>

8. Follow the steps mentioned above to run the app
