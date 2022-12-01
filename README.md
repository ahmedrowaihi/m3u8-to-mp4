# m3u8-to-mp4 - Convert m3u8 to mp4

This module is forked from [m3u8-to-mp4](
  https://github.com/furkaninanc/m3u8-to-mp4) created by [furkaninanc](https://github.com/furkaninanc).

it's intended to helps you convert an M3U8 file to an MP4 file easily using ffmpeg/node.js

### This Fork Supports passing headers for remote m3u8 file fetching 
## Installation

This module can be installed via npm. You will also need to install [ffmpeg](https://ffmpeg.org/) for this module to work:

```sh
$ sudo apt install ffmpeg
$ npm install --save m3u8-to-mp4
```

**Windows** users, you can download ffmpeg from [here](https://ffmpeg.org/download.html#build-windows)

**Mac** users, you can download ffmpeg from [here](https://ffmpeg.org/download.html#build-mac)

## Usage

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();
```

### Functions

#### converter.setHeaders(headers) - optional

- **headers:** An object containing the headers to be used in the request to the M3U8 file.

#### converter.setInputFile(filename)

- **filename:** M3U8 file path. You can use remote URL

#### converter.setOutputFile(filename)

- **filename:** Output file path. Has to be local :)

#### converter.start()

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();

(async function() {
  await converter
    .setInputFile("https://<URL_OF_THE_WEBSITE>/<PATH_TO_THE_M3U8_FILE>")
    .setOutputFile("dummy.mp4")
    .start();

  console.log("File converted");
})();
```

if you want to use headers, you can use `setHeaders` function.

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();
 (async function() {
  await converter
    .setInputFile("https://<URL_OF_THE_WEBSITE>/<PATH_TO_THE_M3U8_FILE>")
    .setOutputFile("dummy.mp4")
    .setHeaders({
      "Authorization": "Bearer XXXXXX",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36",
})
    .start();

  console.log("File converted");

 )()
```

or if you want to use it with _.then()_ instead of async/await:

```js
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();

converter
  .setInputFile("https://<URL_OF_THE_WEBSITE>/<PATH_TO_THE_M3U8_FILE>")
  .setOutputFile("dummy.mp4")
  .start()
  .then(() => {
    console.log("File converted");
  });
```
