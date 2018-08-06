const AutoLaunch = require('auto-launch');
const { app } = require('electron');

/**
 * Compose path to app
 */
const appPath = app.getPath('exe').replace(/\.app\/Content.*/, '.app');

/**
 * Get launch instance
 */
let launch = new AutoLaunch({ name: 'shotcapella', path: appPath, isHidden: false });

/**
 * State toggler
 */
const launchToggle = () => {
  launch.isEnabled().then(enabled => {
    if (!enabled) {
      launch.enable()
    } else {
      launch.disable()
    }
  })
};

module.exports = launchToggle;
