module.exports = function(config){
    process.env.PHANTOMJS_BIN = './node_modules/.bin/phantomjs';
    
    var baseProjectConfig = require('./karma.conf.js');

  baseProjectConfig(config);

  config.set({

    autoWatch : false,

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    phantomjsLauncher: {
        exitOnResourceError: true
    }
  });
};
