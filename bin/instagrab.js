#!/usr/bin/env node

const instagrab = require('../index.js')
const multiline = require('multiline')
const opts = require('nomnom')
  .script("instagrab")
  .options({
    shortcode: {
      required:true,
      position: 0,
      help: "1 or more instagram shortcodes to grab",
      list: true
    },
    url: {
      flag:true,
      help: 'just print the url for the shortcode'
    },
    size: {
      abbr: 's',
      choices: ['t', 'm', 'l'],
      help: 'image size: (t)humb, (m)edium, (l)arge',
      'default':'l'
    },
    quiet: {
      abbr: 'q',
      help: 'don\'t fill mah logs with junk ya kids.',
      flag: true
    }
  })
  .nocolors()
  .nom()

if (opts.url) return instagrab.resolveUrl(opts.shortcode, opts.size, function (err, url) {
  console.log(err || url)
})

if (typeof opts.shortcode === 'String') {
  opts.shortcode = [opts.shortcode]
}

if (!opts.quiet) console.log(multiline(function(){/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

*/}))

opts.shortcode.forEach(function (shortcode) {
  instagrab(shortcode, opts.size, function (err, res){
    if(err) return console.error(err.message || err)
    if (!opts.quiet) console.log('grabbed: ', instagrab.filename(shortcode, opts.size))
  })
})

