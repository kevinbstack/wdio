var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  specs: [
    "./test/specs/e2e/e2e.spec.js",
    "./test/specs/login/*.spec.js",
    "./test/specs/offers/*.spec.js",
    "./test/specs/user/*.spec.js",
    "./test/specs/cart/*.spec.js",
  ],

  capabilities: [
    {
      maxInstances: 2,
      device: "Samsung Galaxy A51",
      os_version: "10.0",
      app: process.env.BROWSERSTACK_ANDROID_APP_ID || 'bs://7fc2fd35d479bb578ad9ad1e313f5722d5034493',
      autoGrantPermissions: true,
      platformName: "Android",
    },
  ],
};

const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
