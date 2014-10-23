var wru = require('wru');
var collection = [];
var functions = require('./..');
var extend = functions.extend;
var inspect = require('util').inspect;


var conf1 = {
	"database": {
		"name": "a"
	}
};

var conf2 = {
	"foo": "bar"
}

collection.push({
	name: "extend function",
	test: function() {
		wru.assert("extend function exists", typeof extend == "function");
		var r1 = extend({}, conf1);
		wru.assert("Simple test", inspect(r1) == "{ database: { name: 'a' } }");
		var r2 = extend(r1, conf2);
		wru.assert("Merge test", inspect(r2) == "{ database: { name: 'a' }, foo: 'bar' }");

		wru.assert("Equal test", r1 === r2);
	}
});


wru.test(collection);