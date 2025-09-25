const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  //   ListBucketsCommand,
  //   ListObjectsCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const client = new S3Client({
  region: "ap-southeast-2",
  credentials: {
    accessKeyId: "AKIATROTF47YH2VI63CF",
    secretAccessKey: "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",
  },
});

async function getBucketObject(key) {
  const command = new GetObjectCommand({
    Bucket: "intellireferee-bucket",
    Key: key,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

async function putBucketObject(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: "intellireferee-bucket",
    Key: key,
    ContentType: contentType,
  });
  const url = await getSignedUrl(client, command);
  return url;
}

async function listBucket() {
  const command = new ListObjectsV2Command({
    Bucket: "intellireferee-bucket",
    Key: "/",
  });

  const list = await client.send(command);
  return list;
}

async function init() {
  // access s3 bucket object
  const url = await getBucketObject(
    "1758703991849-AZjqCMaqsSVeJ99g8oHt0g-AZjqCMaqGhu7eUJaKnywmg.mp4"
  );
  console.log(url);
  // upload to s3 bucket
  //   const url = await putBucketObject(`image-${Date.now()}.jpeg`, "image/jpg");
  // const list = await listBucket();
  // console.log(list);
}

init();
