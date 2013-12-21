# numgen

[![NPM version](https://badge.fury.io/js/numgen.png)](http://badge.fury.io/js/numgen)
[![Build Status](https://travis-ci.org/gamtiq/numgen.png)](https://travis-ci.org/gamtiq/numgen)

Creates objects that generate number sequences.

**Disclaimer:** this package does not have anything common with ECMAScript 6 generators nor with `yield` operator.

## Installation

### Node

    npm install numgen

### [Component](http://component.io)

    component install gamtiq/numgen

### [Jam](http://jamjs.org)

    jam install numgen

### [Bower](http://bower.io)

    bower install numgen

### AMD, &lt;script&gt;

Use `dist/numgen.js` or `dist/numgen.min.js` (minified version).

## Usage

### Node, Component

```js
var NumGen = require("numgen");
```

### Jam

```js
require(["numgen"], function(NumGen) {
    ...
});
```

### AMD

```js
define(["path/to/dist/numgen.js"], function(NumGen) {
    ...
});
```

### Bower, &lt;script&gt;

```html
<!-- Use bower_components/numgen/dist/numgen.js if the library was installed by Bower -->
<script type="text/javascript" src="path/to/dist/numgen.js"></script>
<script type="text/javascript">
    // numgen is available via NumGen field of window object
    ...
</script>
```

### Example

```js
var seq = new NumGen({
                        startValue: 3,
                        factor: 4,
                        valueChange: function(data) {
                            return data.index > 1 ? data.current : data.value;
                        }
                    });
console.log("Geometric progression:");
for (var nI = 1; nI < 11; nI++) {
    console.log("#", nI, " - ", seq.getNext());
}
```

See `test/numgen.js` for additional examples.

## API

See `doc` folder.

## License

MIT
