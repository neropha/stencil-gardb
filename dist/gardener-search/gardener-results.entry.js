import { r as registerInstance, d as createEvent, h, H as Host } from './core-93a7cc70.js';

const Results = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.page = 1;
        this.itemsPerPage = 50;
        this.recordSelected = createEvent(this, "recordSelected", 7);
    }
    componentWillRender() {
        this.total = this.results.length;
        this.pages = Math.ceil(this.total / this.itemsPerPage);
    }
    watchHandler(newValue, oldValue) {
        if (newValue != oldValue) {
            this.page = 1;
        }
    }
    firstItemShown() {
        return (this.itemsPerPage * this.page) - this.itemsPerPage;
    }
    lastItemShown() {
        let lastCount = this.itemsPerPage * this.page;
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
    recordSelectedHandler(e, record) {
        e.preventDefault();
        this.recordSelected.emit(record);
    }
    changePageHandler(event) {
        console.log('Received the custom pageSelected event: ', event.detail);
        this.selectedRecord = event.detail;
        this.page = event.detail;
        this.pagedResult();
    }
    resultInfo() {
        return (h("div", { class: "py-3 py-md-4 small" }, 'Zeige ', (this.total > 0)
            ? (this.firstItemShown() + 1) + '–' + this.lastItemShown() + ' von ' + this.total + ' Ergebnissen'
            : this.firstItemShown() + ' Ergebnisse'));
    }
    render() {
        return (h(Host, null, h("div", { id: "results" }, this.resultInfo(), h("table", { class: "table stacktable border-bottom" }, h("thead", null, h("tr", null, h("th", { class: "person" }, "Person"), h("th", { class: "content" }, "Inhalt"), h("th", { class: "type" }, "Dokumententyp"), h("th", { class: "year" }, "Jahr"), h("th", { class: "author" }, "Autor"), h("th", { class: "details" }, "\u00A0"))), h("tbody", null, this.pagedResult().map((gardener) => h("tr", null, h("td", null, gardener.Person), h("td", null, gardener.Inhalt), h("td", null, gardener.Dokumententyp), h("td", null, gardener.Jahr), h("td", null, gardener.Autor), h("td", null, h("a", { class: "link", title: "Details", href: "#", onClick: (e) => this.recordSelectedHandler(e, gardener) }, h("i", { class: "fa fa-info-circle fa-lg" }))))))), h("results-pagination", { "current-page": this.page, pages: this.pages }))));
    }
    static get watchers() { return {
        "results": ["watchHandler"]
    }; }
    static get style() { return ":root {\n  --gs-container-max-width: 1280px;\n  --gs-container-padding: 50px;\n  --gs-color-bg: #efefef;\n  --gs-color-primary: #71BC51;\n  --gs-color-secondary: #2196F3;\n  --gs-color-text: #333;\n  --gs-color-border: #999;\n  --gs-color-disabled: #ccc;\n  --gs-color-background: #fff;\n  --gs-border-radius: 5px;\n  --gs-border-radius-small: 2px;\n  --gs-font-size-base: 15px;\n  --gs-button-primary: var(--gs-color-primary);\n  --gs-button-primary-focus-color: #c1d6b7;\n  --gs-button-primary-border: var(--gs-color-primary);\n  --gs-button-light: #FFF;\n}\n\ngardener-results {\n  display: block;\n  overflow: hidden;\n}\ngardener-results #results {\n  width: 100%;\n  overflow: hidden;\n}\ngardener-results table {\n  table-layout: auto;\n  width: 100%;\n}\ngardener-results table .person {\n  width: 20em;\n}\ngardener-results table .id {\n  width: 4em;\n  overflow: hidden;\n  white-space: nowrap;\n}\ngardener-results table .year {\n  width: 4em;\n  overflow: hidden;\n  white-space: nowrap;\n}\ngardener-results table .details {\n  width: 1em;\n  overflow: hidden;\n  white-space: nowrap;\n}\ngardener-results table .author {\n  min-width: 12em;\n}\ngardener-results table a.link {\n  padding: 0.25em;\n  display: block;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -ms-flex-align: center;\n  align-items: center;\n  text-decoration: none;\n}\ngardener-results table td {\n  overflow: hidden;\n}"; }
};

export { Results as gardener_results };
