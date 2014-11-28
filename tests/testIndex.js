/* Tests for ../index.js */
var instagrab = require('../index.js')
var test = require('tape')
var valid = require('valid-url')
var crypto = require('crypto');

test('API URL for shortcode', function (t) {
  t.plan(4)

  var url = instagrab.apiUrl('vO9hvHpxuH', 'l')
  t.equal('http://instagram.com/p/vO9hvHpxuH/media/?size=l', url)

  url = instagrab.apiUrl('woohaa', 's')
  t.equal('http://instagram.com/p/woohaa/media/?size=s', url)

  url = instagrab.apiUrl('largeAllTheThings')
  t.equal('http://instagram.com/p/largeAllTheThings/media/?size=l', url)

  t.throws(instagrab.apiUrl)
})

test('Filename for shortcode', function (t) {
  t.plan(4)

  var filename = instagrab.filename('vO9hvHpxuH', 'l')
  t.equal('vO9hvHpxuH.l.jpg', filename)

  filename = instagrab.filename('woohaa', 's')
  t.equal('woohaa.s.jpg', filename)

  filename = instagrab.filename('defaultIsLarge')
  t.equal('defaultIsLarge.l.jpg', filename)

  t.throws(instagrab.filename)
})

test('Resolved URL for shortcode', function (t) {
  t.plan(2)
  var url = instagrab.url('vO9hvHpxuH', 'l', function (err, url) {
    t.false(err)
    t.ok(valid.isUri(url), url + ' should be a valid url')
  })
})

test('Grab image for shortcode', function (t) {
  t.plan(1)

  var hash = crypto.createHash('sha1');
  hash.setEncoding('hex');

  instagrab('vO9hvHpxuH', 'l')
    .on('error', function (err) {t.error(err)})
    .on('end', function(err) {
      hash.end();
      t.equals('75e3828d918496b268155ad6ba5290b391aad371', hash.read(), 'expected file hash to match')
    })
    //var photo = path.join(process.cwd(), instagrab.filename('vO9hvHpxuH','l'))
})
