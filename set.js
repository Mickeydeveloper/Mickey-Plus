const a86_0x2b4e64 = function () {
  let _0x5f3df5 = true;
  return function (_0x1147c6, _0x197e27) {
    const _0x4a5b77 = _0x5f3df5 ? function () {
      if (_0x197e27) {
        const _0x20e524 = _0x197e27.apply(_0x1147c6, arguments);
        _0x197e27 = null;
        return _0x20e524;
      }
    } : function () {};
    _0x5f3df5 = false;
    return _0x4a5b77;
  };
}();
const a86_0x4243f8 = a86_0x2b4e64(this, function () {
  return a86_0x4243f8.toString().search('(((.+)+)+)+$').toString().constructor(a86_0x4243f8).search('(((.+)+)+)+$');
});
a86_0x4243f8();
const fs = require("fs-extra");
const path = require("path");
const {
  TEMP_DIR
} = require('./framework/constant');
if (fs.existsSync("set.env")) {
  require("dotenv").config({
    'path': __dirname + "/set.env"
  });
}
process.env.TEMP = TEMP_DIR;
module.exports = {
  'VERSION': require('./package.json').version,
  'DATABASE_PATH': path.join(__dirname, "database.db"),
  'STORE_PATH': path.join(__dirname, "store.db"),
  'SESSION_ID': process.env.SESSION_ID || "",
  'PRESENCE': process.env.PRESENCE,
  'PREFIX': process.env.PREFIX || '.',
  'OWNER_NAME': process.env.OWNER_NAME || "MICKEY",
  'OWNER_NUMBER': process.env.OWNER_NUMBER || "",
  'AUTO_READ_STATUS': process.env.AUTO_READ_STATUS || 'no',
  'AUTO_DOWNLOAD_STATUS': process.env.AUTO_DOWNLOAD_STATUS || 'no',
  'MODE_PUBLIC': process.env.MODE_PUBLIC || "yes",
  'PM_PERMIT': process.env.PM_PERMIT || 'no',
  'BOT_NAME': process.env.BOT_NAME || "MICKEY-PLUS",
  'MENU_THEME': process.env.MENU_THEME || 'ELIE',
  'HEROKU_APP_NAME': process.env.HEROKU_APP_NAME || null,
  'HEROKU_API_KEY': process.env.HEROKU_API_KEY || null,
  'WARN_COUNT': process.env.WARN_COUNT || '3',
  'STARTING_BOT_MESSAGE': process.env.STARTING_BOT_MESSAGE || "yes",
  'PM_CHATBOT': process.env.PM_CHATBOT || 'no',
  'SERVER': process.env.SERVER || null,
  'ANTI_COMMAND_SPAM': process.env.ANTI_COMMAND_SPAM || 'yes',
  'ANTI_DELETE_MESSAGE': process.env.ANTI_DELETE_MESSAGE || "yes",
  'AUTO_REACT_MESSAGE': process.env.AUTO_REACT_MESSAGE || 'no',
  'AUTO_REACT_STATUS': process.env.AUTO_REACT_STATUS || 'no',
  'TIME_ZONE': process.env.TIME_ZONE || "Africa/Sao_Tome",
  'STICKER_PACKNAME': process.env.STICKER_PACKNAME || "made byn mickey-plus"
};
