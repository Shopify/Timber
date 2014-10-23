var ServerResponse = require("http").ServerResponse;
var ServerRequest = require("http").IncomingMessage;
var fs = require("fs");
var utilLog = require("util").log; 
var isArray = require("util").isArray;
var inspect = require("util").inspect;
var format = require("util").format;
var toString = Object.prototype.toString;
var self = {};
module.exports = self;

function varType(mixed) {
	if (mixed === null) return "null";
	var result = typeof mixed;
	if (result == "object") result = getClassName(mixed).toLowerCase();
	if (result == "number") {
		result = self.isFloat(mixed) ? "float" : "integer";
	}
	return result;
}


self.isObject = function(mixed) {
	if (Object.prototype.toString.call(mixed) === "[object Array]") {
		return false;
	}
	return mixed !== null && typeof mixed === "object";
};


self.isIterable = function (mixed) {
	return mixed !== null && typeof mixed === "object";
};


self.setValueR = function(fields, object, value) {

	if (typeof fields !== "string") throw new Error("Argument #1 expects a string, given " + varType(fields) + ".");
	fields = fields.split(".");

	function levelUp (obj, field, value) {
		if (typeof obj[field] !== "undefined") {
			if (fields.length === 0) {
				// var oldVal = obj[field];
				obj[field] = value;
				return value;
			} else {
				if (typeof obj[field] !== "object") {
					obj[field] = {};
				}
				return levelUp(obj[field], fields.shift(), value);
			}
		} else {
			// keep going if necessary
			if (fields.length === 0) {
				obj[field] = value;
				return value;
			} else {
				// var newField = fields.shift()
				obj[field] = {}; // {newField: value}
				return levelUp(obj[field], fields.shift(), value);
			}
		}
	}

	return levelUp(object, fields.shift(), value);
};


