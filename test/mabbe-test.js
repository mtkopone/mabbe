var assert = require('chai').assert,
    option = require('../mabbe')

describe('mabbe', function() {
  var some = option.some('x')
  var none = option.none

  it('existence', function() {
    assert.ok(some.exists)
    assert.isFalse(none.exists)
    assert.ok(option(1).exists)
    assert.ok(option(false).exists)
    assert.ok(option(0).exists)
    assert.ok(option('').exists)
    assert.ok(option({}).exists)
    assert.isFalse(option(undefined).exists)
    assert.isFalse(option(null).exists)
  })
  
  it('map()', function() {
    assert.equal(some.map(function(x) { return x+x }).val, 'xx')
    assert.isUndefined(none.map(function(x) { return x+x }).val)
  })

  it('filter()', function() {
    assert.equal(some.filter(function(x) { return x === x }).val, 'x')
    assert.isUndefined(some.filter(function(x) { return x !== x }).val)
    assert.isUndefined(none.filter(function(x) { return true }).val)    
  })
  
  it('flatMap()', function() {
    assert.equal(some.flatMap(function(x) { return option(x+x) }).val, 'xx')
    assert.isUndefined(some.flatMap(function(x) { return none }).val)
    assert.isUndefined(none.flatMap(function(x) { return x+x }).val)
  })

  it('pluck()', function() {
    assert.equal(option({ key:'value' }).pluck('key').val, 'value')
    assert.isFalse(option({ key:'value' }).pluck('xxx').exists)

    var deep = { a: { b: { c:'pow', arr:['0', 'pow'] } } }
    assert.equal(option(deep).pluck('a.b.c').val, 'pow')
    assert.equal(option(deep).pluck('a.b.arr.1').val, 'pow')
    assert.equal(option(deep).pluck(['a','b','c']).val, 'pow')
    assert.isFalse(option(deep).pluck('a.z').exists)
  })

  it('each()', function(done) {
    none.each(function() {
      assert.fail()
    })
    some.each(function(x) {
      assert.equal(x, 'x')
      done()
    })
  })

  it('getOrElse()', function() {
    assert.equal(some.getOrElse('err'), 'x')
    assert.equal(none.getOrElse('pow'), 'pow')
  })

  it('getOrFail(err)', function() {
    assert.equal(some.getOrFail('err'), 'x')
    assert.throw(function() { return none.getOrFail('fail') }, /fail/)
  })

  it('orElse()', function() {
    some.orElse(function() { assert.fail() })
    assert.equal(none.orElse(option('pow')).val, 'pow')
    assert.equal(none.orElse(function() { return option('pow') }).val, 'pow')
  })

  it('some.either()', function(done) {
    some.either(function() { done() }, function() { done('fail') })
  })

  it('none.either()', function(done) {
    none.either(function() { done('fail') }, function() { done() })
  })
  
  it('toArray()', function() {
    assert.deepEqual(option('A').toArray(), ['A'])
    assert.deepEqual(option().toArray(), [])
  })
  
  it('get() and val', function() {
    assert.equal(some.val, 'x')
    assert.equal(some.get(), 'x')
    assert.isUndefined(none.val, 'x')
    assert.isUndefined(none.get(), 'x')
  })

})