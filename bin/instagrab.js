#!/usr/bin/env node

/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

        CLI for grabbing the good bits back from the insta-blob

  Install it as a command line tool with the `global` flag

```shell
  npm install -g instagrab
```

  Grab the image for a shortcode & save as a `.jpg` to the current directory

```shell
  instagrab vO9hvHpxuH
```

  Find out the URL for a shortcode

```shell
  instagrab --url ulMpTsPaEn
  http://photos-a.ak.instagram.com/hphotos-ak-xfp1/10727611_525504890919008_1579977286_n.jpg

  # Pipe it yourself if you prefer
  curl $(instagrab --url ulMpTsPaEn) > whizzo-jnr.jpg
```

  2014-11-27 - ISC License
  From @olizilla with <3
  For Mum. xx
*/

const instagrab = require('../index.js')
const multiline = require('multiline')
const path = require('path')
const fs = require('fs')

// deal with command line args
const opts =
  require('nomnom')
  .script("instagrab")
  .options({
    shortcode: {
      required: true,
      position: 0,
      help: "1 or more instagram shortcodes to grab",
      list: true
    },
    url: {
      flag: true,
      help: 'just print the url for the shortcode'
    },
    size: {
      abbr: 's',
      choices: ['t', 'm', 'l'],
      help: 'image size: (t)humb, (m)edium, (l)arge',
      'default': 'l'
    },
    quiet: {
      abbr: 'q',
      help: 'don\'t fill mah logs with junk ya kids.',
      flag: true
    }
  })
  .nocolors()
  .nom()

if (typeof opts.shortcode === 'String') {
  opts.shortcode = [opts.shortcode]
}

if (opts.url) {
  return grabUrls(opts)
} else {
  return grabImages(opts)
}

// Log out the urls.
function grabUrls (opts) {
  opts.shortcode.forEach(function (shortcode) {
    instagrab.url(shortcode, opts.size, function (err, url) {
      console.log(err || url)
    })
  })
}

// otherwise, start the fanfare and save the images
function grabImages (opts) {
  if (!opts.quiet) console.log(multiline(function () {/*

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/

*/}))

  opts.shortcode.forEach(function (shortcode) {
    // set up the sink
    var filename = instagrab.filename(shortcode, opts.size)
    var filepath = path.join(process.cwd(), filename)
    var toFile = fs.createWriteStream(filepath)
    toFile.on('error', onSaveError(shortcode))
    toFile.on('finish', function onSaved () {
      if (this.quiet) return;
      console.log('grabbed: ', filename)
    })

    // grab the bits
    return instagrab(shortcode, opts.size)
      .on('error', onGrabError(shortcode))
      .pipe(toFile)
  })
}

function onGrabError (shortcode) {
  return function (err) {
    console.error('Failed to grab', shortcode)
    console.error(err.message || err)
    process.exit(1)
  }
}

function onSaveError (shortcode) {
  return function (err) {
    console.error('Failed to save', shortcode)
    console.error(err.message || err)
    process.exit(2)
  }
}


