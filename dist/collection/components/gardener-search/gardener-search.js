import { Component, Host, State, h, Prop, Listen } from "@stencil/core";
export class MyComponent {
    constructor() {
        this.errors = [];
        this.loading = true;
    }
    async loadData() {
        try {
            let response = await fetch(this.api, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                // Prepare for catch(err)
                throw new Error(response.status + ": " + response.statusText);
            }
            this.results = this.filteredResults = await response.json();
        }
        catch (err) {
            this.errors.push(err.message);
            this.errors.push("Datenbank konnte nicht geladen werden.");
        }
        finally {
            this.loading = false;
        }
    }
    componentWillLoad() {
        if (!this.api) {
            this.errors.push("Datenbank nicht definiert.");
        }
        else {
            this.loadData();
        }
    }
    filterResultHandler(event) {
        this.filteredResults = event.detail;
    }
    recordSelectedHandler(record) {
        if (record.detail) {
            this.selectedRecord = this.filteredResults.filter(element => (element.ID == record.detail)).shift();
            window.location.hash = "id" + record.detail;
        }
        else {
            // window.location.hash = "results";
            this.selectedRecord = null;
        }
    }
    return_errors(errors) {
        return (h(Host, null,
            h("h5", null, "Fehler"),
            errors.map(error => (h("div", null, error)))));
    }
    render() {
        if (this.errors.length) {
            return this.return_errors(this.errors);
        }
        else if (this.loading) {
            return (h(Host, null,
                h("loading-spinner", null)));
        }
        if (this.selectedRecord) {
            return (h(Host, null,
                h("filter-bar", { results: this.results }),
                h("gardener-detail", { record: this.selectedRecord })));
        }
        else {
            return (h(Host, null,
                h("filter-bar", { results: this.results }),
                h("gardener-results", { results: this.filteredResults })));
        }
    }
    static get is() { return "gardener-search"; }
    static get originalStyleUrls() { return {
        "$": ["gardener-search.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["gardener-search.css"]
    }; }
    static get properties() { return {
        "api": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "api",
            "reflect": false
        }
    }; }
    static get states() { return {
        "selectedRecord": {},
        "errors": {},
        "results": {},
        "filteredResults": {}
    }; }
    static get listeners() { return [{
            "name": "filterEvent",
            "method": "filterResultHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }, {
            "name": "recordSelected",
            "method": "recordSelectedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
