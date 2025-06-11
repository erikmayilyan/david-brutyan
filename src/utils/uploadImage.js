const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (images) => {
  try {
    const uploadPromises = images.map(image => 
      cloudinary.uploader.upload(image, {
        folder: 'mildo'
      })
    );
    const results = await Promise.all(uploadPromises);
    return results.map(result => result.secure_url);
  } catch (error) {
    throw new Error('Error uploading images');
  }
};

module.exports = uploadImage;
