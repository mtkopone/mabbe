`mabbe` is (yet another) Haskell:Maybe and Scala:Option for JS

... works in node.js and on the browser.

[![Build Status](https://travis-ci.org/mtkopone/mabbe.png?branch=master)](https://travis-ci.org/mtkopone/mabbe)

[Download](https://raw.github.com/mtkopone/mabbe/master/mabbe.js)

## Example

```
  var option = require('mabbe')

  ...

  var parsedQuery = option(req.param.id)
    .map(function(q) { return { _id: new ObjectId(q) }})
    .orElse(option(req.query.query).map(JSON.parse))
    .getOrElse({})
```

## API

Coming really freakin' soon...

### Construct

```
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
  <tr>
    <td>`.map(fn)`</td>
    <td>
      <div>`option('x').map(function(x) { return x + x }) // ==> Some('xx')`</div>
      <div>`option.none.map(function(x) { return x + x }) // ==> None`</div>
    <td>
  </tr>
</table>

Moar coming soon...

Enjoy,


