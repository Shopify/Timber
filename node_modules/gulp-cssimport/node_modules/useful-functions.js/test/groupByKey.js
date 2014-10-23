var wru = require('wru');
var collection = [];
var functions = require('./..');
var groupByKey = functions.groupByKey;
var inspect = require('util').inspect;


var dataset = [
	{a: "x1", b: "y1", c: "z1"},
	{a: "x2", b: "y2", c: "z1"},
	{a: "x1", b: "y2", c: "z3"},
	{a: "x4", b: "y4", c: "z4"}
];

collection.push({
	name: "groupByKey function",
	test: function() {
		wru.assert("groupByKey function exists", typeof groupByKey == "function");
		var ax1 = groupByKey("a", dataset)["x1"];
		wru.assert("First group", inspect(ax1) == "[ { a: 'x1', b: 'y1', c: 'z1' }, { a: 'x1', b: 'y2', c: 'z3' } ]");
	}
});


wru.test(collection);