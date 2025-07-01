
const { zokou } = require('../framework/zokou');
const { attribuerUnevaleur } = require('../bdd/welcome');

async function events(nomCom) {
    zokou({
        nomCom: "events",
        categorie: 'Group'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser, verifAdmin } = commandeOptions;

        if (verifAdmin || superUser) {
            if (!arg[0] || arg.join(' ') === ' ') {
                repondre(events + ' ' + ' on to active and ' + ' ' + events + ' ' + 'off to put off');
            } else {
                if (arg[0] === 'on' || arg[0] === 'off') {
                    
                    await attribuerUnevaleur(dest, nomCom, arg[0]);
                    repondre( events + "is actualised on " + arg[0]);
                } else {
                    repondre('on for active and off for desactive');
                }
            }
        } else {
            repondre('You can\'t use this command lol ');
        }
    });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote') ;
