// codding by Mickey developer]
'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (_0x384c03, _0x3d0204, _0x461e51, _0x49ce98) {
  if (_0x49ce98 === undefined) {
    _0x49ce98 = _0x461e51;
  }
  var _0x5efafc = Object.getOwnPropertyDescriptor(_0x3d0204, _0x461e51);
  if (!_0x5efafc || ('get' in _0x5efafc ? !_0x3d0204.__esModule : _0x5efafc.writable || _0x5efafc.configurable)) {
    _0x5efafc = {
      'enumerable': true,
      'get': function () {
        return _0x3d0204[_0x461e51];
      }
    };
  }
  Object.defineProperty(_0x384c03, _0x49ce98, _0x5efafc);
} : function (_0x2d60e8, _0x32c9b4, _0x26bd45, _0x15f6cf) {
  if (_0x15f6cf === undefined) {
    _0x15f6cf = _0x26bd45;
  }
  _0x2d60e8[_0x15f6cf] = _0x32c9b4[_0x26bd45];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x4893e2, _0x48b9f8) {
  Object.defineProperty(_0x4893e2, "default", {
    'enumerable': true,
    'value': _0x48b9f8
  });
} : function (_0x359488, _0xd6f81c) {
  _0x359488["default"] = _0xd6f81c;
});
var __importStar = this && this.__importStar || function (_0x5b0bcb) {
  if (_0x5b0bcb && _0x5b0bcb.__esModule) {
    return _0x5b0bcb;
  }
  var _0x93512d = {};
  if (_0x5b0bcb != null) {
    for (var _0x8dc13 in _0x5b0bcb) if (_0x8dc13 !== "default" && Object.prototype.hasOwnProperty.call(_0x5b0bcb, _0x8dc13)) {
      __createBinding(_0x93512d, _0x5b0bcb, _0x8dc13);
    }
  }
  __setModuleDefault(_0x93512d, _0x5b0bcb);
  return _0x93512d;
};
var __importDefault = this && this.__importDefault || function (_0x4be999) {
  return _0x4be999 && _0x4be999.__esModule ? _0x4be999 : {
    'default': _0x4be999
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1["default"].child({});
logger.level = "silent";
const pino = require('pino');
const boom_1 = require('@hapi/boom');
const conf = require("./set");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  verifierEtatJid,
  recupererActionJid
} = require('./bdd/antilien');
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./bdd/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("./bdd/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('./bdd/onlyAdmin');
let {
  reagir
} = require(__dirname + "/framework/app");
var session = conf.session.replace(/Zokou-MD-WHATSAPP-BOT;;;=>/g, '');
const prefixe = conf.PREFIXE;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express['static'](path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != 'zokk') {
      await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), 'utf8');
    }
  } catch (_0x92654c) {
    console.log("Session Invalid " + _0x92654c);
    return;
  }
}
authentification();
0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  async function _0x3ade1a() {
    0;
    const {
      version: _0x229147,
      isLatest: _0x35f68d
    } = await baileys_1.fetchLatestBaileysVersion();
    0;
    const {
      state: _0x589177,
      saveCreds: _0x5dd7a5
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0;
    const _0x4a78e6 = {
      'version': _0x229147,
      'logger': pino({
        'level': "silent"
      }),
      'browser': ['Bmw-Md', "safari", '1.0.0'],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x589177.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x589177.keys, logger)
      },
      'getMessage': async _0x1a5a7e => {
        if (store) {
          const _0x153914 = await store.loadMessage(_0x1a5a7e.remoteJid, _0x1a5a7e.id, undefined);
          return _0x153914.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0;
    const _0x197c7b = baileys_1["default"](_0x4a78e6);
    store.bind(_0x197c7b.ev);
    const _0x1ad9ec = new Map();
    function _0x238ce3(_0x218738) {
      const _0x191e84 = Date.now();
      if (!_0x1ad9ec.has(_0x218738)) {
        _0x1ad9ec.set(_0x218738, _0x191e84);
        return false;
      }
      const _0x133e7e = _0x1ad9ec.get(_0x218738);
      if (_0x191e84 - _0x133e7e < 3000) {
        return true;
      }
      _0x1ad9ec.set(_0x218738, _0x191e84);
      return false;
    }
    const _0x20ef67 = new Map();
    async function _0x2366b4(_0x2baf4a, _0x519dc7) {
      if (_0x20ef67.has(_0x519dc7)) {
        return _0x20ef67.get(_0x519dc7);
      }
      try {
        const _0x405a62 = await _0x2baf4a.groupMetadata(_0x519dc7);
        _0x20ef67.set(_0x519dc7, _0x405a62);
        setTimeout(() => _0x20ef67['delete'](_0x519dc7), 60000);
        return _0x405a62;
      } catch (_0x2bbf7e) {
        if (_0x2bbf7e.message.includes("rate-overlimit")) {
          await new Promise(_0x3c454b => setTimeout(_0x3c454b, 5000));
        }
        return null;
      }
    }
    process.on("uncaughtException", _0x1a46b9 => {});
    process.on("unhandledRejection", _0x35d1b2 => {});
    _0x197c7b.ev.on("messages.upsert", async _0x3aaec9 => {
      const {
        messages: _0x591f4e
      } = _0x3aaec9;
      if (!_0x591f4e || _0x591f4e.length === 0) {
        return;
      }
      for (const _0x3a5ad8 of _0x591f4e) {
        if (!_0x3a5ad8.message) {
          continue;
        }
        const _0x255879 = _0x3a5ad8.key.remoteJid;
        if (_0x238ce3(_0x255879)) {
          continue;
        }
      }
    });
    _0x197c7b.ev.on("groups.update", async _0x55db2c => {
      for (const _0x284cd of _0x55db2c) {
        const {
          id: _0x322088
        } = _0x284cd;
        if (!_0x322088.endsWith('@g.us')) {
          continue;
        }
        await _0x2366b4(_0x197c7b, _0x322088);
      }
    });
    _0x197c7b.ev.on("messages.upsert", async _0xa8ba05 => {
      if (conf.ANTIDELETE1 === "yes") {
        const {
          messages: _0x68868c
        } = _0xa8ba05;
        const _0x51b4aa = _0x68868c[0];
        if (!_0x51b4aa.message) {
          return;
        }
        const _0x50b8f4 = _0x51b4aa.key;
        const _0x3735c6 = _0x50b8f4.remoteJid;
        if (!store.chats[_0x3735c6]) {
          store.chats[_0x3735c6] = [];
        }
        store.chats[_0x3735c6].push(_0x51b4aa);
        if (_0x51b4aa.message.protocolMessage && _0x51b4aa.message.protocolMessage.type === 0) {
          const _0xbd1c0c = _0x51b4aa.message.protocolMessage.key;
          const _0x563dd5 = store.chats[_0x3735c6];
          const _0x556915 = _0x563dd5.find(_0x1066c5 => _0x1066c5.key.id === _0xbd1c0c.id);
          if (_0x556915) {
            try {
              const _0x2893b2 = _0x556915.key.participant || _0x556915.key.remoteJid;
              const _0x5cf285 = "*🛑 This message was deleted by @" + _0x2893b2.split('@')[0] + '*';
              const _0x4825cb = conf.NUMERO_OWNER + "@s.whatsapp.net";
              if (_0x556915.message.conversation) {
                await _0x197c7b.sendMessage(_0x4825cb, {
                  'text': _0x5cf285 + "\nDeleted message: " + _0x556915.message.conversation,
                  'mentions': [_0x2893b2]
                });
              } else {
                if (_0x556915.message.imageMessage) {
                  const _0x8327f1 = _0x556915.message.imageMessage.caption || '';
                  const _0x208068 = await _0x197c7b.downloadAndSaveMediaMessage(_0x556915.message.imageMessage);
                  await _0x197c7b.sendMessage(_0x4825cb, {
                    'image': {
                      'url': _0x208068
                    },
                    'caption': _0x5cf285 + "\n" + _0x8327f1,
                    'mentions': [_0x2893b2]
                  });
                } else {
                  if (_0x556915.message.videoMessage) {
                    const _0x323d62 = _0x556915.message.videoMessage.caption || '';
                    const _0x2c6311 = await _0x197c7b.downloadAndSaveMediaMessage(_0x556915.message.videoMessage);
                    await _0x197c7b.sendMessage(_0x4825cb, {
                      'video': {
                        'url': _0x2c6311
                      },
                      'caption': _0x5cf285 + "\n" + _0x323d62,
                      'mentions': [_0x2893b2]
                    });
                  } else {
                    if (_0x556915.message.audioMessage) {
                      const _0x3a2dd4 = await _0x197c7b.downloadAndSaveMediaMessage(_0x556915.message.audioMessage);
                      await _0x197c7b.sendMessage(_0x4825cb, {
                        'audio': {
                          'url': _0x3a2dd4
                        },
                        'ptt': true,
                        'caption': _0x5cf285,
                        'mentions': [_0x2893b2]
                      });
                    } else {
                      if (_0x556915.message.stickerMessage) {
                        const _0x46ae03 = await _0x197c7b.downloadAndSaveMediaMessage(_0x556915.message.stickerMessage);
                        await _0x197c7b.sendMessage(_0x4825cb, {
                          'sticker': {
                            'url': _0x46ae03
                          },
                          'caption': _0x5cf285,
                          'mentions': [_0x2893b2]
                        });
                      }
                    }
                  }
                }
              }
            } catch (_0x2678a3) {
              console.error("Error handling deleted message:", _0x2678a3);
            }
          }
        }
      }
    });
    const _0x3da46c = _0x190d37 => new Promise(_0x17ef1e => setTimeout(_0x17ef1e, _0x190d37));
    let _0x2a2e94 = 0;
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x197c7b.ev.on("messages.upsert", async _0x26975f => {
        const {
          messages: _0x38ebb7
        } = _0x26975f;
        for (const _0x14979c of _0x38ebb7) {
          if (_0x14979c.key && _0x14979c.key.remoteJid === "status@broadcast") {
            console.log("Detected status update from:", _0x14979c.key.remoteJid);
            const _0x21c455 = Date.now();
            if (_0x21c455 - _0x2a2e94 < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x280195 = _0x197c7b.user && _0x197c7b.user.id ? _0x197c7b.user.id.split(':')[0] + '@s.whatsapp.net' : null;
            if (!_0x280195) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            await _0x197c7b.sendMessage(_0x14979c.key.remoteJid, {
              'react': {
                'key': _0x14979c.key,
                'text': '🇰🇪'
              }
            }, {
              'statusJidList': [_0x14979c.key.participant, _0x280195]
            });
            _0x2a2e94 = Date.now();
            console.log("Successfully reacted to status update by " + _0x14979c.key.remoteJid);
            await _0x3da46c(2000);
          }
        }
      });
    }
    const _0x117de9 = {
      'hello': ['👋', '🙂', '😊', '🙋‍♂️', '🙋‍♀️'],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', '🚶‍♂️', "🚶‍♀️"],
      "see you": ['👋', '😊', "👋🏻", '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", '👯‍♀️', '🤜🤛', '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'ibrahim': ['😎', '💯', '🔥', '🚀', '👑'],
      'adams': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', "🙇‍♂️", "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', '🎖️', '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", '👩‍💻'],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", '🤷‍♀️', '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", '🏙️', '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', '💁‍♂️', "💁‍♀️", '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', "🙇‍♂️", "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", '🙇‍♀️'],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", "🚶‍♂️", "🚶‍♀️"],
      'bye': ['👋', "👋🏻", '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', "🖥️", '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", '👩‍🏫'],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', "🤷‍♂️", '🤷‍♀️'],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", "👩‍👧‍👦", '👨‍👩‍👧', '💏', "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
      'friends': ['👯‍♂️', '👯‍♀️', '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', '👯‍♀️', '👯‍♂️', '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", "🏞️", "🏕️"],
      'beach': ["🏖️", '🌊', "🏄‍♀️", '🩴', '🏖️', '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', '🏔️', '🌄', '🏕️', '🌲'],
      'city': ['🏙️', '🌆', '🗽', '🌇', '🚖', "🏙️"],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', '🕶️'],
      'afternoon': ['🌞', "🌤️", '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ["🖥️", '💼', '🗂️', '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', "🏃‍♂️", '🏃‍♀️', '🤸‍♀️', "🚴‍♀️", "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', '🐻‍❄️'],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', '🌦️', "🌧️"],
      'snow': ['❄️', '⛄', "🌨️", '🌬️', '❄️'],
      'wind': ['💨', "🌬️", "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', "🖱️", "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', "🖥️", '🧑‍💻', "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', '🎖️', '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", '🏃‍♀️', '🏆', '🥇'],
      'games': ['🎮', '🕹️', '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", "🖼️", '🎭', '🖍️'],
      'photography': ['📷', '📸', '📸', '🖼️', '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', "🕊️", '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', "🕊️", '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', "🌧️"],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", '🌬️', '☃️'],
      'wind': ['💨', "🌬️", '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', '🌤️', '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', '🏄‍♂️'],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', '🏞️'],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', '🏟️', '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', '🏟️', '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', '🏟️', '🏆', '🥅'],
      'golf': ['⛳', '🏌️‍♂️', "🏌️‍♀️", '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", "🏃‍♀️", '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", '🏊‍♀️', '🌊', '🏆', '👏'],
      'cycling': ['🚴‍♂️', "🚴‍♀️", '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', "🎙️", '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', '🛰️', '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', "🖥️", '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', "🛥️", '🚤', '🚢', '🌊'],
      'city': ['🏙️', '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', '🏄‍♂️'],
      'mountain': ['🏔️', '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ['🏜️', '🌵', '🐪', '🌞', "🏖️"],
      'hotel': ['🏨', '🏩', '🛏️', "🛎️", '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ['🦸‍♂️', '🦸‍♀️', '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', '🕸️', "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x793995 = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', '🕶️', '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x4974c9 = _0xaac846 => {
      const _0x243f72 = _0xaac846.split(/\s+/);
      for (const _0x80dc0d of _0x243f72) {
        const _0x316600 = _0x1bd020(_0x80dc0d.toLowerCase());
        if (_0x316600) {
          return _0x316600;
        }
      }
      return _0x793995[Math.floor(Math.random() * _0x793995.length)];
    };
    const _0x1bd020 = _0x41e883 => {
      const _0x44818c = _0x117de9[_0x41e883.toLowerCase()];
      if (_0x44818c && _0x44818c.length > 0) {
        return _0x44818c[Math.floor(Math.random() * _0x44818c.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT === "yes") {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x197c7b.ev.on("messages.upsert", async _0x283253 => {
        const {
          messages: _0x49ac30
        } = _0x283253;
        for (const _0x51f3c9 of _0x49ac30) {
          if (_0x51f3c9.key && _0x51f3c9.key.remoteJid) {
            const _0x445db0 = Date.now();
            if (_0x445db0 - _0x2a2e94 < 5000) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x5d990e = _0x51f3c9?.["message"]?.['conversation'] || '';
            const _0x14add4 = _0x4974c9(_0x5d990e) || _0x793995[Math.floor(Math.random() * _0x793995.length)];
            if (_0x14add4) {
              await _0x197c7b.sendMessage(_0x51f3c9.key.remoteJid, {
                'react': {
                  'text': _0x14add4,
                  'key': _0x51f3c9.key
                }
              }).then(() => {
                _0x2a2e94 = Date.now();
                console.log("Successfully reacted with '" + _0x14add4 + "' to message by " + _0x51f3c9.key.remoteJid);
              })['catch'](_0x5391e0 => {
                console.error("Failed to send reaction:", _0x5391e0);
              });
            }
            await _0x3da46c(2000);
          }
        }
      });
    }
    _0x197c7b.ev.on("messages.upsert", async _0x5e4533 => {
      const {
        messages: _0x5ba635
      } = _0x5e4533;
      const _0x4e8df4 = _0x5ba635[0];
      if (!_0x4e8df4.message) {
        return;
      }
      const _0x248af7 = _0x4e8df4.message.conversation || _0x4e8df4.message.extendedTextMessage?.["text"] || '';
      const _0x24cfc8 = _0x4e8df4.key.remoteJid;
      if (_0x248af7.slice(1).toLowerCase() === "vcf") {
        if (!_0x24cfc8.endsWith("@g.us")) {
          await _0x197c7b.sendMessage(_0x24cfc8, {
            'text': "❌ This command only works in groups.\n\n🚀 Charles Ke"
          });
          return;
        }
        await createAndSendGroupVCard(_0x24cfc8, "Charles family", _0x197c7b);
      }
    });
    _0x197c7b.ev.on("call", async _0x232db8 => {
      if (conf.ANTICALL === "yes") {
        const _0x50e24a = _0x232db8[0].id;
        const _0x398a5e = _0x232db8[0].from;
        await _0x197c7b.rejectCall(_0x50e24a, _0x398a5e);
        setTimeout(async () => {
          await _0x197c7b.sendMessage(_0x398a5e, {
            'text': "🚫 *Simu imekwata❗*  \nSamahani,   \n⚠️ sipo onnline kwa sasa nitakuchek .  \n"
          });
        }, 1000);
      }
    });
    _0x197c7b.ev.on("messages.upsert", async _0x1d8698 => {
      const {
        messages: _0x4bb50a
      } = _0x1d8698;
      const _0x5ba00c = _0x4bb50a[0];
      if (!_0x5ba00c.message) {
        return;
      }
      const _0x169e11 = _0x2895f8 => {
        if (!_0x2895f8) {
          return _0x2895f8;
        }
        if (/:\d+@/gi.test(_0x2895f8)) {
          0;
          let _0xc60635 = baileys_1.jidDecode(_0x2895f8) || {};
          return _0xc60635.user && _0xc60635.server && _0xc60635.user + '@' + _0xc60635.server || _0x2895f8;
        } else {
          return _0x2895f8;
        }
      };
      0;
      var _0x27114a = baileys_1.getContentType(_0x5ba00c.message);
      var _0x1ea754 = _0x27114a == "conversation" ? _0x5ba00c.message.conversation : _0x27114a == "imageMessage" ? _0x5ba00c.message.imageMessage?.['caption'] : _0x27114a == 'videoMessage' ? _0x5ba00c.message.videoMessage?.['caption'] : _0x27114a == "extendedTextMessage" ? _0x5ba00c.message?.["extendedTextMessage"]?.["text"] : _0x27114a == 'buttonsResponseMessage' ? _0x5ba00c?.['message']?.["buttonsResponseMessage"]?.['selectedButtonId'] : _0x27114a == "listResponseMessage" ? _0x5ba00c.message?.['listResponseMessage']?.['singleSelectReply']?.["selectedRowId"] : _0x27114a == "messageContextInfo" ? _0x5ba00c?.["message"]?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x5ba00c.message?.["listResponseMessage"]?.["singleSelectReply"]?.["selectedRowId"] || _0x5ba00c.text : '';
      var _0x162f50 = _0x5ba00c.key.remoteJid;
      var _0x4b92db = _0x169e11(_0x197c7b.user.id);
      var _0x59f605 = _0x4b92db.split('@')[0];
      const _0x288199 = _0x162f50?.["endsWith"]('@g.us');
      var _0x17b65f = _0x288199 ? await _0x197c7b.groupMetadata(_0x162f50) : '';
      var _0x4d1e06 = _0x288199 ? _0x17b65f.subject : '';
      var _0x58c2c2 = _0x5ba00c.message.extendedTextMessage?.["contextInfo"]?.['quotedMessage'];
      var _0x151756 = _0x169e11(_0x5ba00c.message?.["extendedTextMessage"]?.["contextInfo"]?.['participant']);
      var _0x5383e1 = _0x288199 ? _0x5ba00c.key.participant ? _0x5ba00c.key.participant : _0x5ba00c.participant : _0x162f50;
      if (_0x5ba00c.key.fromMe) {
        _0x5383e1 = _0x4b92db;
      }
      var _0xa6d6d0 = _0x288199 ? _0x5ba00c.key.participant : '';
      const {
        getAllSudoNumbers: _0x7cfce6
      } = require("./bdd/sudo");
      const _0x103f23 = _0x5ba00c.pushName;
      const _0x35d74f = await _0x7cfce6();
      const _0x3083cf = [_0x59f605, "255711765335", "255612130873", '255711765335', "255711765335", conf.NUMERO_OWNER].map(_0x385d66 => _0x385d66.replace(/[^0-9]/g) + '@s.whatsapp.net');
      const _0x5d8c68 = _0x3083cf.concat(_0x35d74f);
      const _0x5c1f0c = _0x5d8c68.includes(_0x5383e1);
      var _0x3ede21 = ["255612130873", "255711765335", '255612130873', "255612130873"].map(_0x412458 => _0x412458.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x5383e1);
      function _0x35dcbe(_0x362039) {
        _0x197c7b.sendMessage(_0x162f50, {
          'text': _0x362039
        }, {
          'quoted': _0x5ba00c
        });
      }
      console.log("\t🌍MICKEY-PLUS ONLINE🌍");
      console.log("=========== written message===========");
      if (_0x288199) {
        console.log("message provenant du groupe : " + _0x4d1e06);
      }
      console.log("message envoyé par : [" + _0x103f23 + " : " + _0x5383e1.split('@s.whatsapp.net')[0] + " ]");
      console.log("type de message : " + _0x27114a);
      console.log("------ contenu du message ------");
      console.log(_0x1ea754);
      function _0x4b6bab(_0x22c702) {
        let _0x221217 = [];
        for (_0x1d8698 of _0x22c702) {
          if (_0x1d8698.admin == null) {
            continue;
          }
          _0x221217.push(_0x1d8698.id);
        }
        return _0x221217;
      }
      var _0x355c12 = conf.ETAT;
      if (_0x355c12 == 1) {
        await _0x197c7b.sendPresenceUpdate("available", _0x162f50);
      } else {
        if (_0x355c12 == 2) {
          await _0x197c7b.sendPresenceUpdate("composing", _0x162f50);
        } else if (_0x355c12 == 3) {
          await _0x197c7b.sendPresenceUpdate("recording", _0x162f50);
        } else {
          await _0x197c7b.sendPresenceUpdate('unavailable', _0x162f50);
        }
      }
      const _0x441c69 = _0x288199 ? await _0x17b65f.participants : '';
      let _0x575c56 = _0x288199 ? _0x4b6bab(_0x441c69) : '';
      const _0x583acd = _0x288199 ? _0x575c56.includes(_0x5383e1) : false;
      var _0x4f0685 = _0x288199 ? _0x575c56.includes(_0x4b92db) : false;
      const _0x5a7fd4 = _0x1ea754 ? _0x1ea754.trim().split(/ +/).slice(1) : null;
      const _0xda43f2 = _0x1ea754 ? _0x1ea754.startsWith(prefixe) : false;
      const _0x5dda8d = _0xda43f2 ? _0x1ea754.slice(1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x7885a5 = conf.URL.split(',');
      function _0x31c4c0() {
        const _0x4dd972 = Math.floor(Math.random() * _0x7885a5.length);
        const _0x5abe24 = _0x7885a5[_0x4dd972];
        return _0x5abe24;
      }
      var _0x4ca367 = {
        'superUser': _0x5c1f0c,
        'dev': _0x3ede21,
        'verifGroupe': _0x288199,
        'mbre': _0x441c69,
        'membreGroupe': _0xa6d6d0,
        'verifAdmin': _0x583acd,
        'infosGroupe': _0x17b65f,
        'nomGroupe': _0x4d1e06,
        'auteurMessage': _0x5383e1,
        'nomAuteurMessage': _0x103f23,
        'idBot': _0x4b92db,
        'verifZokouAdmin': _0x4f0685,
        'prefixe': prefixe,
        'arg': _0x5a7fd4,
        'repondre': _0x35dcbe,
        'mtype': _0x27114a,
        'groupeAdmin': _0x4b6bab,
        'msgRepondu': _0x58c2c2,
        'auteurMsgRepondu': _0x151756,
        'ms': _0x5ba00c,
        'mybotpic': _0x31c4c0
      };
      if (conf.AUTO_READ === "yes") {
        _0x197c7b.ev.on("messages.upsert", async _0x257bd0 => {
          const {
            messages: _0x204d7b
          } = _0x257bd0;
          for (const _0xf56d51 of _0x204d7b) {
            if (!_0xf56d51.key.fromMe) {
              await _0x197c7b.readMessages([_0xf56d51.key]);
            }
          }
        });
      }
      if (_0x5ba00c.key && _0x5ba00c.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x197c7b.readMessages([_0x5ba00c.key]);
      }
      if (_0x5ba00c.key && _0x5ba00c.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === "yes") {
        if (_0x5ba00c.message.extendedTextMessage) {
          var _0x14fe47 = _0x5ba00c.message.extendedTextMessage.text;
          await _0x197c7b.sendMessage(_0x4b92db, {
            'text': _0x14fe47
          }, {
            'quoted': _0x5ba00c
          });
        } else {
          if (_0x5ba00c.message.imageMessage) {
            var _0x3b4dbd = _0x5ba00c.message.imageMessage.caption;
            var _0x1f5190 = await _0x197c7b.downloadAndSaveMediaMessage(_0x5ba00c.message.imageMessage);
            await _0x197c7b.sendMessage(_0x4b92db, {
              'image': {
                'url': _0x1f5190
              },
              'caption': _0x3b4dbd
            }, {
              'quoted': _0x5ba00c
            });
          } else {
            if (_0x5ba00c.message.videoMessage) {
              var _0x3b4dbd = _0x5ba00c.message.videoMessage.caption;
              var _0x21967b = await _0x197c7b.downloadAndSaveMediaMessage(_0x5ba00c.message.videoMessage);
              await _0x197c7b.sendMessage(_0x4b92db, {
                'video': {
                  'url': _0x21967b
                },
                'caption': _0x3b4dbd
              }, {
                'quoted': _0x5ba00c
              });
            }
          }
        }
      }
      if (!_0x3ede21 && _0x162f50 == "120363158701337904@g.us") {
        return;
      }
      if (_0x1ea754 && _0x5383e1.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x249214
        } = require("./bdd/level");
        try {
          await _0x249214(_0x5383e1);
        } catch (_0x3a59c2) {
          console.error(_0x3a59c2);
        }
      }
      try {
        if (_0x5ba00c.message[_0x27114a].contextInfo.mentionedJid && (_0x5ba00c.message[_0x27114a].contextInfo.mentionedJid.includes(_0x4b92db) || _0x5ba00c.message[_0x27114a].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x162f50 == '120363158701337904@g.us') {
            return;
          }
          ;
          if (_0x5c1f0c) {
            console.log("hummm");
            return;
          }
          let _0x2def48 = require("./bdd/mention");
          let _0x49df50 = await _0x2def48.recupererToutesLesValeurs();
          let _0x4eb55e = _0x49df50[0];
          if (_0x4eb55e.status === "non") {
            console.log("mention pas actifs");
            return;
          }
          let _0x3c59b8;
          if (_0x4eb55e.type.toLocaleLowerCase() === 'image') {
            _0x3c59b8 = {
              'image': {
                'url': _0x4eb55e.url
              },
              'caption': _0x4eb55e.message
            };
          } else {
            if (_0x4eb55e.type.toLocaleLowerCase() === 'video') {
              _0x3c59b8 = {
                'video': {
                  'url': _0x4eb55e.url
                },
                'caption': _0x4eb55e.message
              };
            } else {
              if (_0x4eb55e.type.toLocaleLowerCase() === "sticker") {
                let _0x6b32fd = new Sticker(_0x4eb55e.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x1040b5 = await _0x6b32fd.toBuffer();
                _0x3c59b8 = {
                  'sticker': _0x1040b5
                };
              } else {
                if (_0x4eb55e.type.toLocaleLowerCase() === 'audio') {
                  _0x3c59b8 = {
                    'audio': {
                      'url': _0x4eb55e.url
                    },
                    'mimetype': 'audio/mp4'
                  };
                }
              }
            }
          }
          _0x197c7b.sendMessage(_0x162f50, _0x3c59b8, {
            'quoted': _0x5ba00c
          });
        }
      } catch (_0x23975d) {}
      try {
        const _0x27d61a = await verifierEtatJid(_0x162f50);
        if (_0x1ea754.includes("https://") && _0x288199 && _0x27d61a) {
          console.log("lien detecté");
          var _0x37723a = _0x288199 ? _0x575c56.includes(_0x4b92db) : false;
          if (_0x5c1f0c || _0x583acd || !_0x37723a) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x193793 = {
            'remoteJid': _0x162f50,
            'fromMe': false,
            'id': _0x5ba00c.key.id,
            'participant': _0x5383e1
          };
          var _0x19de92 = "lien detected, \n";
          var _0x379379 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "Zoou-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x379379.toFile("st1.webp");
          var _0x4c10c7 = await recupererActionJid(_0x162f50);
          if (_0x4c10c7 === 'remove') {
            _0x19de92 += "message deleted \n @" + _0x5383e1.split('@')[0] + " removed from group.";
            await _0x197c7b.sendMessage(_0x162f50, {
              'sticker': fs.readFileSync('st1.webp')
            });
            0;
            baileys_1.delay(800);
            await _0x197c7b.sendMessage(_0x162f50, {
              'text': _0x19de92,
              'mentions': [_0x5383e1]
            }, {
              'quoted': _0x5ba00c
            });
            try {
              await _0x197c7b.groupParticipantsUpdate(_0x162f50, [_0x5383e1], 'remove');
            } catch (_0x36aa35) {
              console.log("antiien ") + _0x36aa35;
            }
            await _0x197c7b.sendMessage(_0x162f50, {
              'delete': _0x193793
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x4c10c7 === "delete") {
              _0x19de92 += "message deleted \n @" + _0x5383e1.split('@')[0] + " avoid sending link.";
              await _0x197c7b.sendMessage(_0x162f50, {
                'text': _0x19de92,
                'mentions': [_0x5383e1]
              }, {
                'quoted': _0x5ba00c
              });
              await _0x197c7b.sendMessage(_0x162f50, {
                'delete': _0x193793
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x4c10c7 === "warn") {
                const {
                  getWarnCountByJID: _0x5b63e0,
                  ajouterUtilisateurAvecWarnCount: _0x2f76b0
                } = require('./bdd/warn');
                let _0x518fae = await _0x5b63e0(_0x5383e1);
                let _0x411229 = conf.WARN_COUNT;
                if (_0x518fae >= _0x411229) {
                  var _0x52f693 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'text': _0x52f693,
                    'mentions': [_0x5383e1]
                  }, {
                    'quoted': _0x5ba00c
                  });
                  await _0x197c7b.groupParticipantsUpdate(_0x162f50, [_0x5383e1], "remove");
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'delete': _0x193793
                  });
                } else {
                  var _0xaa8ce6 = _0x411229 - _0x518fae;
                  var _0x57b128 = "Link detected , your warn_count was upgrade ;\n rest : " + _0xaa8ce6 + " ";
                  await _0x2f76b0(_0x5383e1);
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'text': _0x57b128,
                    'mentions': [_0x5383e1]
                  }, {
                    'quoted': _0x5ba00c
                  });
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'delete': _0x193793
                  });
                }
              }
            }
          }
        }
      } catch (_0x861914) {
        console.log("bdd err " + _0x861914);
      }
      try {
        const _0x569edb = _0x5ba00c.key?.['id']?.["startsWith"]("BAES") && _0x5ba00c.key?.['id']?.["length"] === 16;
        const _0x14de68 = _0x5ba00c.key?.['id']?.["startsWith"]("BAE5") && _0x5ba00c.key?.['id']?.["length"] === 16;
        if (_0x569edb || _0x14de68) {
          if (_0x27114a === 'reactionMessage') {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x3f4f93 = await atbverifierEtatJid(_0x162f50);
          if (!_0x3f4f93) {
            return;
          }
          ;
          if (_0x583acd || _0x5383e1 === _0x4b92db) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x3fbc86 = {
            'remoteJid': _0x162f50,
            'fromMe': false,
            'id': _0x5ba00c.key.id,
            'participant': _0x5383e1
          };
          var _0x19de92 = "bot detected, \n";
          var _0x379379 = new Sticker('https://raw.githubusercontent.com/djalega8000/Zokou-MD/main/media/remover.gif', {
            'pack': "Zoou-Md",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': '12345',
            'quality': 0x32,
            'background': "#000000"
          });
          await _0x379379.toFile('st1.webp');
          var _0x4c10c7 = await atbrecupererActionJid(_0x162f50);
          if (_0x4c10c7 === "remove") {
            _0x19de92 += "message deleted \n @" + _0x5383e1.split('@')[0] + " removed from group.";
            await _0x197c7b.sendMessage(_0x162f50, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0;
            baileys_1.delay(800);
            await _0x197c7b.sendMessage(_0x162f50, {
              'text': _0x19de92,
              'mentions': [_0x5383e1]
            }, {
              'quoted': _0x5ba00c
            });
            try {
              await _0x197c7b.groupParticipantsUpdate(_0x162f50, [_0x5383e1], 'remove');
            } catch (_0x53157e) {
              console.log("antibot ") + _0x53157e;
            }
            await _0x197c7b.sendMessage(_0x162f50, {
              'delete': _0x3fbc86
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x4c10c7 === "delete") {
              _0x19de92 += "message delete \n @" + _0x5383e1.split('@')[0] + " Avoid sending link.";
              await _0x197c7b.sendMessage(_0x162f50, {
                'text': _0x19de92,
                'mentions': [_0x5383e1]
              }, {
                'quoted': _0x5ba00c
              });
              await _0x197c7b.sendMessage(_0x162f50, {
                'delete': _0x3fbc86
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x4c10c7 === "warn") {
                const {
                  getWarnCountByJID: _0x4b2ca3,
                  ajouterUtilisateurAvecWarnCount: _0x468662
                } = require('./bdd/warn');
                let _0x5c6a40 = await _0x4b2ca3(_0x5383e1);
                let _0x4f0563 = conf.WARN_COUNT;
                if (_0x5c6a40 >= _0x4f0563) {
                  var _0x52f693 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'text': _0x52f693,
                    'mentions': [_0x5383e1]
                  }, {
                    'quoted': _0x5ba00c
                  });
                  await _0x197c7b.groupParticipantsUpdate(_0x162f50, [_0x5383e1], "remove");
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'delete': _0x3fbc86
                  });
                } else {
                  var _0xaa8ce6 = _0x4f0563 - _0x5c6a40;
                  var _0x57b128 = "bot detected , your warn_count was upgrade ;\n rest : " + _0xaa8ce6 + " ";
                  await _0x468662(_0x5383e1);
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'text': _0x57b128,
                    'mentions': [_0x5383e1]
                  }, {
                    'quoted': _0x5ba00c
                  });
                  await _0x197c7b.sendMessage(_0x162f50, {
                    'delete': _0x3fbc86
                  });
                }
              }
            }
          }
        }
      } catch (_0x37c4d6) {
        console.log(".... " + _0x37c4d6);
      }
      if (_0xda43f2) {
        const _0x3ff353 = evt.cm.find(_0x11aa94 => _0x11aa94.nomCom === _0x5dda8d);
        if (_0x3ff353) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x5c1f0c) {
              return;
            }
            if (!_0x5c1f0c && _0x162f50 === _0x5383e1 && conf.PM_PERMIT === "yes") {
              _0x35dcbe("You don't have acces to commands here");
              return;
            }
            if (!_0x5c1f0c && _0x288199) {
              let _0x53fed2 = await isGroupBanned(_0x162f50);
              if (_0x53fed2) {
                return;
              }
            }
            if (!_0x583acd && _0x288199) {
              let _0x20c0b4 = await isGroupOnlyAdmin(_0x162f50);
              if (_0x20c0b4) {
                return;
              }
            }
            if (!_0x5c1f0c) {
              let _0x8a5ecc = await isUserBanned(_0x5383e1);
              if (_0x8a5ecc) {
                _0x35dcbe("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x162f50, _0x197c7b, _0x5ba00c, _0x3ff353.reaction);
            _0x3ff353.fonction(_0x162f50, _0x197c7b, _0x4ca367);
          } catch (_0x1ef12d) {
            console.log("😡😡 " + _0x1ef12d);
            _0x197c7b.sendMessage(_0x162f50, {
              'text': "😡😡 " + _0x1ef12d
            }, {
              'quoted': _0x5ba00c
            });
          }
        }
      }
    });
    const {
      recupevents: _0x3a398f
    } = require("./bdd/welcome");
    _0x197c7b.ev.on("group-participants.update", async _0x54db9d => {
      console.log(_0x54db9d);
      let _0x3f7d88;
      try {
        _0x3f7d88 = await _0x197c7b.profilePictureUrl(_0x54db9d.id, 'image');
      } catch {
        _0x3f7d88 = '';
      }
      try {
        const _0x4f608d = await _0x197c7b.groupMetadata(_0x54db9d.id);
        if (_0x54db9d.action == "add" && (await _0x3a398f(_0x54db9d.id, "welcome")) == 'on') {
          let _0x547077 = "*MICKEY-PLUS WELCOME MESSAGE*";
          let _0x5edd8f = _0x54db9d.participants;
          for (let _0x3189eb of _0x5edd8f) {
            _0x547077 += " \n❒ *Hey* 🖐️ @" + _0x3189eb.split('@')[0] + " WELCOME TO OUR GROUP. \n\n";
          }
          _0x547077 += "❒ *READ THE GROUP DESCRIPTION TO AVOID GETTING REMOVED BY @MICKEY +.* ";
          _0x197c7b.sendMessage(_0x54db9d.id, {
            'image': {
              'url': _0x3f7d88
            },
            'caption': _0x547077,
            'mentions': _0x5edd8f
          });
        } else {
          if (_0x54db9d.action == "remove" && (await _0x3a398f(_0x54db9d.id, "goodbye")) == 'on') {
            let _0x19a6a8 = "one or somes member(s) left group;\n";
            let _0x233fc2 = _0x54db9d.participants;
            for (let _0x41431e of _0x233fc2) {
              _0x19a6a8 += '@' + _0x41431e.split('@')[0] + "\n";
            }
            _0x197c7b.sendMessage(_0x54db9d.id, {
              'text': _0x19a6a8,
              'mentions': _0x233fc2
            });
          } else {
            if (_0x54db9d.action == "promote" && (await _0x3a398f(_0x54db9d.id, 'antipromote')) == 'on') {
              if (_0x54db9d.author == _0x4f608d.owner || _0x54db9d.author == conf.NUMERO_OWNER + "@s.whatsapp.net" || _0x54db9d.author == decodeJid(_0x197c7b.user.id) || _0x54db9d.author == _0x54db9d.participants[0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x197c7b.groupParticipantsUpdate(_0x54db9d.id, [_0x54db9d.author, _0x54db9d.participants[0]], 'demote');
              _0x197c7b.sendMessage(_0x54db9d.id, {
                'text': '@' + _0x54db9d.author.split('@')[0] + " has violated the anti-promotion rule, therefore both " + _0x54db9d.author.split('@')[0] + " and @" + _0x54db9d.participants[0].split('@')[0] + " have been removed from administrative rights.",
                'mentions': [_0x54db9d.author, _0x54db9d.participants[0]]
              });
            } else {
              if (_0x54db9d.action == 'demote' && (await _0x3a398f(_0x54db9d.id, "antidemote")) == 'on') {
                if (_0x54db9d.author == _0x4f608d.owner || _0x54db9d.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x54db9d.author == decodeJid(_0x197c7b.user.id) || _0x54db9d.author == _0x54db9d.participants[0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x197c7b.groupParticipantsUpdate(_0x54db9d.id, [_0x54db9d.author], 'demote');
                await _0x197c7b.groupParticipantsUpdate(_0x54db9d.id, [_0x54db9d.participants[0]], "promote");
                _0x197c7b.sendMessage(_0x54db9d.id, {
                  'text': '@' + _0x54db9d.author.split('@')[0] + " has violated the anti-demotion rule by removing @" + _0x54db9d.participants[0].split('@')[0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x54db9d.author, _0x54db9d.participants[0]]
                });
              }
            }
          }
        }
      } catch (_0x256d3a) {
        console.error(_0x256d3a);
      }
    });
    async function _0xc79ff2() {
      const _0x242282 = require('node-cron');
      const {
        getCron: _0x53a507
      } = require("./bdd/cron");
      let _0x53a8bd = await _0x53a507();
      console.log(_0x53a8bd);
      if (_0x53a8bd.length > 0) {
        for (let _0x54a6b7 = 0; _0x54a6b7 < _0x53a8bd.length; _0x54a6b7++) {
          if (_0x53a8bd[_0x54a6b7].mute_at != null) {
            let _0x3a9ff9 = _0x53a8bd[_0x54a6b7].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x53a8bd[_0x54a6b7].group_id + " a " + _0x3a9ff9[0] + " H " + _0x3a9ff9[1]);
            _0x242282.schedule(_0x3a9ff9[1] + " " + _0x3a9ff9[0] + " * * *", async () => {
              await _0x197c7b.groupSettingUpdate(_0x53a8bd[_0x54a6b7].group_id, "announcement");
              _0x197c7b.sendMessage(_0x53a8bd[_0x54a6b7].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
            }, {
              'timezone': 'Africa/Nairobi'
            });
          }
          if (_0x53a8bd[_0x54a6b7].unmute_at != null) {
            let _0x294f06 = _0x53a8bd[_0x54a6b7].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x294f06[0] + " H " + _0x294f06[1] + " ");
            _0x242282.schedule(_0x294f06[1] + " " + _0x294f06[0] + " * * *", async () => {
              await _0x197c7b.groupSettingUpdate(_0x53a8bd[_0x54a6b7].group_id, "not_announcement");
              _0x197c7b.sendMessage(_0x53a8bd[_0x54a6b7].group_id, {
                'image': {
                  'url': "./media/chrono.webp"
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "Africa/Nairobi"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x197c7b.ev.on('contacts.upsert', async _0x590302 => {
      const _0x932d7 = _0x1418fe => {
        for (const _0xfec334 of _0x1418fe) {
          if (store.contacts[_0xfec334.id]) {
            Object.assign(store.contacts[_0xfec334.id], _0xfec334);
          } else {
            store.contacts[_0xfec334.id] = _0xfec334;
          }
        }
        return;
      };
      _0x932d7(_0x590302);
    });
    _0x197c7b.ev.on("connection.update", async _0x4f336c => {
      const {
        lastDisconnect: _0x515df5,
        connection: _0x2f552d
      } = _0x4f336c;
      if (_0x2f552d === 'connecting') {
        console.log(" mickey-plus is connecting...");
      } else {
        if (_0x2f552d === "open") {
          console.log("✅ Mickey-plus Connected to WhatsApp! ☺️");
          _0x197c7b.newsletterFollow("120363398106360290@newsletter");
          console.log('--');
          0;
          await baileys_1.delay(200);
          console.log('------');
          0;
          await baileys_1.delay(300);
          console.log("------------------/-----");
          console.log("Mickey-plus is Online 🕸\n\n");
          console.log("Loading mickey Commands ...\n");
          fs.readdirSync(__dirname + "/commandes").forEach(_0x5792df => {
            if (path.extname(_0x5792df).toLowerCase() == ".js") {
              try {
                require(__dirname + "/commandes/" + _0x5792df);
                console.log(_0x5792df + " Installed Successfully✔️");
              } catch (_0x2c16d1) {
                console.log(_0x5792df + " could not be installed due to : " + _0x2c16d1);
              }
              0;
              baileys_1.delay(300);
            }
          });
          0;
          baileys_1.delay(700);
          var _0x56cfea;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x56cfea = 'public';
          } else {
            if (conf.MODE.toLocaleLowerCase() === 'no') {
              _0x56cfea = "private";
            } else {
              _0x56cfea = "undefined";
            }
          }
          console.log("Commands Installation Completed ✅");
          await _0xc79ff2();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x6863b8 = " ⁠⁠⁠⁠\n╭─────────────━┈⊷ \n│MICKEY_PLUS\n╰─────────────━┈⊷\n│💫 ᴘʀᴇғɪx: *[ " + prefixe + " ]*\n│⭕ ᴍᴏᴅᴇ: *" + _0x56cfea + "*\n│💢 *BOT NAME* MICKEY-PLUS\n╰─────────────━┈⊷\n\n*Follow our Channel For Updates*\n> https://whatsapp.com/channel/0029Vb6B9xFCxoAseuG1g610\n                \n                \n                 ";
            await _0x197c7b.sendMessage(_0x197c7b.user.id, {
              'text': _0x6863b8
            });
          }
        } else {
          if (_0x2f552d == "close") {
            let _0x3c84b4 = new boom_1.Boom(_0x515df5?.["error"])?.["output"]["statusCode"];
            if (_0x3c84b4 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x3c84b4 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x3ade1a();
              } else {
                if (_0x3c84b4 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x3ade1a();
                } else {
                  if (_0x3c84b4 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x3c84b4 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x3c84b4 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x3ade1a();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x3c84b4);
                        const {
                          exec: _0xaa9dd1
                        } = require("child_process");
                        _0xaa9dd1("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
            console.log("hum " + _0x2f552d);
            _0x3ade1a();
          }
        }
      }
    });
    _0x197c7b.ev.on("creds.update", _0x5dd7a5);
    _0x197c7b.downloadAndSaveMediaMessage = async (_0x18533f, _0x1d184a = '', _0x33e139 = true) => {
      let _0x2d3a2d = _0x18533f.msg ? _0x18533f.msg : _0x18533f;
      let _0xcba4bb = (_0x18533f.msg || _0x18533f).mimetype || '';
      let _0x51f327 = _0x18533f.mtype ? _0x18533f.mtype.replace(/Message/gi, '') : _0xcba4bb.split('/')[0];
      0;
      const _0x109779 = await baileys_1.downloadContentFromMessage(_0x2d3a2d, _0x51f327);
      let _0x2dc1db = Buffer.from([]);
      for await (const _0x44c083 of _0x109779) {
        _0x2dc1db = Buffer.concat([_0x2dc1db, _0x44c083]);
      }
      let _0x5f0819 = await FileType.fromBuffer(_0x2dc1db);
      let _0x56b71b = './' + _0x1d184a + '.' + _0x5f0819.ext;
      await fs.writeFileSync(_0x56b71b, _0x2dc1db);
      return _0x56b71b;
    };
    _0x197c7b.awaitForMessage = async (_0xbb63e9 = {}) => {
      return new Promise((_0x2508e1, _0x6c3c56) => {
        if (typeof _0xbb63e9 !== "object") {
          _0x6c3c56(new Error("Options must be an object"));
        }
        if (typeof _0xbb63e9.sender !== 'string') {
          _0x6c3c56(new Error("Sender must be a string"));
        }
        if (typeof _0xbb63e9.chatJid !== "string") {
          _0x6c3c56(new Error("ChatJid must be a string"));
        }
        if (_0xbb63e9.timeout && typeof _0xbb63e9.timeout !== "number") {
          _0x6c3c56(new Error("Timeout must be a number"));
        }
        if (_0xbb63e9.filter && typeof _0xbb63e9.filter !== 'function') {
          _0x6c3c56(new Error("Filter must be a function"));
        }
        const _0x1886be = _0xbb63e9?.['timeout'] || undefined;
        const _0x5c953c = _0xbb63e9?.["filter"] || (() => true);
        let _0x481988 = undefined;
        let _0x5f53ac = _0x1433fc => {
          let {
            type: _0xab972d,
            messages: _0x2a386b
          } = _0x1433fc;
          if (_0xab972d == "notify") {
            for (let _0x47ffec of _0x2a386b) {
              const _0x4ffc5a = _0x47ffec.key.fromMe;
              const _0x210040 = _0x47ffec.key.remoteJid;
              const _0x2fdf0c = _0x210040.endsWith("@g.us");
              const _0x351ce3 = _0x210040 == "status@broadcast";
              const _0x59a195 = _0x4ffc5a ? _0x197c7b.user.id.replace(/:.*@/g, '@') : _0x2fdf0c || _0x351ce3 ? _0x47ffec.key.participant.replace(/:.*@/g, '@') : _0x210040;
              if (_0x59a195 == _0xbb63e9.sender && _0x210040 == _0xbb63e9.chatJid && _0x5c953c(_0x47ffec)) {
                _0x197c7b.ev.off('messages.upsert', _0x5f53ac);
                clearTimeout(_0x481988);
                _0x2508e1(_0x47ffec);
              }
            }
          }
        };
        _0x197c7b.ev.on('messages.upsert', _0x5f53ac);
        if (_0x1886be) {
          _0x481988 = setTimeout(() => {
            _0x197c7b.ev.off('messages.upsert', _0x5f53ac);
            _0x6c3c56(new Error("Timeout"));
          }, _0x1886be);
        }
      });
    };
    return _0x197c7b;
  }
  let _0x416e57 = require.resolve(__filename);
  fs.watchFile(_0x416e57, () => {
    fs.unwatchFile(_0x416e57);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x416e57];
    require(_0x416e57);
  });
  _0x3ade1a();
}, 5000);
