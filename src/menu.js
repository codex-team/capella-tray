const path = require('path');
const { app, shell } = require('electron');
const shortcut = require('./shortcut');
const makeScreenshot = require('./commands/shot');
const launchToggle = require('./auto-launch');

module.exports = [
  {
    label: 'Capella',
    click() {
      shell.openExternal('https://capella.pics/');
    }
  },
  { type: 'separator' },
  {
    label: 'Make a shot',
    accelerator: shortcut,
    click() {
      makeScreenshot();
    }
  },
  { type: 'separator' },
  {
    label: 'Open at Login',
    type: 'checkbox',
    checked: app.getLoginItemSettings().openAtLogin,
    click: launchToggle,
  },
  { type: 'separator' },
  {
    label: 'Quit',
    role: 'quit'
  }
];
