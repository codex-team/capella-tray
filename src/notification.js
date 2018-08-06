const { Notification } = require('electron');

/**
 * {@link https://electronjs.org/docs/api/notification#new-notificationoptions-experimental}
 *
 * @typedef {Object} notificationOptions
 * @property {string} title - A title for the notification, which will be shown at the top of the notification window when it is shown.
 * @property {string} [subtitle] - A subtitle for the notification, which will be displayed below the title.
 * @property {string} body - The body text of the notification, which will be displayed below the title or subtitle.
 * @property {boolean} [silent] - Whether or not to emit an OS notification noise when showing the notification.
 * @property {string|NativeImage} [icon] - An icon to use in the notification.
 * @property {boolean} [hasReply] - Whether or not to add an inline reply option to the notification.
 * @property {string} [replyPlaceholder] - The placeholder to write in the inline reply input field.
 * @property {string} [sound] - The name of the sound file to play when the notification is shown.
 * @property {NotificationAction[]} [actions] - Actions to add to the notification. Please read the available actions and limitations in the NotificationAction documentation.
 * @property {string} [closeButtonText] - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.
 */

/**
 * Wrapper for showing notifications
 *
 * @param {notificationOptions} options
 * @param {function|null} callback
 */
const showNotification = (options, callback) => {
  /**
   * Show notification
   */
  let notification = new Notification(options);

  if (callback) {
    notification.on('click', callback);
  }

  notification.show();
};

module.exports = showNotification;
