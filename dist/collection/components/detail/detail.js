import { Host, h } from "@stencil/core";
export class Detail {
    constructor() {
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
    }
    componentDidLoad() {
        var top = document.querySelector('main').offsetTop;
        window.scrollTo(0, top);
    }
    render() {
        if (this.record) {
            return (h(Host, { id: "detail" },
                h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: (e) => this.closeDetail(e) },
                    "Zur\u00FCck ",
                    h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })),
                h("h4", { class: "mb-3 mb-md-4" }, this.record.Person),
                h("table", { class: "table border-bottom stacktable" }, Object.keys(this.record).map(key => (h("tr", null,
                    h("td", { class: "label" },
                        h("strong", null, key)),
                    h("td", null, this.record[key])))))));
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
}
