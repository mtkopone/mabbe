var mabbe = function(x) {
  return new Mabbe(x)
}

mabbe.some = mabbe
mabbe.none = mabbe(undefined)

function Mabbe(x) {
  this.exists = (x !== undefined && x !== null)

  // Option A -> (A -> B) -> Option B
  this.map = function(fn) {
    return this.exists ? mabbe(resolve(fn, x)) : mabbe.none
  }

  // Option A -> (A -> Boolean) -> Option A
  this.filter = function(fn) {
    return this.exists && resolve(fn, x) ? this : mabbe.none
  }

  // Option A -> (A -> Option B) -> Option B
  this.flatMap = function(fn) {
    return this.exists ? resolve(fn, x) : mabbe.none
  }

  // Option A -> String -> Option B
  this.pluck = function(keys) {
    if (!this.exists) return mabbe.none
    if (typeof(keys) === 'string') keys = keys.split('.')
    var key = keys.shift()
    if (key) {
      return mabbe(x[key]).pluck(keys)
    } else {
      return mabbe(x)
    }
  }

  // Option A -> (A -> Unit) -> Option A
  this.each = function(fn) {
    if (this.exists) { fn(x) }
    return this
  }

  // Option A -> A -> A
  this.getOrElse = function(y) {
    return this.exists ? x : resolve(y)
  }

  // Option A -> err --> (A | throw err)
  this.getOrFail = function(y) {
    if (!this.exists) throw new Error(y)
    return x
  }

  // Option A -> Option A -> Option A
  this.orElse = function(y) {
    return this.exists ? this : resolve(y)
  }

  // Option A -> fn -> fn -> Option A
  this.either = function(existsFn, doesntExistFn) {
    this.exists ? existsFn(x) : doesntExistFn()
    return this
  }

  // Option A -> [A?]
  this.toArray = function() {
    return this.exists ? [x] : []
  }

  // Option A -> A
  this.get = function() {
    return x
  }

  // Option A -> A
  this.val = x

  function resolve(param, arg) {
    return (typeof param === 'function') ? param(arg) : param
  }
}

if (!this.navigator) {
  module.exports = mabbe
}
