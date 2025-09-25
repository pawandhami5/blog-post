// ABSTRACTION
// abstraction is about design, presenting only relevent operation and hiding unnecessary complexity
// define structure for subclasses

class Uploader {
  constructor() {
    if (new.target === Uploader) {
      throw new Error("cannot instanciate abstract class dirctly");
    }
  }

  async upload(file) {
    throw new Error("upload() must be implemented by subclass");
  }
}

class S3Uploaded extends Uploader {
  constructor() {
    super();
  }

  async upload(file) {
    console.log("s3 uploaded ");
  }
}

const upload = new Uploader();
upload();
