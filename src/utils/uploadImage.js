const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto"
};

const uploadImage = (images) => {
  // Ensure images is an array
  if (!Array.isArray(images)) {
    images = [images];  // Convert it to an array if it's not already
  }

  const uploadPromises = images.map(image =>
    cloudinary.uploader.upload(image, opts)
  );

  return Promise.all(uploadPromises)
    .then(results => {
      const urls = results.map(result => result.secure_url);
      return urls;
    })
    .catch(err => {
      console.error('Error uploading image:', err);
      throw new Error('Error uploading image: ', err);
    });
};

module.exports = uploadImage;
