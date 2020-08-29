// This file is intentionally left blank.
//
// During a production build, the docker image will overwrite this file
// and inject all the enviornment variables. The /publix/index.html file loads
// this JavaScript which will injec our environment variables into the "window.env" property.
// On dev builds on localhost, the environment variables get injected into the "process.env".
//
// To access the environment variables, devs should use the /src/Settings.ts file which determines
// where the variables were injected, and exposes them via a class.
