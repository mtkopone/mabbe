`mabbe` is (yet another) Haskell:Maybe and Scala:Option for JS

... works in node.js and on the browser.

[![Build Status](https://travis-ci.org/mtkopone/mabbe.png?branch=master)](https://travis-ci.org/mtkopone/mabbe)

[Download](https://raw.github.com/mtkopone/mabbe/master/mabbe.js) or `npm install mabbe`

## Example

```javascript
  var option = require('mabbe')

  var parsedQuery = option(req.param.id)
    .map(function(q) { return { _id: new ObjectId(q) }})
    .orElse(option(req.query.query).map(JSON.parse))
    .getOrElse({})
```

## API

### Construct

```javascript
  var option = require('mabbe')

  option('pow')         // Some('pow')
  option.some('pow')    // Some('pow')
  option(0)             // Some(0)

  option(undefined)     // None
  option(null)          // None
  option.none           // None
```

### Use

<table>
  <tr><td><code>.exists // true || false</code></td></tr>
  <tr><td><code>.val // value || undefined</code></td></tr>
  <tr><td><code>.get() // value || undefined</code></td></tr>
  <tr><td><code>.map(fn)</code></td></tr>
  <tr><td><code>.filter(fn)</code></td></tr>
  <tr><td><code>.flatMap(fn)</code></td></tr>
  <tr><td><code>.pluck(string)</code> e.g. mabbe({ a: { b: 'c' } } }).pluck('a') or .pluck('a.b')</td></tr>
  <tr><td><code>.each(fn)</code></td></tr>
  <tr><td><code>.getOrElse(defaultValue)</code></td></tr>
  <tr><td><code>.getOrFail(errorMessage)</code></td></tr>
  <tr><td><code>.ortElse(fn || mabbe)</code></td></tr>
  <tr><td><code>.either(fnForSome, fnForNone)</code></td></tr>
  <tr><td><code>.toArray() // [value] || undefined</code></td></tr>
</table>

For more usage, see [tests](https://github.com/mtkopone/mabbe/blob/master/test/mabbe-test.js)

Enjoy,


