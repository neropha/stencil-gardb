import { Component, Host, h, Prop, State, Element } from "@stencil/core";
import { Event, Listen } from "@stencil/core";
export class Detail {
    constructor() {
        this.cleanRecord = [];
        this.hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
    }
    handleScroll(ev) {
        if (window.location.hash == "#results") {
            this.closeDetail(ev);
        }
    }
    recordSelectedHandler(record) {
        this.recordSelected.emit(record);
    }
    componentWillLoad() {
        for (const [key, value] of Object.entries(this.record)) {
            if (!this.hideColumns.includes(key)) {
                this.cleanRecord = Object.assign(Object.assign({}, this.cleanRecord), { [key]: value });
            }
        }
    }
    componentDidLoad() {
        this.element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
    render() {
        if (this.cleanRecord) {
            return (h(Host, { id: "id" + this.record.ID, class: "mt-5" },
                h("button", { type: "button", class: "close btn-sm mt-3 mr-3", "aria-label": "Close", onClick: e => this.closeDetail(e) },
                    "Zur\u00FCck ",
                    h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })),
                h("div", { class: "border p-3 mt-3" },
                    h("h2", { class: "mb-3 mb-md-4" }, this.record.Person),
                    h("table", { class: "table border-bottom stacktable" }, Object.keys(this.cleanRecord).map(key => (h("tr", null,
                        h("td", { class: "label" },
                            h("strong", null, key)),
                        h("td", null, this.cleanRecord[key]))))))));
        }
    }
    static get is() { return "gardener-detail"; }
    static get originalStyleUrls() { return {
        "$": ["detail.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["detail.css"]
    }; }
    static get properties() { return {
        "record": {
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
            "attribute": "record",
            "reflect": false
        }
    }; }
    static get states() { return {
        "cleanRecord": {}
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
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "hashchange",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
