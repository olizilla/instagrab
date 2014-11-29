/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

                    Grab the good bits back from the insta-blob

  A super simple wrapper around the redirect based API.

```shell
  # Example
  http://instagram.com/p/svEQvkseG4/media/?size=l`

  # Pattern
  http://instagram.com/p/[shortcode]/media/?size=[t,m,l]
```

  @param **shortcode**, String, the id of the instagram picture
  @param **size**, String, ['t','m','l'] thumbnail, medium, large.
  @see: http://instagram.com/developer/embedding/#media_redirect

  2014-11-27 - ISC License
  From @olizilla with <3
  For Mum. xx
*/

const url = require('url')
const util = require('util')
const http = require('http')
const request = require('request')

// Build the api url from it's ingredients
function apiUrlFor (shortcode, size) {
  if (!shortcode) throw new Error('shortcode parameter is required')
  size = size || 'l'

  var api = 'http://instagram.com/p/%s/media/?size=%s'
  return util.format(api, shortcode, size)
}

// Make up a useful filename
function filenameFor(shortcode, size) {
  if (!shortcode) throw new Error('shortcode parameter is required')
  size = size || 'l'

  return [shortcode, size, 'jpg'].join('.')
}

// Follow the redirects, return the pipeable response
function grab (shortcode, size) {
  // turn on the hose
  return request.get(apiUrlFor(shortcode, size))
}

// Grab the location header from the initial response.
function resolvedUrlFor (shortcode, size, cb) {
  if (typeof size === 'function') {
    cb = size
    size = 'l'
  }
  cb = cb || function () {}

  var apiUrl = apiUrlFor(shortcode, size)

  var opts = url.parse(apiUrl)
  // http requests use the global Agent (connection pool) and defaults to `Connection: keep-alive`
  // This causes the test suite to hang, so we explicitly set it to close.
  // Alternatively, set `opts.agent: false` to opt out of connection pool and default to `Connection: close`
  // see: http://nodejs.org/api/http.html#http_http_request_options_callback
  opts.headers = {
    Connection:'close'
  }

  http.get(opts, function (res) {
    var url = res && res.headers && res.headers.location
    if (!url) return cb(new Error('Couldn\'t get url; no `location` header on response'), res)
    cb(null, url)

  }).on('error', cb)
}

module.exports = grab
module.exports.url = resolvedUrlFor
module.exports.apiUrl = apiUrlFor
module.exports.filename = filenameFor
