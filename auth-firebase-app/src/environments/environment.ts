// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBNdwqp1BHXefwnL5iSYy9ruwOsNB0FiEQ",
    authDomain: "angular-auth-app.firebaseapp.com",
    databaseURL: "https://angular-auth-app.firebaseio.com",
    projectId: "angular-auth-app",
    storageBucket: "",
    messagingSenderId: "1072500932151"
  }
};
