const path = require('path');
const { app } = require('electron');
const openAboutWindow = require('./about-window');
const makeScreenshot = require('./shot');
const shortcut = require('./shortcut');
const launchToggle = require('./auto-launch');

let launch;

module.exports = [
  // {
  //   label: 'About',
  //   click() {
  //     shell.openExternal(process.env.npm_package_repository_url);
  //   }
  // },
  // {
  //   type: 'separator'
  // },
  {
    label: 'Make a shot',
    accelerator: shortcut,
    click() {
      makeScreenshot();
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Open at Login',
    type: 'checkbox',
    checked: app.getLoginItemSettings().openAtLogin,
    click: launchToggle,
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    accelerator: 'Command+Q',
    selector: 'terminate:',
  }
];
