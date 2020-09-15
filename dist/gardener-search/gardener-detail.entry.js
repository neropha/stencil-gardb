import { r as registerInstance, d as createEvent, h, H as Host } from './core-93a7cc70.js';

const Detail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
        this.recordSelected = createEvent(this, "recordSelected", 7);
    }
    componentDidLoad() {
        var top = document.querySelector('main').offsetTop;
        window.scrollTo(0, top);
    }
    render() {
        if (this.record) {
            return (h(Host, { id: "detail" }, h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: (e) => this.closeDetail(e) }, "Zur\u00FCck ", h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), h("h4", { class: "mb-3 mb-md-4" }, this.record.Person), h("table", { class: "table border-bottom stacktable" }, Object.keys(this.record).map(key => (h("tr", null, h("td", { class: "label" }, h("strong", null, key)), h("td", null, this.record[key])))))));
        }
    }
    static get style() { return ":root {\n  --gs-container-max-width: 1280px;\n  --gs-container-padding: 50px;\n  --gs-color-bg: #efefef;\n  --gs-color-primary: #71BC51;\n  --gs-color-secondary: #2196F3;\n  --gs-color-text: #333;\n  --gs-color-border: #999;\n  --gs-color-disabled: #ccc;\n  --gs-color-background: #fff;\n  --gs-border-radius: 5px;\n  --gs-border-radius-small: 2px;\n  --gs-font-size-base: 15px;\n  --gs-button-primary: var(--gs-color-primary);\n  --gs-button-primary-focus-color: #c1d6b7;\n  --gs-button-primary-border: var(--gs-color-primary);\n  --gs-button-light: #FFF;\n}\n\ngardener-detail {\n  display: block;\n}\ngardener-detail .close {\n  font-size: inherit;\n}\ngardener-detail table {\n  table-layout: auto;\n}\ngardener-detail table .label {\n  width: 12em;\n  text-transform: capitalize;\n}"; }
};

export { Detail as gardener_detail };
