var wru = require('wru');
var collection = [];
var functions = require('./..');
var tableFormat = functions.tableFormat;
var inspect = require('util').inspect;

collection.push({
	name: "tableFormat function",
	test: function() {
		wru.assert("tableFormat function exists", typeof tableFormat == "function");
		
		var row = [1, "002", 3];
		var tableFormatResult = tableFormat(['A', 'B', 'C'], [row]);
		var expectedResult = "+---+-----+---+\n| A | B   | C |\n+---+-----+---+\n| 1 | 002 | 3 |\n+---+-----+---+";
		wru.assert("ABC test", expectedResult == tableFormatResult);
	}
});


wru.test(collection);