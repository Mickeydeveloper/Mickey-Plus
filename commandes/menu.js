const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `━━━━━━━━━━━━━
╭──❍「 *MICKEY-PLUS BOT MENU* 」❍
  
    *=<𝙼𝙸𝙲𝙺𝙴𝚈-𝙿𝙻𝚄𝚂 >=*
┌──────────────❍
│  *Name:* ${sender}:
│  *bot name:* Mickey-plus
│  *base:* Mickey basic
│  *version:* 1.o.o
│  *developer:* Mickey
└──────────────❍ 

${readMore}
🛠 *Available Commands* 🛠
━━━━━━━━━━━━━━━━━━━━n`;

    let menuMsg = ``;

    for (const cat in coms) {
        menuMsg += `⭐ *${cat.toUpperCase()}*\n`;
        // Group commands in pairs for better display
        for (let i = 0; i < coms[cat].length; i += 2) {
            const cmd1 = coms[cat][i] || '';
            const cmd2 = coms[cat][i + 1] ? `➤ .${coms[cat][i + 1]}` : '';
            menuMsg += `➤ .${cmd1} ${cmd2}\n`;
        }
        menuMsg += `━━━━━━━━━━━━━━━━━━━━n`;
    }

    menuMsg += `🌙 Good night! Sleep well and recharge! 😴`;

    let imageUrl = "https://files.catbox.moe/6xk8eh.jpg";

    try {
        zk.sendMessage(dest, { 
            image: { url: imageUrl }, 
            caption: infoMsg + menuMsg, 
            footer: "BWB XMD" 
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵 Menu error: " + e);
        repondre("🥵 Menu error: " + e);
    }
});
