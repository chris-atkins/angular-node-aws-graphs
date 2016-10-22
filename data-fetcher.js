'use strict';
var data = require('./graphData.json');

function getData() {
	return data;
}

module.exports = {
	getData: getData
};