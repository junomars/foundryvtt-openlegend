// import handlebars_helpers from "handlebars-helpers";
//
// const helpers = handlebars_helpers(['math']);
// //=> only the `math` helpers
import ActorSheetOpenLegend from "./base.js";

export default class OpenLegendCharacterSheet extends ActorSheetOpenLegend {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["openlegend", "sheet", "actor", "character"],
            width: 720,
            height: 680
        });
    }


    get template() {
        console.log("openlegend | OpenLegendCharacterSheet.template()");
        const path = "systems/openlegend/templates/sheets/";
        return `${path}/${this.actor.data.type}-sheet.hbs`;
    }

    getData(options) {
        const data = super.getData();

        data.config = CONFIG.openlegend;
        data.weapons = this.actor.data.items.filter(function (item) { return item.type === "weapon" });

        return data;
    }
}
