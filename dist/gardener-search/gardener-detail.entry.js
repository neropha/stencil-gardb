import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-e1351b7d.js';

const detailCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-detail{display:block;position:relative}gardener-detail .close{font-size:inherit;outline:none;border:0 none;transition:0.5s cubic-bezier(0.075, 0.82, 0.165, 1)}gardener-detail .close:focus,gardener-detail .close:hover{outline:none;transform:translateX(-5%)}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}";

const Detail = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
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
            return (h(Host, { id: "id" + this.record.ID, class: "mt-5" }, h("button", { type: "button", class: "close btn-sm mt-3 mr-3", "aria-label": "Close", onClick: e => this.closeDetail(e) }, "Zur\u00FCck ", h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), h("div", { class: "border p-3 mt-3" }, h("h2", { class: "mb-3 mb-md-4" }, this.record.Person), h("table", { class: "table border-bottom stacktable" }, Object.keys(this.cleanRecord).map(key => (h("tr", null, h("td", { class: "label" }, h("strong", null, key)), h("td", null, this.cleanRecord[key]))))))));
        }
    }
    get element() { return getElement(this); }
};
Detail.style = detailCss;

export { Detail as gardener_detail };
