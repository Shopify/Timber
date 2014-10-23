var wru = require('wru');
var collection = [];
var functions = require('./..');
var deepExtend = functions.deepExtend;

var conf1 = {
	"database": {
		"name": "a",
		"user": "c"
	}
};

var conf2 = {
	"foo": "bar"
}

collection.push({
	name: "deepExtend function",
	test: function() {
		wru.assert("deepExtend function exists", typeof deepExtend == "function");
		
		var r = deepExtend({}, conf1, conf2);
		wru.assert(r.database.name == "a");
		wru.assert(r.database.user == "c");
	}
});


wru.test(collection);