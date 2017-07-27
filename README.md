# weblapse
Record time lapse films of URLs

### Install

```
$ yarn global add weblapse

# or
$ npm install -g weblapse
```

### Use

```
$ weblapse https://maps.google.com
Making timelapse of https://maps.google.com (first nameless command line argument)
Capturing one frame every 60000 milliseconds (control with --period)
Screenshot will be taken 3000 milliseconds after page load (control with --delay)
Screenshot will be 1536 x 1536 (control with --width and --height)
Will evaluate /* no-op */ in page context before each capture (pass JavaScript expression with --eval)
saved 2017-07-27T18:40:09.576Z.png
saved 2017-07-27T18:41:09.577Z.png
saved 2017-07-27T18:42:09.583Z.png
saved 2017-07-27T18:43:09.596Z.png
saved 2017-07-27T18:44:09.604Z.png
saved 2017-07-27T18:45:09.618Z.png
saved 2017-07-27T18:46:09.635Z.png
saved 2017-07-27T18:47:09.646Z.png

etc....

^C
$
```
