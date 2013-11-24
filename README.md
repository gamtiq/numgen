# numgen

Creates objects that generate number sequences.

**Disclaimer:** this package does not have anything common with ECMAScript 6 generators nor with `yield` operator.

## Installation

### Node

    npm install numgen

### [Component](http://component.io)

    component install gamtiq/numgen

### AMD, &lt;script&gt;

Use `dist/numgen.js` or `dist/numgen.min.js` (minified version).

## Usage

### Node, Component

```js
var NumGen = require("numgen");
```

### AMD

```js
define(["path/to/dist/numgen.js"], function(NumGen) {
    ...
});
```

### &lt;script&gt;

```html
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

## API

See `doc` folder.

## License

MIT
