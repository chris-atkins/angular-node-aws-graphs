'use strict';
exports.config = {
  allScriptsTimeout: 11000,

  seleniumAddress: 'http://ec2-54-161-93-17.compute-1.amazonaws.com:4444/wd/hub',
  
  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': process.env.SELENIUM_BROWSER
  },
  
  baseUrl: 'http://ec2-54-152-94-59.compute-1.amazonaws.com:80/',

  params: {
	  apiHostname: 'http://ec2-54-152-94-59.compute-1.amazonaws.com',
	  apiBasePath: '/api',
	  apiPort: 80,
	  apiBaseUrl: 'http://ec2-54-152-94-59.compute-1.amazonaws.com:80/api'
  },

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 15000
  }
};
