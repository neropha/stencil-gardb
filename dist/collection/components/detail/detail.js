import { Component, Host, h, Prop, State } from "@stencil/core";
import { Event, Listen } from "@stencil/core";
export class Detail {
    constructor() {
        this.cleanRecord = [];
        this.hideColumns = [
            "location",
            "reserve01",
            "reserve02",
            "sourcefile",
            "created",
            "updated",
        ];
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
            window.location.hash = "results";
        };
    }
    handleScroll(ev) {
        console.log(window.location.hash, ev);
        if (window.location.hash == '#results') {
            this.closeDetail(ev);
        }
    }
    componentWillLoad() {
        for (const [key, value] of Object.entries(this.record)) {
            // console.log(`${key}: ${value}`);
            if (!this.hideColumns.includes(key)) {
                this.cleanRecord = Object.assign(Object.assign({}, this.cleanRecord), { [key]: value });
            }
        }
        // console.log(this.cleanRecord);
    }
    componentDidLoad() {
        var top = document.querySelector("main").offsetTop;
        window.scrollTo(0, top);
    }
    render() {
        if (this.cleanRecord) {
            return (h(Host, { id: "id" + this.record.ID },
                h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: e => this.closeDetail(e) },
                    "Zur\u00FCck ",
                    h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })),
                h("h4", { class: "mb-3 mb-md-4" }, this.record.Person),
                h("table", { class: "table border-bottom stacktable" }, Object.keys(this.cleanRecord).map(key => (h("tr", null,
                    h("td", { class: "label" },
                        h("strong", null, key)),
                    h("td", null, this.cleanRecord[key])))))));
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
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get listeners() { return [{
            "name": "hashchange",
            "method": "handleScroll",
            "target": "window",
            "capture": false,
            "passive": false
        }]; }
}
