`mabbe` is (yet another) Haskell:Maybe and Scala:Option for JS

... works in node.js and on the browser.

(Download)[https://raw.github.com/mtkopone/mabbe/master/mabbe.js]

## Example

```
  var option = require('mabbe')

  ...

  var idOrSomeOtherQuery = option(req.param.id)
    .map(function(q) { return { _id: new ObjectId(q) }})
    .orElse(option(req.query.query).map(JSON.parse))
    .get()
```

## API

Coming really freakin' soon...


Enjoy,


