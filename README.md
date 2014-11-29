```

 _ _|                  |                                    |
   |    __ \     __|   __|    _` |    _` |    __|    _` |   __ \
   |    |   |  \__ \   |     (   |   (   |   |      (   |   |   |
 ___|  _|  _|  ____/  \__|  \__,_|  \__, |  _|     \__,_|  _.__/
                                    |___/
```

**Grab the good bits back from the insta-blob.**

## Install globally

```shell
 npm install -g instagrab
```

If at first you don't succeed, [`sudo` make me a sandwich](http://xkcd.com/149/).

## Grab images

```shell
 instagrab vO9hvHpxuH ulMpTsPaEn
```

Will dig out the the image for shortcode [`vO9hvHpxuH`](http://instagram.com/p/vO9hvHpxuH/) and bismirch your storage with a regular instangle like so

[![vO9hvHpxuH.l.jpg](http://photos-c.ak.instagram.com/hphotos-ak-xpf1/10785101_1585299268358338_793344509_n.jpg)](http://instagram.com/p/vO9hvHpxuH/)

## Grab urls

Rather curl and pipe your own bits? No worries.

```shell

 instagrab --url ulMpTsPaEn
 http://photos-a.ak.instagram.com/hphotos-ak-xfp1/10727611_525504890919008_1579977286_n.jpg

 curl $(instagrab --url ulMpTsPaEn) > whizzo-jnr.jpg
```

[![whizzo-jnr.jpg](http://photos-a.ak.instagram.com/hphotos-ak-xfp1/10727611_525504890919008_1579977286_n.jpg
)](http://instagram.com/p/ulMpTsPaEn/)

## Grab many & choose your size

Specify multiple shortcodes for multi grabbing. Specify a `--size` for `t`humbnail, `m`edium or `l`arge images.

```shell
 instagrab vyrjLFJxmE vyp4M_JxqH vyneyApxpq --size t
```
[![](http://photos-h.ak.instagram.com/hphotos-ak-xap1/10808721_755476677874383_1323943785_s.jpg)](http://instagram.com/p/vyrjLFJxmE)
[![](http://photos-e.ak.instagram.com/hphotos-ak-xaf1/10831752_882718638439596_1982541182_s.jpg)](http://instagram.com/p/vyp4M_JxqH)
[![](http://scontent-a-lhr.cdninstagram.com/hphotos-xap1/l/t51.2885-15/927756_586124134849427_1906523545_s.jpg)](http://instagram.com/p/vyneyApxpq)

Photos: @alanshaw & @andrew Jnr & @olizilla
