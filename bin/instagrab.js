#!/usr/bin/env node

const instagrab = require('../index.js')
const multiline = require('multiline')
const opts = require('nomnom')
  .script("instagrab")
  .options({
    shortcode: {
      required:true,
      position: 0,
      help: "instagram shortcodes",
      list: true
    },
    size: {
      abbr: 's',
      choices: ['s', 'm', 'l'],
      help: 'image size',
      'default':'l'
    },
    url: {
      flag:true,
      help: 'just pring the url for the shortcode'
    },
    silent: {
      abbr: 's',
      help: 'don\'t be logging',
      flag: true
    }
  })
  .parse()

if (!opts.silent) console.log(multiline(function(){/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

*/}))

if (opts.url) return console.log(instagrab.url(opts.shortcode, opts.size))

if (typeof opts.shortcode === 'String') {
  opts.shortcode = [opts.shortcode]
}
opts.shortcode.forEach(function (shortcode) {
  instagrab(shortcode, opts.size, function (err, res){
    if(err) return console.error(err.message || err)
    if (!opts.silent) console.log('grabbed: ', instagrab.filename(shortcode, opts.size))
  })
})

