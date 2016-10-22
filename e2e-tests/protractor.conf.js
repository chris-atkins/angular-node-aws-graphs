'use strict';
exports.config = {
  allScriptsTimeout: 11000,
	
  chromeDriver: '../node_modules/chromedriver/lib/chromedriver/chromedriver',
	
  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/',
  
  params: {
	  apiHostname: 'localhost',
	  apiPort: 8000,
	  apiBasePath: '/api',
	  apiBaseUrl: 'http://localhost:8000/api'
  },
  
  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 10000
  }
};
