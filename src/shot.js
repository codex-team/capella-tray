const Capella = require('@codexteam/capella-pics');
const terminal = require('shelljs');
const ncp = require('copy-paste');
const fs = require('fs');
const { shell } = require('electron');
const showNotification = require('./notification');

/**
 * Make screenshot and upload it
 *
 * 1. Fire `screencapture` command to make a shot of an area and save a temp image
 * 2. Upload that image to Capella and get a url
 * 3. Put url of uploaded image to clipboard
 * 4. Remove temporary image
 */
makeScreenshot = () => {
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
     * Create a new Capella instance
     */
    const capella = new Capella();

    /**
     * Upload temp image to Capella
     */
    capella.uploadFile(imagePath, resp => {
      /**
       * Remove temp image file
       */
      fs.unlink(imagePath, () => {});

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
          body: 'Link to screenshot has been copied 🤘',
          silent: true
        }, () => {
          shell.openExternal(`https://capella.pics/image/${resp.id}`);
        });
      });
    });
  });
};

module.exports = makeScreenshot;
