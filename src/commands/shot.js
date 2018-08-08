const terminal = require('shelljs');
const uploadImage = require('../upload-image');

/**
 * Fires `screencapture` command to make a shot of an area and save a temp image
 */
const makeScreenshot = () => {
  /**
   * Generate name and path for a temporary image
   * @type {string}
   */
  const imageName = Math.random().toString(36).substr(2, 9),
        imagePath = `/tmp/${imageName}.png`;

  /**
   * Fire `screencapture` with option `i` to let user choose area
   * Save shot as a temp image
   */
  terminal.exec(`screencapture -i ${imagePath}`, (code, stdout, stderr) => {
    /**
     * Check if command execution was failed
     */
    if (code !== 0) {
      return;
    }

    /**
     * Upload image, copy link and show notification
     */
    uploadImage(imagePath, true);
  });
};

module.exports = makeScreenshot;
