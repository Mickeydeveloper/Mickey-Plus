const { zokou } = require("../framework/zokou");

zokou(
  { nomCom: "makeadmin", categorie: "Group", reaction: "👨🏿‍💼" },
  async (dest, zk, commandeOptions) => {
    let {
      repondre,
      msgRepondu,
      infosGroupe,
      auteurMsgRepondu,
      verifGroupe,
      auteurMessage,
      superUser,
      idBot,
    } = commandeOptions;

    if (!verifGroupe) return repondre("This command works only in groups.");

    const membresGroupe = infosGroupe.participants;

    const isMember = (user) => {
      return membresGroupe.some((m) => m.id === user);
    };

    const getAdmins = (members) => {
      return members.filter((m) => m.admin !== null).map((m) => m.id);
    };

    const groupAdmins = getAdmins(membresGroupe);

    const isTargetAdmin = groupAdmins.includes(auteurMsgRepondu);
    const isTargetMember = isMember(auteurMsgRepondu);
    const isSenderAdmin = groupAdmins.includes(auteurMessage);
    const isBotAdmin = groupAdmins.includes(idBot);

    try {
      if (!msgRepondu) return repondre("Please reply to the member to be promoted.");
      if (!isSenderAdmin && !superUser)
        return repondre("You must be an admin to use this command.");
      if (!isBotAdmin) return repondre("I need to be an admin to promote members.");
      if (!isTargetMember)
        return repondre("The user you replied to is not in this group.");
      if (isTargetAdmin)
        return repondre("This member is already an administrator of the group.");

      await zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "promote");

      const txt = `🎊 @${auteurMsgRepondu.split("@")[0]} has been promoted to admin.`;
      await zk.sendMessage(dest, { text: txt, mentions: [auteurMsgRepondu] });
    } catch (e) {
      repondre("Oops: " + e);
    }
  }
);
