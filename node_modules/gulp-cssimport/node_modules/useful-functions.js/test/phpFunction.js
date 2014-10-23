var wru = require('wru');
var collection = [];
var functions = require('./..');
var phpFunction = functions.phpFunction;
var result;

collection.push(

{
	name: "phpFunction #0",
	test: function() {
		wru.assert("phpFunction function exists", typeof phpFunction == "function");
	}
},	

{
	name: "phpFunction #1",
	test: function() {
		phpFunction("strings.crc32", wru.async(function (error, func) {
			wru.assert("function", typeof func == "function");
		}));
	}
}

);

wru.test(collection);