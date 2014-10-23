var wru = require('wru');
var collection = [];
var functions = require('./..');
var crc32 = functions.crc32;
var ucrc32 = functions.ucrc32;

collection.push({
	name: "crc32 function",
	test: function() {
		wru.assert("Function exists", typeof crc32 == "function");
		wru.assert("String 1", crc32("ABC") == -1551695032);
		wru.assert("String 2", crc32("123456789") == -873187034);
	}
});

collection.push({
	name: "ucrc32 function",
	test: function() {
		wru.assert("Function exists", typeof ucrc32 == "function");
		wru.assert("String 1", ucrc32("ABC") == 2743272264);
	}
});


wru.test(collection);