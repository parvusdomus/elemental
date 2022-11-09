//import vdsActorSheet from "./modules/myActorSheet.js";
//import vdsItemSheet from "./modules/myItemSheet.js";

import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
    console.log("test | Initializing Elemental");

    //Actors.unregisterSheet("core", ActorSheet);
    //Items.unregisterSheet("core", ItemSheet);
    //Actors.registerSheet("vds", vdsActorSheet, {makeDefault: true, types: ["Human", "Immortal"]});
    //Items.registerSheet("vds", vdsItemSheet, {makeDefault: true, types: ["Item", "Armor", "Skill", "Rune"]});

    console.log("test | CHARSHEETS READY"); 

    console.log ("test | LOADING TEMPLATES");
    preloadHandlebarsTemplates();
    console.log ("test | DONE LOADING TEMPLATES");
});