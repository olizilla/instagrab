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
 instagrab vO9hvHpxuH
```

Will dig out the the image for shortcode `vO9hvHpxuH` and bismirch your storage with a regular instangle like so

![vO9hvHpxuH.l.jpg](http://photos-c.ak.instagram.com/hphotos-ak-xpf1/10785101_1585299268358338_793344509_n.jpg)

## Grab urls

Rather curl and pipe your own bits? No worries.

```shell

 $ instagrab --url ulMpTsPaEn
 http://photos-a.ak.instagram.com/hphotos-ak-xfp1/10727611_525504890919008_1579977286_n.jpg

 $ curl $(instagrab --url ulMpTsPaEn) > whizzo-jnr.jpg
```

![whizzo-jnr.jpg](http://photos-a.ak.instagram.com/hphotos-ak-xfp1/10727611_525504890919008_1579977286_n.jpg
)
