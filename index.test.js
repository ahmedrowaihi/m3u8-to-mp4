var fs = require("fs");

var m3u8ToMp4 = require("./index.js");
var converter = new m3u8ToMp4();

var demoUrl = "https://content.jwplatform.com/manifests/yp34SRmf.m3u8";

(async function () {
  try {
    console.log("Starting test...");

    await converter
      .setInputFile(demoUrl)
      .setOutputFile("dummy.mp4")
      .start({
        onStart: () => console.log('on start'),
        onEnd: () => console.log('on end'),
        onError: error => console.error(`on error: ${error.message}`),
        onProgress: () => console.log('on progress'),
        onStderr: (stderrLine) => console.log(`on stderr: ${stderrLine}`),
        onCodecData: () => console.log('on codecdata'),
      });

    fs.unlinkSync("dummy.mp4");

    console.log("Success!");
  } catch (error) {
    throw new Error("Oops, an error occurred!", error);
  }
})();
