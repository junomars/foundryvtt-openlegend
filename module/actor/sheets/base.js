import {openlegend} from "../../config.js";

export default class ActorSheetOpenLegend extends ActorSheet {
    constructor(...args) {
        super(...args);
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }


    getData(options) {
        // Basic data
        let isOwner = this.entity.owner;
        const data = {
            owner: isOwner,
            editable: this.isEditable,
            cssClass: isOwner ? "editable" : "locked",
            isCharacter: this.entity.data.type === "character",
            isNPC: this.entity.data.type === "npc",
            isVehicle: this.entity.data.type === "boss",
            config: CONFIG.openlegend,
        }

        data.actor = duplicate(this.actor.data);
        data.data = data.actor.data;

        // Return data to the sheet
        return data
    }
}
