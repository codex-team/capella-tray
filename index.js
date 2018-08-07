const { app, Tray, Menu, globalShortcut } = require('electron');
const shortcut = require('./src/shortcut');
const path = require('path');
const fs = require('fs');


const makeScreenshot = require('./src/commands/shot');
const uploadDropped = require('./src/commands/drop');

app.on('ready', () => {
  try {
    /**
     * Do not show app in Dock
     */
    app.dock.hide();

    /**
     * Set up icon
     */
    const iconPath = path.join(__dirname, 'assets', 'tray-icon-Template.png'),
          appIcon = new Tray(iconPath);

    /**
     * Prepare context menu
     */
    const menuItems = require('./src/menu'),
          contextMenu = Menu.buildFromTemplate(menuItems);

    appIcon.setContextMenu(contextMenu);

    /**
     * Define global shortcut
     */
    globalShortcut.register(shortcut, makeScreenshot);

    /**
     * Process files dran-n-dropping on the icon
     */
    appIcon.on('drop-files', uploadDropped);

  } catch (error) {
    console.log(error);
    app.quit();
  }
});
