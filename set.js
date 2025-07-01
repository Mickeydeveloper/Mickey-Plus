
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJRdmV3TnU3RjVDTGFNeWNPWDhpR0lqM0xCd0l1SVlVdktMT2o0QVpHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUZVZ3A5VVgxR2lGT0NHaFZiL09SMjBBOVE5eTM1WjNHOGx6OFBZNVEzZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQzV5KzY5Yy85MVFxUEhGU1phMnVFTFAvM01iMU0xaUNxL2owT0VERVZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6bHlxK1ZTaVJpU2hhb3dSYnRtSm1sNEgxOWVva2ZCSjhMWlloMm82U20wPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNCVERyaHdmajhVSWNjdnlqaklOcEt2Z3J2YzdwTFlzMlc4QkU0cEZFVkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InUybzFjeFByZHpRUCsvUzd6N1ViZzJqRGNqMFBJejFzdjI5QWZWWUNEM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUEvZDQzUEFGWjQ3ZXRuNTJxOXBmb2xmMVdQVDBnUTM2bFRqZ1FaSUYzdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME82NkNwazBjcndCWHVEZzJBaXhnSUFUQXdjaUp3V3NCaldCdWNJWHdTdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRXNGU2Y3I1T0w4NDFJV1QzdEdFMmpOTEpaOUtFR05wMHRHT0R6YmlSQXRmVXZCaGtaSDQyTU1hSHBRaDVMN3M1NGN4VTE1VTRTcWhvNG9UVGhpdUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzUsImFkdlNlY3JldEtleSI6IkltTFhjUU45WHhxWkVaNmZOMnJnb2g1QlFNK2tRVDZvOXNQaHowdDR6c0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzExNzY1MzM1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijc3QkFEQkNCRUY4NTJFOUY3Rjg5RTFENDczRDg2ODg4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzOTU1NTR9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTcxMTc2NTMzNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI4MUZEQjgxMzBDNUI4RENBNzg0QzM5RjZDRTM2QjQwOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMzk1NTU1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJWQVhGVzJXUiIsIm1lIjp7ImlkIjoiMjU1NzExNzY1MzM1OjE3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTc5NjU0Nzc0Mjg0NDA1OjE3QGxpZCIsIm5hbWUiOiJCbGFjayBIb3JzZSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUGVoMU9jR0VNL1prTU1HR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYWJGTzFValA3Y0t1dFdHNU9rcWd4dlpQYXpPU0JXMkZscXMrU3lyQ3BWST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY2N3aGJFV3NQR0ozTjdDSko5ZHV0bWtTOE1pZFhDRFpNNTVmeHRxVzVRVzBnTzJuRExaQ2VSSGNDcW4xOWNuMjZjbURKN2NJL1h4SUZCbjcxcW5IQnc9PSIsImRldmljZVNpZ25hdHVyZSI6Ilk0RnNCa1BNVDIrMUJqcW5SZS90U3dNYjdJNVdvVFhoTlY2QmNLSElkMzl5YnVFYS9WUW1WRFJFbU1WbVR2Um02cTQzaVlTNU1PZWlxR0JsbWNLaERnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzExNzY1MzM1OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldteFR0Vkl6KzNDcnJWaHVUcEtvTWIyVDJzemtnVnRoWmFyUGtzcXdxVlMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTM5NTU0OSwibGFzdFByb3BIYXNoIjoiMkc0QW11IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJcEMifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "mickey",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255612130873",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'MICKEY-PLUS',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/o2klsv.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
