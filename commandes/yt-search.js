const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require('fs');

// Recherche YouTube
zokou({
  nomCom: "yts",
  categorie: "Recherche",
  reaction: "✋"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query) {
    repondre("Veuillez entrer un terme de recherche s'il vous plaît.");
    return;
  }

  try {
    const info = await yts(query);
    const resultat = info.videos;

    if (!resultat || resultat.length === 0) {
      repondre("Aucun résultat trouvé.");
      return;
    }

    let captions = "";
    for (let i = 0; i < Math.min(10, resultat.length); i++) {
      captions += `----------------\nTitre : ${resultat[i].title}\nDurée : ${resultat[i].timestamp}\nLien : ${resultat[i].url}\n`;
    }
    captions += "\n======\n*powered by Zokou-Md*";

    zk.sendMessage(dest, { image: { url: resultat[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("Erreur lors de la procédure : " + error.message);
  }
});

// Téléchargement vidéo YouTube
zokou({
  nomCom: "ytmp4",
  categorie: "Téléchargement",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez entrer un lien YouTube s'il vous plaît.");
    return;
  }

  const topo = arg.join(" ");
  try {
    const videoInfo = await ytdl.getInfo(topo);
    const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });

    if (!format || !format.url) {
      repondre("Impossible de trouver un format vidéo approprié.");
      return;
    }

    const filename = 'video.mp4';
    const videoStream = ytdl.downloadFromInfo(videoInfo, { format });
    const fileStream = fs.createWriteStream(filename);
    videoStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(
        origineMessage,
        { video: { url: `./${filename}` }, caption: "Powered by *Zokou-Md*", gifPlayback: false },
        { quoted: ms }
      );
    });

    fileStream.on('error', (error) => {
      console.error('Erreur lors de l\'écriture du fichier vidéo :', error);
      repondre('Une erreur est survenue lors de l\'écriture du fichier vidéo.');
    });

  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Une erreur est survenue lors du téléchargement de la vidéo.');
  }
});

// Téléchargement audio YouTube
zokou({
  nomCom: "ytmp3",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const audioStream = ytdl(topo, { filter: 'audioonly', quality: 'highestaudio' });
    const filename = 'audio.mp3';
    const fileStream = fs.createWriteStream(filename);
    audioStream.pipe(fileStream);

    fileStream.on('finish', () => {
      zk.sendMessage(
        origineMessage,
        { audio: { url: `./${filename}` }, mimetype: 'audio/mp4' },
        { quoted: ms, ptt: false }
      );
      console.log("Envoi du fichier audio terminé !");
    });

    fileStream.on('error', (error) => {
      console.error('Erreur lors de l\'écriture du fichier audio :', error);
      repondre('Une erreur est survenue lors de l\'écriture du fichier audio.');
    });

  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'audio :', error);
    repondre('Une erreur est survenue lors du téléchargement de l\'audio.');
  }
