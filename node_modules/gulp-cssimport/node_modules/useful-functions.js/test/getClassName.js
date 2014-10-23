var wru = require('wru');
var collection = [];
var functions = require('./..');
var getClassName = functions.getClassName;

var F = function(){};

collection.push({
	name: "getClassName function",
	test: function() {
		wru.assert("getClassName function exists", typeof getClassName == "function");
		wru.assert("Date", getClassName(new Date) == "Date");
		wru.assert("Object", getClassName(new Object) == "Object");
		wru.assert("Anonymous", getClassName(new F) == "(Anonymous)");
	}
});


wru.test(collection);