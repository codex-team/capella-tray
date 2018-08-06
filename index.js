const { app, Tray: Index, Menu, BrowserWindow, globalShortcut, shell } = require('electron');
const makeScreenshot = require('./src/shot');
const shortcut = require('./src/shortcut');
const path = require('path');
const fs = require('fs');

app.on('ready', () => {
  try {
    /**
     * Do not show app in Dock
     */
    app.dock.hide();

    /**
     * Create hidden app window
     */
    let window = new BrowserWindow({show: false});

    /**
     * Set up icon
     */
    const iconPath = path.join(__dirname, 'assets', 'tray-icon-Template.png'),
      appIcon = new Index(iconPath);

    /**
     * Prepare context menu
     */
    const menuItems = require('./src/menu'),
      contextMenu = Menu.buildFromTemplate(menuItems);

    appIcon.setContextMenu(contextMenu);

    /**
     * Define global shortcut
     */
    globalShortcut.register(shortcut, () => {
      makeScreenshot();
    });
  } catch (e) {
    console.log('e', e);
    app.quit();
  }
});
