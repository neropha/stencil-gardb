import { Component, Host, h, Prop, State, Watch, Listen } from "@stencil/core";
import { Event } from "@stencil/core";
export class Results {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 50;
    }
    componentWillRender() {
        this.total = this.results.length;
        this.pages = Math.ceil(this.total / this.itemsPerPage);
    }
    watchHandler(newValue, oldValue) {
        if (newValue != oldValue) {
            this.currentPage = 1;
        }
    }
    firstItemShown() {
        return this.itemsPerPage * this.currentPage - this.itemsPerPage;
    }
    lastItemShown() {
        let lastCount = this.itemsPerPage * this.currentPage;
        let last;
        if (lastCount > this.total) {
            last = this.total;
        }
        else {
            last = lastCount;
        }
        return last;
    }
    pagedResult() {
        return this.results.slice(this.firstItemShown(), this.lastItemShown());
    }
    recordSelectedHandler(record) {
        this.recordSelected.emit(record);
    }
    changePageHandler(event) {
        this.currentPage = event.detail;
        this.pagedResult();
    }
    resultInfo() {
        return (h("div", { class: "py-3 py-md-4 small" },
            "Zeige ",
            this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"));
    }
    render() {
        return (h(Host, null,
            this.resultInfo(),
            h("table", { class: "table stacktable border-bottom" },
                h("thead", null,
                    h("tr", null,
                        h("th", { class: "person" }, "Person"),
                        h("th", { class: "content" }, "Inhalt"),
                        h("th", { class: "type" }, "Dokumententyp"),
                        h("th", { class: "year" }, "Jahr"),
                        h("th", { class: "author" }, "Autor"),
                        h("th", { class: "details" }, "\u00A0"))),
                h("tbody", null, this.pagedResult().map(gardener => (h("tr", null,
                    h("td", null, gardener.Person),
                    h("td", null, gardener.Inhalt),
                    h("td", null, gardener.Dokumententyp),
                    h("td", null, gardener.Jahr),
                    h("td", null, gardener.Autor),
                    h("td", null,
                        h("a", { class: "link", title: "Details", href: '#id' + gardener['ID'], onClick: () => this.recordSelectedHandler(gardener.ID) },
                            h("i", { class: "fa fa-info-circle fa-lg" })))))))),
            h("results-pagination", { "current-page": this.currentPage, pages: this.pages })));
    }
    static get is() { return "gardener-results"; }
    static get originalStyleUrls() { return {
        "$": ["results.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["results.css"]
    }; }
    static get properties() { return {
        "results": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "results",
            "reflect": false
        }
    }; }
    static get states() { return {
        "currentPage": {},
        "selectedRecord": {},
        "pages": {},
        "currentRecord": {}
    }; }
    static get events() { return [{
            "method": "recordSelected",
            "name": "recordSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "CustomEvent",
                "resolved": "CustomEvent<any>",
                "references": {
                    "CustomEvent": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get watchers() { return [{
            "propName": "results",
            "methodName": "watchHandler"
        }]; }
    static get listeners() { return [{
            "name": "pageSelected",
            "method": "changePageHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
