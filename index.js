const {app, Tray: Index, Menu, BrowserWindow, globalShortcut} = require('electron');
const makeScreenshot = require('./shot');
const path = require('path');

const iconPath = path.join(__dirname, 'assets', 'icon.png');
let appIcon = null;
let window = null;

app.on('ready', function(){
  app.dock.hide();

  window = new BrowserWindow({show: false});
  appIcon = new Index(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setContextMenu(contextMenu);

  appIcon.setToolTip('Upload a shot to capella.pics: CMD+SHIFT+CTRL+5');

  globalShortcut.register('Command+Shift+Control+5', () => {
    makeScreenshot();
  })
});
