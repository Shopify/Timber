var wru = require('wru');
var collection = [];
var functions = require('./..');
var stringEndsWith = functions.stringEndsWith;

collection.push({
	name: "stringEndsWith function",
	test: function() {
		wru.assert("stringEndsWith function exists", typeof stringEndsWith == "function");
	}
},
{
	name: "Test string 1",
	test: function() {
		var s = "Hello";
		var bool = stringEndsWith(s, "o");
		wru.assert("Hello ends with o", bool === true);
	}
}

);


wru.test(collection);