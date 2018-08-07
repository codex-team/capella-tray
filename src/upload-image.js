const Capella = require('@codexteam/capella-pics');
const { shell } = require('electron');
const ncp = require('copy-paste');
const fs = require('fs');
const showNotification = require('./notification');

/**
 * Upload local image to Capella, copy url and show notification
 * @param {string} imagePath
 * @param {boolean} [deleteSource=false] - need to delete source image after uploading
 */
const uploadImage = (imagePath, deleteSource = false) => {
  /**
   * Create a new Capella instance
   */
  const capella = new Capella();

  /**
   * Upload temp image to Capella
   */
  capella.uploadFile(imagePath, resp => {
    /**
     * Remove temp image file if is required
     */
    if (deleteSource) {
      fs.unlink(imagePath, () => {});
    }

    /**
     * If success is not true then something went wrong
     * Show notification and do nothing
     */
    if (!resp.success) {
      showNotification({
        title : 'Сapella',
        subtitle: 'Uploading failed',
        silent: true
      });
      return;
    }

    /**
     * Put uploaded image's url to clipboard
     * And show clickable notification
     */
    ncp.copy(resp.url, () => {
      showNotification({
        title : 'Сapella',
        body: 'Link to uploaded image has been copied 🤘',
        silent: true
      }, () => {
        shell.openExternal(`https://capella.pics/image/${resp.id}`);
      });
    });
  });
};

module.exports = uploadImage;
