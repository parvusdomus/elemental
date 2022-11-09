import elementalActorSheet from "./modules/myActorSheet.js";
import elementalNPCSheet from "./modules/myNPCSheet.js";
import elementalVehicleSheet from "./modules/myVehicleSheet.js";
import elementalItemSheet from "./modules/myItemSheet.js";

//import vdsItemSheet from "./modules/myItemSheet.js";

import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";

Hooks.once("init", function(){
    console.log("test | Initializing Elemental");

    Actors.unregisterSheet("core", ActorSheet);
    Items.unregisterSheet("core", ItemSheet);
    Actors.registerSheet("elemental", elementalActorSheet, {makeDefault: true, types: ["Player"]});
    Actors.registerSheet("elemental", elementalNPCSheet, {makeDefault: true, types: ["NPC"]});
    Actors.registerSheet("elemental", elementalVehicleSheet, {makeDefault: true, types: ["Vehicle"]});
    Items.registerSheet("elemental", elementalItemSheet, {makeDefault: true, types: ["Item", "Armor", "Weapon", "Skill", "Flaw", "Spell"]});

    console.log("test | CHARSHEETS READY"); 

    console.log ("test | LOADING TEMPLATES");
    preloadHandlebarsTemplates();
    console.log ("test | DONE LOADING TEMPLATES");
});