const uploadImage = require('../upload-image');

/**
 * Handle drop-files event and upload first file
 * @param event
 * @param {string[]} files
 */
const uploadDropped = (event, files) => {
  if (files && files[0]) {
    uploadImage(files[0]);
  }
};

module.exports = uploadDropped;
