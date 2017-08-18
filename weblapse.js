#!/usr/bin/env node

var Nightmare = require('nightmare'),
    moment = require('moment');

var argv = require('minimist')(process.argv.slice(2))

const url = argv._[0];

console.log(`Making timelapse of ${url} (first nameless command line argument)`);

const period = argv.period || 60 * 1000;
console.log(`Capturing one frame every ${period} milliseconds (control with --period)`);

const delay = argv.delay || 3000;
console.log(`Screenshot will be taken ${delay} milliseconds after page load (control with --delay)`);

const count = argv.count || 3000;
console.log(`Will quit after capturing ${count} frames (control with --count)`);

const width = argv.width || 1536;
const height = argv.height || 1536;
console.log(`Screenshot will be ${width} x ${height} (control with --width and --height)`);

const evalSource = argv.eval || '/* no-op */';
const _eval = new Function(evalSource);
console.log(`Will evaluate ${evalSource} in page context before each capture (pass JavaScript expression with --eval)`);

const nightmare = new Nightmare({show: false});
let numberOfFramesCaptured = 0;

function captureFrame() {
  const filename = moment().toISOString()+'.png';
  nightmare
    // resize viewport to target later so window resize listeners update
    // after evaluate() possibly changes DOM.
    // not a perfect solution.. could lead to unexpected gotchas...
    .viewport(Math.round(width/2), Math.round(height/2))
    .goto(url)
    .evaluate(_eval)
    .viewport(width, height)
    .wait(delay)
    .screenshot(filename)
    .run(() => {
        console.log('saved ' + filename);
          if(++numberOfFramesCaptured >= count) {
            console.error(`Captured ${numberOfFramesCaptured} frames. Requested to capture that many, so quitting.`);
            process.exit(0);
        }
    });

}


// every minute
setInterval(captureFrame, period);
// also immediately so it's easier to debug
captureFrame();
