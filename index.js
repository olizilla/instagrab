/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

                    Grab the good bits back from the insta-blob.


  ```shell
  # Pattern
  http://instagram.com/p/[shortcode]/media/?size=[t,m,l]

  # Example
  http://instagram.com/p/svEQvkseG4/media/?size=l`
  ```

  @param shortcode, String, the id of the instagram picture
  @param size, String, ['t','m','l'] thumbnail, medium, large.

  @see: http://instagram.com/developer/embedding/#media_redirect
*/

const util = require('util')
const request = require('superagent')
const path = require('path')
const fs = require('fs')

function urlFor (shortcode, size) {
  if (!shortcode) throw new Error('shortcode parameter is required')
  size = size || 'l'

  var api = 'http://instagram.com/p/%s/media/?size=%s'
  return util.format(api, shortcode, size)
}

function filenameFor(shortcode, size) {
  if (!shortcode) throw new Error('shortcode parameter is required')
  size = size || 'l'

  return [shortcode, size, 'jpg'].join('.')
}

function resolvedUrlFor (shortcode, size, cb) {
  if (typeof size === 'function') {
    cb = size
    size = 'l'
  }
  cb = cb || function () {}

  var url = urlFor(shortcode, size)
  request
    .get(url)
    .redirects(0)
    .end(function (err, res) {
      if (!res.header.location) return cb(res);
      cb(null, res.header.location)
    })
}

function grab (shortcode, size, cb) {
  if (typeof size === 'function') {
    cb = size
    size = 'l'
  }
  cb = cb || function () {}

  // set up the sink
  var filepath = path.join(process.cwd(),  filenameFor(shortcode, size))
  var toFile = fs.createWriteStream(filepath)
  toFile.on('finish', cb)

  // turn on the hose
  request
    .get(urlFor(shortcode, size))
    .end(function(err, res) {
      // why .pipe no work?
      if (err) return cb(err, res)
      if (res.error) return cb(res.error, res)
      toFile.write(res.body, cb)
    })
}

module.exports = grab
module.exports.url = urlFor
module.exports.filename = filenameFor
module.exports.resolveUrl = resolvedUrlFor
