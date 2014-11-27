var instagrab = require('../index.js')
var test = require('tape')
var path = require('path')
var valid = require('valid-url')
var checksum = require('checksum')

test('url for shortcode', function (t) {
  t.plan(4)

  var url = instagrab.url('vO9hvHpxuH', 'l')
  t.equal('http://instagram.com/p/vO9hvHpxuH/media/?size=l', url)

  url = instagrab.url('woohaa', 's')
  t.equal('http://instagram.com/p/woohaa/media/?size=s', url)

  url = instagrab.url('largeAllTheThings')
  t.equal('http://instagram.com/p/largeAllTheThings/media/?size=l', url)

  t.throws(instagrab.url)
})

test('filename for shortcode', function (t) {
  t.plan(4)

  var filename = instagrab.filename('vO9hvHpxuH', 'l')
  t.equal('vO9hvHpxuH.l.jpg', filename)

  filename = instagrab.filename('woohaa', 's')
  t.equal('woohaa.s.jpg', filename)

  filename = instagrab.filename('defaultIsLarge')
  t.equal('defaultIsLarge.l.jpg', filename)

  t.throws(instagrab.filename)
})

test('resolvedUrl for shortcode', function (t) {
  t.plan(2)
  var url = instagrab.resolveUrl('vO9hvHpxuH', 'l', function (err, url) {
    t.false(err)
    t.ok(valid.isUri(url), url + ' should be a valid url')
  })
})

test('grab image for shortcode', function (t) {
  t.plan(2)
  instagrab('vO9hvHpxuH', 'l', function (err, url) {
    t.false(err)
    var photo = path.join(process.cwd(), instagrab.filename('vO9hvHpxuH','l'))
    checksum.file(photo, function (err, sha1) {
      t.equals('75e3828d918496b268155ad6ba5290b391aad371', sha1, 'expected file hash to match')
    })
  })
})
