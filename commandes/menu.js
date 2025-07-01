const {
  zokou
} = require(__dirname + '/../framework/zokou');
const {
  format
} = require(__dirname + '/../framework/mesfonctions');
const os = require('os');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
function createVCard() {
  return {
    'key': {
      'fromMe': false,
      'participant': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast'
    },
    'message': {
      'contactMessage': {
        'displayName': "MICKEY",
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:MICKEY\nitem1.TEL;waid=255612130973:255711765335\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
      }
    }
  };
}
function getGreeting(_0x4ff66e) {
  const _0x27812d = moment().hour();
  if (_0x27812d >= 0x5 && _0x27812d < 0xc) {
    return "🌅☀️ Good morning, *" + _0x4ff66e + '*!';
  }
  if (_0x27812d >= 0xc && _0x27812d < 0x11) {
    return "☀️😎 Good afternoon, *" + _0x4ff66e + '*!';
  }
  if (_0x27812d >= 0x11 && _0x27812d < 0x15) {
    return "🌆✨ Good evening, *" + _0x4ff66e + '*!';
  }
  return "🌙😴 Good night, *" + _0x4ff66e + '*!';
}
function buildMenu(_0x38dac4, _0x242839, _0xd022c6) {
  moment.tz.setDefault("Africa/Nairobi");
  const _0x5697a1 = _0x242839.replace(/[*_~`]/g, '') || "User";
  const _0x5a888c = getGreeting(_0x5697a1);
  const _0x370fb7 = String.fromCharCode(0x200e).repeat(0xfa1);
  const _0x11290d = moment().format('HH:mm:ss');
  const _0xf3e0e0 = moment().format("DD/MM/YYYY");
  const _0x54008b = os.totalmem();
  const _0x210020 = _0x54008b - os.freemem();
  const _0x5f4e76 = Object.values(_0xd022c6).reduce((_0x4228b3, _0x1bee11) => _0x4228b3 + _0x1bee11.length, 0x0);
  let _0x55b6a5 = "\n\n📜 COMMAND LIST\n";
  for (const _0x4c109c in _0xd022c6) {
    _0x55b6a5 += "\n╭─「 *" + _0x4c109c.toUpperCase() + "* 」\n";
    _0x55b6a5 += "│ " + _0xd022c6[_0x4c109c].map(_0x3ff3ca => '' + _0x38dac4 + _0x3ff3ca).join("\n│ ") + "\n";
    _0x55b6a5 += "╰───────────────⊷";
  }
  return "╭━━ ⌜  *MICKEY-PLUS*  ⌟ ━━⊷❍\n┃ 👤 ʙᴏᴛ ᴜsᴇʀ: *" + _0x5697a1 + "*\n┃ 🌍 ᴍᴏᴅᴇ: *" + (s.MODE.toLowerCase() !== 'yes' ? 'private' : 'public') + "*\n┃ 🔤 ᴘʀᴇғɪx: [ " + _0x38dac4 + " ]\n┃ 💻 ᴘʟᴀᴛғᴏʀᴍ: *linux*\n┃ 📅 ᴅᴀᴛᴇ: *" + _0xf3e0e0 + "*\n┃ ⏰ ᴛɪᴍᴇ: *" + _0x11290d + "*\n┃ 📚 ᴄᴏᴍᴍᴀɴᴅs: *" + _0x5f4e76 + "*\n┃ 💾 ᴄᴀᴘᴀᴄɪᴛʏ: *" + format(_0x210020) + '/' + format(_0x54008b) + "*\n╰━━━━━━━━━━━━━━━━━━━━━━⊷❍\n\n" + _0x5a888c + "\n\n" + _0x370fb7 + "\n" + _0x55b6a5;
}
zokou({
  'nomCom': "menu",
  'categorie': "General",
  'reaction': '📋'
}, async (_0x1ec11a, _0xcdf709, {
  ms: _0x4a0116,
  repondre: _0x3bba52,
  prefixe: _0x520bab,
  nomAuteurMessage: _0x129929
}) => {
  try {
    const {
      cm: _0xcd50de
    } = require(__dirname + '/../framework/zokou');
    const _0x2806cb = {};
    _0xcd50de.forEach(_0x4b71e8 => {
      if (!_0x2806cb[_0x4b71e8.categorie]) {
        _0x2806cb[_0x4b71e8.categorie] = [];
      }
      _0x2806cb[_0x4b71e8.categorie].push(_0x4b71e8.nomCom);
    });
    const _0x5f22be = _0x4a0116.pushName || _0x129929 || "User";
    await _0xcdf709.sendMessage(_0x1ec11a, {
      'image': {
        'url': "https://files.catbox.moe/hz6aaj.jpg"
      },
      'caption': buildMenu(_0x520bab, _0x5f22be, _0x2806cb),
      'footer': "MICKEY-PLUS • Powered by mickey"
    }, {
      'quoted': {
        'key': {
          'fromMe': false,
          'participant': '0@s.whatsapp.net',
          'remoteJid': 'status@broadcast'
        },
        'message': {
          'contactMessage': {
            'displayName': "MICKEY-PLUS",
            'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:MICKEY-PLUS\nitem1.TEL;waid=255612130873:255711765335\nitem1.X-ABLabel:Ponsel\nEND:VCARD"
          }
        }
      }
    });
    const _0x343768 = ["https://files.catbox.moe/0mdw00.m4a", "https://files.catbox.moe/73pztj.mp3", 'https://files.catbox.moe/0mdw00.m4a'];
    await _0xcdf709.sendMessage(_0x1ec11a, {
      'audio': {
        'url': _0x343768[Math.floor(Math.random() * _0x343768.length)]
      },
      'mimetype': "audio/mpeg",
      'ptt': true
    });
  } catch (_0x544bc6) {
    console.error("Menu Error:", _0x544bc6);
    _0x3bba52("❌ Error generating menu");
  }
});
