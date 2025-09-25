// ENCAPSULATION
// 1. Encapsulation is about control, you decide which method or variable are hidden or which are exposed
// wrapping related data and methods into a single unit and controlling how the data is accessed or modified from outside.

const { S3Client } = require("@aws-sdk/client-s3");

class VideoService {
  #s3; //private variable
  constructor() {
    this.#s3 = new S3Client({
      region: "asia-b",
      credentials: {
        accessKeyId: "",
        secretAccessKey,
      },
    });
  }

  // private methods
  async #ffmpegProcess(file) {
    // run ffmpeg commands
  }

  async #uploadToS3() {
    // upload to s3 logic
  }

  // expose to acess outside
  async videoProcessing(inputFile) {
    console.log("procces", inputFile);
    const file = await this.#ffmpegProcess(inputFile);
    await this.#uploadToS3(file);
  }
}

const service = new VideoService();
console.log(service.videoProcessing("hello"));
