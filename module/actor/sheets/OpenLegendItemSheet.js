export default class OpenLegendItemSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 600,
            height: 375,
            classes: ["openlegend", "sheet", "item"],
            resizable: true,
            scrollY: [".tab.details"],
            tabs: [{navSelector: ".tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    /** @override */
    get template() {
        console.log("openlegend | OpenLegendItemSheet.template()");
        const path = "systems/openlegend/templates/sheets";
        return `${path}/${this.item.data.type}-sheet.hbs`;
    }

    /** @override */
    async getData(options) {
        const data = super.getData(options);
        data.labels = this.item.labels;
        data.config = CONFIG.openlegend;

        data.itemCategories = this._getItemCategories(data.item)
        data.itemProperties = this._getItemProperties(data.item)
        data.itemBanes = this._getItemBanes(data.item)

        return data;
    }


    _getItemCategories(item) {
        return this.getItemSelectionsFromList(item, item.data.categories, CONFIG.openlegend.weaponCategories);
    }

    _getItemProperties(item) {
        return this.getItemSelectionsFromList(item, item.data.properties, CONFIG.openlegend.weaponProperties);
    }

    _getItemBanes(item) {
        return this.getItemSelectionsFromList(item, item.data.banes, CONFIG.openlegend.banes);
    }

    getItemSelectionsFromList(item, entries, list) {
        const selections = [];

        switch (item.type) {
            case "weapon":
                selections.push(...Object.entries(entries || [])
                    .filter(p => p[1] === true)
                    .map(p => list[p[0]]));
                break;
        }

        return selections.filter(p => !!p);

    }
    /** @override */
    _getSubmitData(updateData={}) {
        // Create the expanded update data object
        const fd = new FormDataExtended(this.form, {editors: this.editors});
        let data = fd.toObject();
        if ( updateData ) data = mergeObject(data, updateData);
        else data = expandObject(data);

        // Grab wealth level
        data.data.wealthLevel = data.data.wealthLevel[1];

        // Return the flattened submission data
        return flattenObject(data);
    }



    /** @override */
    async _onSubmit(...args) {
        if ( this._tabs[0].active === "details" ) this.position.height = "auto";
        await super._onSubmit(...args);
    }
}
