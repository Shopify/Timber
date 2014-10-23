var wru = require('wru');
var collection = [];
var functions = require('./..');
var setBit = functions.setBit;
var resetBit = functions.resetBit;
var isSetBit = functions.isSetBit;
var toggleBit = functions.toggleBit;
var result;

collection[collection.length] = function() {
	var bitMask = 5; // 1 + 0 + 4
	wru.assert("setBit test 1", setBit(bitMask, 2) === 7);
	wru.assert("setBit test 2", setBit(bitMask, 4) === 5);
};

collection[collection.length] = function() {
	var bitMask = 5; // 1 + 0 + 4
	wru.assert("resetBit test 1", resetBit(bitMask, 2) === 5);
	wru.assert("resetBit test 2", resetBit(bitMask, 4) === 1);
};

collection[collection.length] = function() {
	var bitMask = 5; // 1 + 0 + 4
	wru.assert("isSetBit test 1", isSetBit(bitMask, 2) === false);
	wru.assert("isSetBit test 2", isSetBit(bitMask, 4) === true);
};

collection[collection.length] = function() {
	var bitMask = 5; // 1 + 0 + 4
	wru.assert("toggleBit test 1", toggleBit(bitMask, 2) == 7);
	wru.assert("toggleBit test 2", toggleBit(bitMask, 4) == 1);
};

wru.test(collection);