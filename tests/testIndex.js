/* Tests for ../index.js */
const instagrab = require('../index.js')
const test = require('tape')
const valid = require('valid-url')
const crypto = require('crypto')
const concat = require('concat-stream')

test('API URL for shortcode', function (t) {
  t.plan(4)

  var url = instagrab.apiUrl('vO9hvHpxuH', 'l')
  t.equal(url, 'http://instagram.com/p/vO9hvHpxuH/media/?size=l')

  url = instagrab.apiUrl('woohaa', 's')
  t.equal(url, 'http://instagram.com/p/woohaa/media/?size=s')

  url = instagrab.apiUrl('largeAllTheThings')
  t.equal(url, 'http://instagram.com/p/largeAllTheThings/media/?size=l')

  t.throws(instagrab.apiUrl)
})

test('Filename for shortcode', function (t) {
  t.plan(4)

  var filename = instagrab.filename('vO9hvHpxuH', 'l')
  t.equal(filename, 'vO9hvHpxuH.l.jpg')

  filename = instagrab.filename('woohaa', 's')
  t.equal(filename, 'woohaa.s.jpg')

  filename = instagrab.filename('defaultIsLarge')
  t.equal(filename, 'defaultIsLarge.l.jpg')

  t.throws(instagrab.filename)
})

test('Resolve URL for shortcode', function (t) {
  t.plan(2)
  var url = instagrab.url('vO9hvHpxuH', 'l', function (err, url) {
    t.false(err, err)
    t.ok(valid.isUri(url), 'should be a valid url')
  })
})

test('Grab image for shortcode', function (t) {
  t.plan(1)

  var source = instagrab('vO9hvHpxuH', 'l')
  source.on('error', t.error)

  var hash = crypto.createHash('sha1')
  hash.setEncoding('hex')

  source
    .pipe(hash)
    .pipe(concat(function (shasum) {
      t.equals(shasum, '75e3828d918496b268155ad6ba5290b391aad371', 'expected file hash to match')
  }))
})
