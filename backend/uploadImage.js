let cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports.uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve({ src: result.secure_url, cloudId: result.public_id });
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports.deleteImage = async (cloudId) => {
  try {
    await cloudinary.uploader.destroy(cloudId);
  } catch (error) {
    console.log(error);
  }
};
