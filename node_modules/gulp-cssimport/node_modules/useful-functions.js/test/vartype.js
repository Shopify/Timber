var wru = require('wru');
var collection = [];
var functions = require('./..');
var varType = functions.varType;

collection.push({
	name: "varType function",
	test: function() {
		wru.assert("varType function exists", typeof varType == "function");

		wru.assert("varType null", varType(null) == "null");
	}
},
{
	name: "Test objects",
	test: function() {
		var o = {};
		wru.assert("Simple object", varType(o) == 'object');

		var o = new Date();
		wru.assert("Date object", varType(o) == 'date');
	}
},

{
	name: "Test non objects",
	test: function() {
		var o = "s";
		wru.assert("Date object", varType(o) == 'string');


	}
},

{
	name: "Test numbers",
	test: function() {
		var o = 1;
		wru.assert("Integer object", varType(o) == 'integer');

		var o = 1.45;
		wru.assert("Float object", varType(o) == 'float');
		
	}
}

);


wru.test(collection);