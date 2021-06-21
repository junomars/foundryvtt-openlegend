import { openlegend } from "./module/config.js";
import OpenLegendItemSheet from "./module/actor/sheets/OpenLegendItemSheet.js";
// import OpenLegendBossSheet from "./module/sheets/OpenLegendBossSheet.js";
import OpenLegendCharacterSheet from "./module/actor/sheets/OpenLegendCharacterSheet.js";
// import OpenLegendNpcSheet from "./module/sheets/OpenLegendNpcSheet.js";

async function preloadHandlebarsTemplates() {
    const templatePaths = [
        "systems/openlegend/templates/partials/character-stat-block.hbs",
        "systems/openlegend/templates/partials/item-description.hbs",
        "systems/openlegend/templates/partials/weapon-card.hbs",
    ];

    return loadTemplates(templatePaths);
}

Hooks.once("init", function () {
    console.log("openlegend | Initializing Open Legend system");

    CONFIG.openlegend = openlegend;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("openlegend", OpenLegendItemSheet, { makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("openlegend", OpenLegendCharacterSheet, { makeDefault: true });

    preloadHandlebarsTemplates();
});