// http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
self.extend = function(destination, source) {
	for (var property in source) {
		if (source[property] && source[property].constructor && source[property].constructor === Object) {
			destination[property] = destination[property] || {};
			arguments.callee(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;
};

/**
 * http://phpjs.org/functions/crc32/
 * @param  {string} str 
 * @return {int}     [description]
 */
self.crc32 = function(str) {
	// http://kevin.vanzonneveld.net
	// +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	// +   improved by: T0bsn
	// -    depends on: utf8_encode
	// *     example 1: crc32('Kevin van Zonneveld');
	// *     returns 1: 1249991249
	// str = this.utf8_encode(str);
	var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";

	var crc = 0;
	var x = 0;
	var y = 0;

	crc = crc ^ (-1);
	for (var i = 0, iTop = str.length; i < iTop; i++) {
		y = (crc ^ str.charCodeAt(i)) & 0xFF;
		x = "0x" + table.substr(y * 9, 8);
		crc = (crc >>> 8) ^ x;
	}

	return crc ^ (-1);
}

self.ucrc32 = function(str) {
	return self.crc32(str) >>> 0;
}


/**
* Function for drawing text as table like in MySQL client console.
* Example:
Row1 = array('Yvan', 'kras@mail.com', '1');
Row2 = array('John', 'dsffffkrok@mail.ag', '0');
textTableFormat(array('FirstName', 'Email', 'OnlineWork'), array(Row1, Row2, ...));
Result:
+-----------+-------------------------+------------+
| FirstName | Email                   | OnlineWork |
+-----------+-------------------------+------------+
| Yvan      | kras@mail.com           |          1 |
| John      | dsffffkrok@mail.ag      |          0 |
| Dummy     | krokuswww@mail.com      |          1 |
| Andy      | lande@reg.maosss.cow    |          0 |
+-----------+-------------------------+------------+
*/
self.textTableFormat = (function() {
	// TODO: FIX FOR MULTILINE TEXT
	var textDataSeparator = function(maxLengthArray) {
		var result = '';
		for (var i = 0, count = maxLengthArray.length; i < count; i++) {
			var length = maxLengthArray[i];
			result += '+-' + (new Array(length + 1)).join("-") + '-';
		}
		return result + '+';
	}
	var arrayValues = function(array) {
		var result = [];
		for (var i in array) result.push(array[i]);
		return result;
	}
	var strPadSpace = function(value, size) {
		var pad = '';
		var diff = size - ("" + value).length;
		if (diff > 0) {
			pad = (new Array(diff + 1)).join(' ');
			if (self.isNumeric(value)) {
				var tmp = value;
				value = pad;
				pad = tmp;
			}
		}
		return value + pad;
	}
	var textDataRow = function(array, maxLengthArray) {
		var result = '';
		array = arrayValues(array);
		for (var i in array) {
			var value = array[i];
			var maxLengthOfRow = maxLengthArray[i];
			// TODO: How are we going to display null values?
			result += '| ' + strPadSpace(value, maxLengthOfRow) + ' ';
		}
		return result + '|';
	}

	return function(headers, dataArray, options) {
		var length = headers.length;
		// var maxLengthArray = (new Array(length)).map(parseInt);
		var maxLengthArray = [];
		dataArray.unshift(headers);
		// 1. Detect max length.
		for (var k in dataArray) {
			var data = arrayValues(dataArray[k]);
			for (var i = 0; i < length; i++) {
				var localLength = ("" + data[i]).length;
				if (maxLengthArray[i] === undefined) maxLengthArray[i] = 0;
				if (localLength > maxLengthArray[i]) maxLengthArray[i] = localLength;
			}
		}
		var result = "";
		// 2. Draw headers.
		result += textDataSeparator(maxLengthArray) + "\n";
		result += textDataRow(dataArray.shift(), maxLengthArray) + "\n";	
		result += textDataSeparator(maxLengthArray) + "\n";
		// 3. Draw table rows.
		for (var n in dataArray) {
			result += textDataRow(dataArray[n], maxLengthArray) + "\n";
		}
		result += textDataSeparator(maxLengthArray);

		return result;
	};
})();

function getServerResponse() {
	arguments[-1] = global["_RESPONSE"];
	for (var i = -1, length = arguments.length; i < length; i++) {
		var object = arguments[i];
		if (object instanceof ServerResponse) {
			return object;
		}
	}
}

function getServerRequest() {
	arguments[-1] = global["_REQUEST"]
	for (var i = -1, length = arguments.length; i < length; i++) {
		var object = arguments[i];
		if (object instanceof ServerRequest) {
			return object;
		}
	}
}

self.connectFunctions = function() {
	return function(request, response, next) {
		global["_REQUEST"] = request;
		global["_RESPONSE"] = response;
		next();
	};
}

/**
 * Promote key for associative array/dataset.
 * @param  {string} promotedKey
 * @param  {array} collection  (or any iterable object).
 * @return {object}
 */
self.promoteKey = function(promotedKey, collection) {
	var result = {};
	for (var i in collection) {
		var key = collection[promotedKey];
		result[key] = collection[i];
	}
	return result;
}

self.groupByKey = function(key, collection, options) {
	var result = {};
	for (var i in collection) {
		var data = collection[i];
		var keyValue = data[key];
		if (!result[keyValue]) result[keyValue] = [];
		result[keyValue].push(data);
	}
	return result;
}

self.cleanUpString = (function() {
	var latins = {'-':' ', '_':' ', '&lt;':'', '&gt;':'', '&#039;':'', '&amp;':'','&quot;':'', 'À':'A', 'Á':'A', 'Â':'A', 'Ã':'A', 'Ä':'Ae','&Auml;':'A', 'Å':'A', 'Ā':'A', 'Ą':'A', 'Ă':'A', 'Æ':'Ae','Ç':'C', 'Ć':'C', 'Č':'C', 'Ĉ':'C', 'Ċ':'C', 'Ď':'D', 'Đ':'D','Ð':'D', 'È':'E', 'É':'E', 'Ê':'E', 'Ë':'E', 'Ē':'E','Ę':'E', 'Ě':'E', 'Ĕ':'E', 'Ė':'E', 'Ĝ':'G', 'Ğ':'G','Ġ':'G', 'Ģ':'G', 'Ĥ':'H', 'Ħ':'H', 'Ì':'I', 'Í':'I','Î':'I', 'Ï':'I', 'Ī':'I', 'Ĩ':'I', 'Ĭ':'I', 'Į':'I','İ':'I', 'Ĳ':'IJ', 'Ĵ':'J', 'Ķ':'K','Ł':'K', 'Ľ':'K','Ĺ':'K', 'Ļ':'K', 'Ŀ':'K', 'Ñ':'N', 'Ń':'N', 'Ň':'N','Ņ':'N', 'Ŋ':'N', 'Ò':'O', 'Ó':'O', 'Ô':'O', 'Õ':'O','Ö':'Oe', '&Ouml;':'Oe', 'Ø':'O', 'Ō':'O', 'Ő':'O', 'Ŏ':'O','Œ':'OE', 'Ŕ':'R', 'Ř':'R', 'Ŗ':'R', 'Ś':'S', 'Š':'S','Ş':'S', 'Ŝ':'S', 'Ș':'S', 'Ť':'T', 'Ţ':'T', 'Ŧ':'T','Ț':'T', 'Ù':'U', 'Ú':'U', 'Û':'U', 'Ü':'Ue', 'Ū':'U','&Uuml;':'Ue', 'Ů':'U', 'Ű':'U', 'Ŭ':'U', 'Ũ':'U', 'Ų':'U','Ŵ':'W', 'Ý':'Y', 'Ŷ':'Y', 'Ÿ':'Y', 'Ź':'Z', 'Ž':'Z','Ż':'Z', 'Þ':'T', 'à':'a', 'á':'a', 'â':'a', 'ã':'a','ä':'ae', '&auml;':'ae', 'å':'a', 'ā':'a', 'ą':'a', 'ă':'a','æ':'ae', 'ç':'c', 'ć':'c', 'č':'c', 'ĉ':'c', 'ċ':'c','ď':'d', 'đ':'d', 'ð':'d', 'è':'e', 'é':'e', 'ê':'e','ë':'e', 'ē':'e', 'ę':'e', 'ě':'e', 'ĕ':'e', 'ė':'e','ƒ':'f', 'ĝ':'g', 'ğ':'g', 'ġ':'g', 'ģ':'g', 'ĥ':'h','ħ':'h', 'ì':'i', 'í':'i', 'î':'i', 'ï':'i', 'ī':'i','ĩ':'i', 'ĭ':'i', 'į':'i', 'ı':'i', 'ĳ':'ij', 'ĵ':'j','ķ':'k', 'ĸ':'k', 'ł':'l', 'ľ':'l', 'ĺ':'l', 'ļ':'l','ŀ':'l', 'ñ':'n', 'ń':'n', 'ň':'n', 'ņ':'n', 'ŉ':'n','ŋ':'n', 'ò':'o', 'ó':'o', 'ô':'o', 'õ':'o', 'ö':'oe','&ouml;':'oe', 'ø':'o', 'ō':'o', 'ő':'o', 'ŏ':'o', 'œ':'oe','ŕ':'r', 'ř':'r', 'ŗ':'r', 'š':'s', 'ù':'u', 'ú':'u','û':'u', 'ü':'ue', 'ū':'u', '&uuml;':'ue', 'ů':'u', 'ű':'u','ŭ':'u', 'ũ':'u', 'ų':'u', 'ŵ':'w', 'ý':'y', 'ÿ':'y','ŷ':'y', 'ž':'z', 'ż':'z', 'ź':'z', 'þ':'t', 'ß':'ss','ſ':'ss', 'ый':'iy', 'А':'A', 'Б':'B', 'В':'V', 'Г':'G','Д':'D', 'Е':'E', 'Ё':'YO', 'Ж':'ZH', 'З':'Z', 'И':'I','Й':'Y', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O','П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F','Х':'H', 'Ц':'C', 'Ч':'CH', 'Ш':'SH', 'Щ':'SCH', 'Ъ':'','Ы':'Y', 'Ь':'', 'Э':'E', 'Ю':'YU', 'Я':'YA', 'а':'a','б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo','ж':'zh', 'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l','м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s','т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'c', 'ч':'ch','ш':'sh', 'щ':'sch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e','ю':'yu', 'я':'ya'};
	var regexp = new RegExp("(" + Object.keys(latins).join("|") + ")", "g");
	return function(string) {
		string = string.replace(regexp, function(oldChar) {
			var newChar = latins[oldChar];
			return newChar;
		});
		string = string.replace(/[^A-Za-z0-9 ]/g, "");
		string = self.trim(string);
		string = string.replace(/ +/g, "-");
		return string.toLowerCase();
	};
})();

self.googleTranslate = function(string, settings, callback) {
	if (!settings) settings = {};
	if (!callback) callback = settings.callback;
	var from = settings.from || "ru";
	var to = settings.to || "en";

	var http = require('http');
	var querystring = require('querystring');

	// string = encodeURIComponent(string);

	var data = {
		client: "t",
		text: string,
		sl: from,
		tl: to,
		ie: "UTF-8",
		oe: "UTF-8"
	};

	var options = {
		host: "translate.google.com",
		port: 80,
		method: "GET",
		headers: {
			"Referer": "http://translate.google.com/"
		},
		path: "/translate_a/t?" + querystring.stringify(data)
	};

	var body = "";

	var request = http.request(options, function(response) {
		response.setEncoding("utf8");
		response.on("data", function(chunk) {
			body += chunk.toString("utf8");
		});
		response.on("end", function() {
			var pos = body.indexOf("]]");
			body = body.substr(1, pos + 1);
			try {
				var json = JSON.parse(body);
			} catch (e) {
				var error = new Error(["JSON parse", e.name, e.message].join(", ") + ".");
				if (callback) callback(error, false);
				return;
			}
			var all = self.getValue(0, json);
			var result = self.getValue(0, all);
			// result = html_entity_decode(result, ent_quotes, 'utf-8');
			if (callback) callback(false, result, all);
		});
	});

	request.on("error", function(e) {
		if (callback) callback(e, false);
	});

	request.end();
	
}

self.getIpAddress = function() {
	var result;
	var request = getServerRequest(arguments[0], this);
	if (request) {
		result = request.connection.remoteAddress;
	}
	return result;
}

function inArray(needle, haystack, strict) {
	if (strict) {
		var someTest = function(value) {
			return (value === needle);
		};
	} else {
		var someTest = function(value) {
			return (value == needle);
		};
	}
	return (isArray(haystack) && haystack.some(someTest));
}

function escapeHtml(string) {
	string = string
		.replace('&', '&amp;')
		.replace('<', '&lt;')
		.replace('>', '&gt;')
		.replace('"', '&#34;')
		.replace('\'', '&#39;');
	return string;
}

function insideCut(string, length, separator) {
	if (string.length > length) {
		if (separator == undefined) separator = '...';
		//if (separator == undefined) separator = '…';
		var padding = Math.floor(length/2);
		string = string.slice(0, padding) + separator + string.slice(-padding);
	}
	return string;	
}

self.ucfirst = function(string) {
	string += '';
	var first = string.charAt(0).toUpperCase();
	return first + string.substr(1);
}

self.getExtension = function(string) {
	string += '';
	return string.substr(string.lastIndexOf('.') + 1);
}

function getClassName(object) {
	var result;
	if (object && object.constructor && typeof object.constructor == 'function') {
		var functionCode = object.constructor.toString();
		var pos = functionCode.indexOf('(');
		result = self.trim(functionCode.substr(8, pos-8));
		if (result == "") result = "(Anonymous)";
	} else {
		result = toString.call(object).slice(8, -1);
	}
	return result;
}

/**
 * Returns the first number clamped to the interval from A to B.
 * @param  {mixed} v [description]
 * @param  {mixed} a [description]
 * @param  {mixed} b [description]
 * @return {mixed}   [description]
 */
self.clamp = function(v, a, b) {
	if (v > b) return b;
	else if (v < a) return a;
	else return v;
}

self.isNumeric = function(mixed) {
	var result = !isNaN(parseFloat(mixed)) && isFinite(mixed);
	return result;
}

self.isFloat = function(mixed) {
	return +mixed === mixed && (!isFinite(mixed) || !!(mixed % 1));
}

self.isString = function(object) {
	// Returns true if variable is a Unicode or binary string.
	return (typeof object == 'string');
}

self.trim = function(str, charlist) {
	// http://kevin.vanzonneveld.net
	var whitespace, l = 0,
		i = 0;
	str += '';

	if (!charlist) {
		whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
	} else {
		charlist += '';
		whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
	}

	l = str.length;
	for (i = 0; i < l; i++) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(i);
			break;
		}
	}

	l = str.length;
	for (i = l - 1; i >= 0; i--) {
		if (whitespace.indexOf(str.charAt(i)) === -1) {
			str = str.substring(0, i + 1);
			break;
		}
	}

	return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

self.safeGlob = function(pattern, extensions, callback) {
	// TODO: extensions
	// TODO: callback
	var dirname = require('path').dirname;
	var basename = require('path').basename;
	var chars = basename(pattern).split('');
	var regexpString = '';
	for (var i = 0, length = chars.length; i < length; i++) {
		var symbol = chars[i];
		switch (symbol) {
			case '.': regexpString += '\\' + symbol; break;
			case '*': regexpString += '.*'; break;
			default: regexpString += symbol;
		}
	}
	var regexp = new RegExp(regexpString);
	var directory = dirname(pattern);
	// TODO: Async
	var files = fs.readdirSync(directory);
	var result = [];
	files.forEach(function(name) {
		if (regexp.test(name)) {
			result.push(directory + '/' + name);
		}
	});
	return result;
}

self.stringBeginsWith = function(haystack, needle) {
	if (haystack == null) haystack = '';
	var result = haystack.substr(0, needle.length) == needle;
	return result;
}

self.stringEndsWith = function(haystack, needle) {
	haystack = "" + haystack;
	needle = "" + needle;
	var position = haystack.length;
	position = position - needle.length;
	var lastIndex = haystack.lastIndexOf(needle);
	return lastIndex !== -1 && lastIndex === position;
}

self.getValue = function(key, collection, value, remove) {
	if (value === undefined) value = false;
	if (remove === undefined) remove = false;
	var result = value;
	if (typeof collection == 'object' && key in collection) {
		result = collection[key];
	}
	if (remove) {
		delete collection[key];
	}
	return result;
}

self.getValueR = function(key, collection, defaultResult) {
	if (defaultResult == undefined) defaultResult = false;
	var path = key.split('.');
	var value = collection;
	for (var i = 0, length = path.length; i < length; i++) {
		var subkey = path[i];
		if (subkey in value) {
			value = value[subkey];
		} else {
			return defaultResult;
		}
	}
	return value;
}

self.hasValue = function(data, value) {
	if (typeof data == 'object') {
		for (var k in data) {
			var v = data[k];
			if (typeof(v) == 'object' && self.hasValue(v, value)) return true;
			if (value == v) return true;
		}		
	}
	return false;
}

self.formatSize = (function() {
	var units = ['B', 'K', 'M', 'G', 'T'];
	var log1024 = Math.log(1024);
	
	return function(bytes, precision) {
		if (arguments.length < 2) precision = 2;
		var pow = Math.floor(Math.log(bytes) / log1024);
		pow = Math.min(pow, units.length - 1);
		bytes /= Math.pow(1024, pow);
		return bytes.toFixed(precision).toString() + units[pow];
	};
})();

self.log = function(message) {
	var args = Array.prototype.slice.call(arguments, 1);
	message = format.apply(this, [message].concat(args));
	utilLog(message);
}

self.htmlspecialchars = function(string) {
	// TODO: Implement me.
	return self.escapeHtml(string);
}

self.suffixString = function(string, suffix) {
	var length = suffix.length;
	if (string.substr(-length) != suffix) {
		string += suffix;
	}
	return string;
}

/**
 * Takes a string, and prefixes it with Prefix unless it is already prefixed that way.
 * @param  {string} prefix The prefix to use.
 * @param  {string} string The string to be prefixed.
 * @return {string}
 */
self.prefixString = function(prefix, string) {
	if (string.substr(0, prefix.length) != prefix) {
		string = prefix + string;
	}
	return string;
}

/**
 * [exceptionHandler description]
 * @param  {[type]} error [description]
 * @return {[type]}       [description]
 * process.on('uncaughtException', exceptionHandler);
 */
function exceptionHandler(error) {
	if (typeof error == "string") error = new Error(error);
	var messageInfo = error.message.split(' ');
	var message = error.message;
	var senderObject;
	var senderMethod;
	var senderCode;
	var backtraceCodeStack = 1;
	if (messageInfo.length == 4) {
		message = messageInfo[0];
		senderObject = messageInfo[1];
		senderMethod = messageInfo[2];
		senderCode = messageInfo[3];
		backtraceCodeStack = 2;
	} else {
		message = insideCut(message, 80);
	}
	var stack = error.stack;
	var stackArray = stack.split("\n    at ");
	var filePath;
	var lineNumber;
	var errorLines;
	var filePathFound = false;
	var backtrace = [];
	for (var i = 1, length = stackArray.length; i < length; i++) {
		var line = stackArray[i];
		if (!filePathFound && i >= backtraceCodeStack) {
			var match = line.match(/\((.+?):(\d+):\d+\)$/);
			if (match) {
				filePath = match[1];
				lineNumber = parseInt(match[2], 10);
				if (fs.existsSync(filePath)) {
					filePathFound = true;
					errorLines = fs.readFileSync(filePath, 'utf8').split("\n");
				}
			}
		}
		backtrace.push(line);
	}
	if (!senderObject && !senderMethod) {
		var sender = backtrace[0].split(' ')[0].split('.');
		if (sender.length > 0) {
			senderMethod = sender.pop();
		}
		if (sender.length > 0) {
			senderObject = sender.shift();
		}
		// TODO: TRY TO FIND MORE EFFECTIVE 
		if (!senderObject) {
			senderObject = 'Javascript';
		}
		if (!senderMethod) {
			senderMethod = 'exceptionHandler';
		}
	}

	var panicError = true;
	var deliveryType = 'ALL'; // TODO: DETECT 'deliveryType'
	
	var os = require('os');

	var errorCodeTrace = '';
	if (isArray(errorLines) && lineNumber > -1) {
		var errorCodeLines = errorLines.slice(lineNumber - 6, lineNumber + 4);
		for (var i = 0, length = errorCodeLines.length, last = length - 1; i < length; i++) {
			var fileLineNumber = lineNumber - 6 + i + 1;
			var padding = '>';
			var cssClass = '';
			if (fileLineNumber == lineNumber) {
				padding += '>>';
				cssClass = 'Highlight';
			}
			padding = padding + '   ';
			padding = padding.slice(0, 3) + ' ' + fileLineNumber + ':';
			var line = (padding + ' ' + escapeHtml(errorCodeLines[i])).trim();
			if (i != last) {
				line += "\n";
			}
			errorCodeTrace += '<span' + (cssClass ? ' class="'+cssClass+'"' : '') + '>' + line + '</span>';
		}
		errorCodeTrace = '<pre>' + errorCodeTrace + '</pre>';
	}

	var versions = process.versions;

	if (panicError == true) {
		if (deliveryType == 'ALL') {
			var deverrorCssFile = __dirname + '/design/deverror.css';
			var styleCss = fs.readFileSync(deverrorCssFile);
			if (styleCss) {
				styleCss = ['<style type="text/css">', styleCss, '</style>'].join("\n");
			}
			var html = [
				'<!DOCTYPE html>',
				'<html>',
				'<head>',
				'<meta name="robots" content="noindex" />',
				'<title>' + 'Fatal Error' + '</title>',
				styleCss ? styleCss : '',
				// '<link href="/applications/garden/design/deverror.css" type="text/css" rel="stylesheet">',
				'</head>',
				'<body>',
				'<div id="Frame">',
				'<h1>' + 'Fatal Error in ' + senderObject + '.' + senderMethod + '()' + '</h1>',
				'<div id="Content">',
				'<h2>' + escapeHtml(message) + '</h2>',
				(senderCode) ? '<code>' + escapeHtml(senderCode) + '</code>' : '',
				(filePath) ? '<h3>The error occurred on or near: <strong> ' + filePath + '</strong></h3>' : '',
				(errorCodeTrace) ? '<div class="PreContainer">' + errorCodeTrace + '</div>' : '',
				'<h3><strong>Backtrace:</strong></h3>',
				// TODO: escapeHtml on backtrace
				'<div class="PreContainer"><pre>' + backtrace.join("\n") + '</pre></div>',
				//'<h3><strong>Variables in local scope:</strong></h3>',
				//'<h3><strong>Queries:</strong></h3>',
				//'<h3>Need Help?</h3>',
				//'<p>If you are a user of this website, you can report this message to a website administrator.</p>',
				//'<p>If you are a user of this website, you can report this message to a website administrator.</p>',
				'<h3><strong>Additional information:</strong></h3>',
				'<ul>',
				'<li><strong>Error:</strong> ' + escapeHtml(message) + '</li>',
				// '<li><strong>Application:</strong> ' + '' + '</li>',
				// '<li><strong>Application Version:</strong> ' + '' + '</li>',
				'<li><strong>Operating System:</strong> ' + [os.platform(), os.release()].join(' ') + '</li>',
				'<li><strong>Server Software:</strong> ' + ['node', versions.node, 'v8', versions.v8].join(' ') + '</li>',
				// TODO: ADD BELOW
				//'<li><strong>User Agent:</strong> ' + '?' + '</li>',
				//'<li><strong>Request Uri:</strong> ' + '?' + '</li>',
				'</ul>',
				'</div>',
				'</div>',
				'</body>',
				'</html>',
			].join("\n");
			var response = getServerResponse();
			if (response) {
				response.statusCode = 500;
				response.write(html);
				response.end();
			}
			var errorText = error.stack;
			console.error(errorText);

		} else {
			throw new Error("Not implemented.");
		}
	} else {
		throw new Error("Not implemented.");
	}
}

self.throwErrorMessage = function(message, senderObject, senderMethod, code) {
	var string = [message, senderObject, senderMethod, code].join(' '); // <-- &nbsp; ALT+0160
	throw new Error(string);
}

function d() {
	var args = Array.prototype.slice.call(arguments);
	var response;
	// Search ServerResponse object.
	for (var i = 0; i < args.length; i++) {
		var arg = args[i];
		if (typeof arg == "object" && arg instanceof ServerResponse) {
			response = args.splice(i, 1)[0];
			break;
		}
	}
	if (!response) {
		response = getServerResponse();
	}
	for (var i = 0; i < args.length; i++) {
		var h = new Array(i + 2).join('*');
		var arg = args[i];
		//var arg = inspect(args[i], true, 1);
		console.log(h, arg);
	}

	if (response) {
		if (!response._headerSent) {
			//response.setHeader('Content-Type', 'plain/text; charset=utf-8');
			response.setHeader('Content-Type', 'text/html; charset=utf-8');
		}
		response.write("<pre>");
		for (var i = 0; i < args.length; i++) {
			response.write(new Array(i + 2).join('*'));
			response.write("\n");
			response.write(inspect(args[i], true, 1));
			response.write("\n");
		}
		response.write("</pre>");
		response.end();
	}
}

self.formatString = (function() {
	var formatStringCallback = function(data, match, stringInfo) {
		// Parse out the field and format.
		var parts = stringInfo.split(",");
		var field = self.trim(parts[0]);
		var format = self.trim(self.getValue(1, parts, ""));
		var subFormat = self.trim(self.getValue(2, parts, "")).toLowerCase();
		var formatArgs = self.getValue(3, parts, "");

		if (inArray(format, ["currency", "integer", "percent"])) {
			formatArgs = subFormat;
			subFormat = format;
			format = "number";
		} else if (self.isNumeric(subFormat)) {
			formatArgs = subFormat;
			subFormat = "";
		}
		
		var value = self.getValueR(field, data, "");

		// console.log("parts", parts);
		// console.log("format", format);
		// console.log("subFormat", subFormat);
		// console.log("formatArgs", formatArgs);
		// console.log("field", field);
		// console.log("data", data);
		// console.log("value", value);

		var result = "";
		if (value == "" && !inArray(format, ["url", "exurl"])) {
			return result;
		}

		switch (format.toLowerCase()) {
			case "date": {
				switch (subFormat) {
					case "short": result = formatDate(value, "%d/%m/%Y");
				}
			} break;
			case "number": {
				if (!self.isNumeric(value)) {
					result = value;
					break;
				}
				switch (subFormat) {
					case "currency": result = '$' + number_format(value, self.isNumeric(formatArgs) ? formatArgs : 2);
				}
			} break;
			default: {
				result = value;
			}
		}
		return result;
	};
   
	return function(string, data) {
		return string.replace(/{([^\s][^}]+[^\s]?)}/, function() {
			var args = Array.prototype.slice.call(arguments);
			args.unshift(data);
			return formatStringCallback.apply(null, args);
		});
	};
})();

var _phpFunctions = {};
self.phpFunction = function(name, callback) {
	var split = name.split(/[\.\/]/);
	var func = split[1];
	if (typeof func != "string") {
		throw new Error("Unknown function " + func + ".");
	}
	if (_phpFunctions[func]) {
		if (typeof callback == "function") {
			callback(null, _phpFunctions[func]);
		}
		return;
	}
	var https = require("https");
	name = split.join("/");
	var url = "https://raw.github.com/kvz/phpjs/master/functions/" + name + ".js";
	var body = "";
	var request = https.get(url, function(response) {
		if (response.statusCode != 200) {
			if (callback) {
				callback(new Error("Invalid request, code " + response.statusCode + "."));
			}
			return;
		}
		response.setEncoding("utf8");
		response.on("data", function(chunk) {
			body += chunk.toString("utf8");
		});
		response.on("end", function() {
			var vm = require("vm");
			vm.runInNewContext(body, _phpFunctions);
			if (_phpFunctions[func]) {
				if (typeof callback == "function") {
					callback(null, _phpFunctions[func]);
				}
				return;
			}
		});
	});
	request.on("error", function(e) {
		if (callback) callback(e);
	});
};


// https://github.com/unclechu/node-deep-extend/blob/master/index.js
self.deepExtend = function deepExtend() {
	if (arguments.length < 2) return arguments[0];
	var target = arguments[0];
	var args = Array.prototype.slice.call(arguments, 1);
	var key, val, src, clone;
	args.forEach(function (obj) {
		if (typeof obj !== 'object') return;
		for (key in obj) {
			if ( ! (key in obj)) continue;
			src = target[key];
			val = obj[key];
			if (val === target) continue;
			if (typeof val !== 'object' || val === null) {
				target[key] = val;
				continue;
			}
			if (typeof src !== 'object' || src === null) {
				clone = (Array.isArray(val)) ? [] : {};
				target[key] = deepExtend(clone, val);
				continue;
			}
			if (Array.isArray(val)) {
				clone = (Array.isArray(src)) ? src : [];
			} else {
				clone = (!Array.isArray(src)) ? src : {};
			}
			target[key] = deepExtend(clone, val);
		}
	});
	return target;
}


/**
 * http://en.wikipedia.org/wiki/Bit_field
 * A bit field is a common idiom used in computer programming to
 * compactly store a value as a short series of bits.
 */

self.setBit = function(bitMask, flag) {
	bitMask |= flag;
	return bitMask;
}

self.resetBit = function(bitMask, flag) {
	bitMask &= ~flag;
	return bitMask;
}

self.isSetBit = function(bitMask, flag) {
	return (bitMask & flag) != 0;
}

self.toggleBit = function(bitMask, flag) {
	bitMask ^= flag;
	return bitMask;
}

module.exports.d = d;
module.exports.inArray = inArray;
module.exports.isArray = isArray;
module.exports.insideCut = insideCut;
module.exports.exceptionHandler = exceptionHandler;
module.exports.getClassName = getClassName;
module.exports.varType = varType;

if (typeof global["d"] == "undefined") global["d"] = d;