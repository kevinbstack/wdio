var defaults = require("./wdio-bstack.conf.js");
var browserstack = require("browserstack-local");
var _ = require("lodash");

let timeStamp = new Date().getTime();
let localIdentifier = `localIdentifier_${timeStamp}`;

var overrides = {
  specs: ["./test/specs/local/local.spec.js"],

  capabilities: [
    {
      maxInstances: 1,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      app: process.env.BROWSERSTACK_ANDROID_APP_ID || 'bs://7fc2fd35d479bb578ad9ad1e313f5722d5034493',
      autoGrantPermissions: true,
      platformName: "Android",
      "browserstack.local": true,
      "browserstack.localIdentifier": localIdentifier,
    },
  ],
  onPrepare: (config, capabilities) => {
    console.log("Connecting local");
    return new Promise((resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start(
        {
          key: process.env.BROWSERSTACK_ACCESSKEY,
          localIdentifier: localIdentifier,
        },
        (error) => {
          if (error) return reject(error);
          console.log("Connected. Now testing...");
          resolve();
        }
      );
    });
  },
  onComplete: function (capabilties, specs) {
    console.log("Closing local tunnel");
    return new Promise((resolve, reject) => {
      exports.bs_local.stop((error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");
        resolve();
      });
    });
  },
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
