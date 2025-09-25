const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

class VideoService {
  #s3;
  constructor() {
    // initialize client
    this.#s3 = new S3Client({
      region: "ap-southeast-2",
      credentials: {
        accessKeyId: "AKIATROTF47YH2VI63CF",
        secretAccessKey: "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",
      },
    });
  }

  // upload file to s3
  async #uploadToS3(fileName, binary) {
    return await this.#s3.send(
      new PutObjectCommand({
        Bucket: "intellireferee-bucket",
        Key: fileName,
        Body: binary,
      })
    );
  }

  //   get object and generate signedurl
  async #generateSignedUrl(filename) {
    const command = new GetObjectCommand({
      Bucket: "intellireferee-bucket",
      Key: filename,
    });
    const url = await getSignedUrl(this.#s3, command);
    console.log("signedurl --->", url);
    return url;
  }

  async videoProcessing(fileName, binary) {
    await this.#uploadToS3(fileName, binary);
    return "uploaded to s3";
  }

  async getMediaUrl(filename) {
    const url = await this.#generateSignedUrl(filename);
    return url;
  }
}

module.exports = new VideoService();
