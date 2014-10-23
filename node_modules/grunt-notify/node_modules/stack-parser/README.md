Error stack parser for node.js.

Installation
------------

```
npm install stack-parser
```

Example
-------

```javascript
var stackParser = require('stack-parser');

var items = stackParser.parse((new Error).stack);

items.forEach(function(item) {
	console.log(item.format());
});

// Use custom formatting.

items.forEach(function(item) {
	console.log(item.format('%what (%file, line: %line, column: %column)'));
});

// Use custom short formatting.

items.forEach(function(item) {
	console.log(item.format('%w (%f, line: %l, column: %c)'));
});

// Get a "current stack", synonym for "stackParser.parse((new Error).stack);".

items = stackParser.here();
```

License
-------
MIT
