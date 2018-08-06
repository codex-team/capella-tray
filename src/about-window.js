const openAboutWindow = require('about-window').default;
const path = require('path');

module.exports = () => {
  openAboutWindow({
    icon_path: path.join(__dirname, 'assets', 'icon.png'),
    bug_report_url: process.env.npm_package_bugs_url,
    bug_link_text: 'Report a bug',
    description: process.env.npm_package_description,
    license: 'MIT',
  });
};
