var wru = require('wru');
var collection = [];
var functions = require('./..');
var googleTranslate = functions.googleTranslate;

collection.push({
	name: "Google translate",
	test: function() {
		wru.assert("Function exists", typeof googleTranslate == "function");

		googleTranslate("This need for translation", {from: "en", to: "ru"}, wru.async(function (error, result, others) {
			wru.assert("translate (en -> ru)", result == "Это необходимо для перевода");
			wru.assert(error, !error);
		}));

		// var callback = wru.async(function(){...});
		googleTranslate("Москва", {from: "ru", to: "en"}, wru.async(function (error, result, others) {
			wru.assert("translate (ru -> en)", result == "Moscow");
			wru.assert(error, !error);
		}));
	}
});


wru.test(collection);