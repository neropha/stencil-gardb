import { r as registerInstance, f as createEvent, h, e as Host } from './index-e1351b7d.js';

const resultsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-results{display:block;overflow:hidden;width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:0.25em;display:block;display:flex;justify-content:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}";

const Results = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
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
        return (h("div", { class: "py-3 py-md-4 small" }, "Zeige ", this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"));
    }
    render() {
        return (h(Host, null, this.resultInfo(), h("table", { class: "table stacktable border-bottom" }, h("thead", null, h("tr", null, h("th", { class: "person" }, "Person"), h("th", { class: "content" }, "Inhalt"), h("th", { class: "type" }, "Dokumententyp"), h("th", { class: "year" }, "Jahr"), h("th", { class: "author" }, "Autor"), h("th", { class: "details" }, "\u00A0"))), h("tbody", null, this.pagedResult().map(gardener => (h("tr", null, h("td", null, gardener.Person), h("td", null, gardener.Inhalt), h("td", null, gardener.Dokumententyp), h("td", null, gardener.Jahr), h("td", null, gardener.Autor), h("td", null, h("a", { class: "link", title: "Details", href: '#id' + gardener['ID'], onClick: e => this.recordSelectedHandler(gardener.ID) }, h("i", { class: "fa fa-info-circle fa-lg" })))))))), h("results-pagination", { "current-page": this.currentPage, pages: this.pages })));
    }
    static get watchers() { return {
        "results": ["watchHandler"]
    }; }
};
Results.style = resultsCss;

export { Results as gardener_results };
