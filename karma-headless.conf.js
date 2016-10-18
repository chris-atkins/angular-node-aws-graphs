module.exports = function(config){
  var baseProjectConfig = require('./karma.conf.js');

  process.env.PHANTOMJS_BIN = './node_modules/.bin/phantomjs';

  baseProjectConfig(config);

  config.set({

    autoWatch : false,

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],
  });
};
