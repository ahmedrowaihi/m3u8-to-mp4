/**
 * @description M3U8 to MP4 Converter
 * @author Ahmed Rowaihi
 * @version 1.0.0
 */

let ffmpeg = require("fluent-ffmpeg");

/**
 * A class to convert M3U8 to MP4
 * @class
 */
class m3u8ToMp4Converter {
  /**
   * Sets the input file
   * @param {String} filename M3U8 file path. You can use remote URL
   * @returns {Function}
   */
  setInputFile(filename) {
    if (!filename) throw new Error("You must specify the M3U8 file address");
    this.M3U8_FILE = filename;

    return this;
  }

  /**
   * Sets the output file
   * @param {String} filename Output file path. Has to be local :)
   * @returns {Function}
   */
  setOutputFile(filename) {
    if (!filename) throw new Error("You must specify the file path and name");
    this.OUTPUT_FILE = filename;

    return this;
  }

  /**
   * Sets the headers for remote M3U8 file (optional)
   * @param {Object} headers Headers object
   * @returns {Function}
   * @example
   * {
   *  Authorization: Bearer AAAAAAAAAAAAAAAAAAAXXXXXXXX,
   *  "User-Agent":
   *  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:84.0) Gecko/20100101 Firefox/84.0",
   *  "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
   *  "Accept-Encoding": "gzip, deflate, br", TE: "trailers",
   * }
   */
  setHeaders(headers) {
    if (headers && typeof headers !== "object")
      throw new Error("Headers config must be an object");
    else
      this.headers = Object.keys(headers)
        .map((k) => k + ": " + headers[k])
        .join("\r\n");
    return this;
  }
  /**
   * Starts the process
   */
  start(options = {}) {
    // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#setting-event-handlers
    options = Object.assign(
      {
        onStart: () => {},
        onEnd: () => {},
        onError: (error) => {
          reject(new Error(error));
        },
        onProgress: () => {},
        onStderr: () => {},
        onCodecData: () => {},
      },
      options
    );

    return new Promise((resolve, reject) => {
      if (!this.M3U8_FILE || !this.OUTPUT_FILE) {
        reject(new Error("You must specify the input and the output files"));
        return;
      }

      ffmpeg(this.M3U8_FILE)
        .inputOption("-headers", this.headers ?? "")
        .on("start", options.onStart)
        .on("codecData", options.onCodecData)
        .on("progress", options.onProgress)
        .on("error", options.onError)
        .on("stderr", options.onStderr)
        .on("end", (...args) => {
          resolve();
          options.onEnd(...args);
        })
        .outputOptions("-c copy")
        .outputOptions("-bsf:a aac_adtstoasc")
        .output(this.OUTPUT_FILE)
        .run();
    });
  }
}

module.exports = m3u8ToMp4Converter;
