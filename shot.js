const Capella = require('@codexteam/capella-pics');
const shell = require("shelljs");
const ncp = require("copy-paste");
const fs = require("fs");

makeScreenshot = () => {
  const imageName = Math.random().toString(36).substr(2, 9);
  const imagePath = `/tmp/${imageName}.png`;

  shell.exec(`screencapture -i ${imagePath}`, () => {
    const capella = new Capella();

    capella.uploadFile(imagePath, resp => {
      ncp.copy(resp.url, function () {
        // complete...
      });

      fs.unlink(imagePath, () => {});
    });
  });
};

module.exports = makeScreenshot;
