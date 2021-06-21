import {openlegend} from "../config.js";

/**
 * Extend the base Actor class to implement additional system-specific logic.
 */
export default class ActorOpenLegend extends Actor {
    get isPolymorphed() {
        return this.getFlag("openlegend", "isPolymorphed") || false;
    }

    /** @override */
    prepareBaseData() {
        switch ( this.data.type ) {
            case "character":
                return this._prepareCharacterData(this.data);
            case "boss":
                return this._prepareBossData(this.data);
            case "npc":
                return this._prepareNPCData(this.data);
        }
    }

    /** @override */
    prepareDerivedData() {
        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags.openlegend || {};
        const bonuses = getProperty(data, "bonuses.attributes") || {}

        // Retrieve data for polymorphed actors
        if (this.isPolymorphed) {

        }

        // Attribute modifiers
        // map boons, banes and feats

        // Determine initiative
        const init = data.abilities.agility;
    }

    /* ---------------------------------------------------------------------------------------------------------------*/
    /* Data preparation helpers                                                                                       */
    /* ---------------------------------------------------------------------------------------------------------------*/
    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {
        const data = actorData.data;

        // Determine xp stuff
        const xp = data.xp;
        xp.max = (data.level || 1) * 3;
        xp.pct = xp.value % 3 * 33;
    }

    /**
     * Prepare boss type specific data
     */
    _prepareBossData(actorData) {
    }

    /**
     * Prepare NPC type specific data
     */
    _prepareNPCData(actorData) {
    }
}
