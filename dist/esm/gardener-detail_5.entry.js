import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-6bb5faa5.js';

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
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-detail{display:block}gardener-detail .close{font-size:inherit}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}"; }
};

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
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-results{display:block;overflow:hidden}gardener-results #results{width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id,gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}"; }
};

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.errors = [];
        this.loading = true;
    }
    async loadData() {
        try {
            let response = await fetch(this.api, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(response.status + ': ' + response.statusText);
            }
            this.gardb = this.filteredResult = await response.json();
        }
        catch (err) {
            this.errors.push(err.message);
            this.errors.push('Datenbank konnte nicht gelesen werden.');
        }
        finally {
            this.loading = false;
        }
    }
    componentWillLoad() {
        // console.log(this.api);
        if (!this.api) {
            this.errors.push('Datenbank konnte nicht geladen werden.');
        }
        else {
            this.loadData();
        }
    }
    filterByPerson(needle, haystack) {
        // Searches in Person and Autor
        let indexedFields = [haystack.Person, haystack.Autor].join().toLowerCase();
        return indexedFields.includes(needle);
    }
    filterByYear(needle, haystack) {
        let indexedFields = haystack.Jahr;
        return indexedFields.includes(needle);
    }
    filterByKeyword(needle, haystack) {
        // Searches in Inhalt | Dokumententyp | Zeitschrift | 
        let indexedFields = [haystack.Inhalt, haystack.Dokumententyp, haystack.Zeitschrift].join().toLowerCase();
        return indexedFields.includes(needle);
    }
    filterByInitial(needle, haystack) {
        if (haystack.Person && haystack.Person.length > 0) {
            var name = haystack.Person.toLowerCase();
            if (!name.startsWith(needle)) {
                return false;
            }
        }
        else {
            return false;
        }
        console.log('filteredByInitial: ', name);
        return true;
    }
    filterResults(e) {
        e.preventDefault();
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.filteredResult = this.gardb;
        this.inputs.forEach((input) => {
            let value = input.value.toLowerCase();
            if (input.value.length > 0) {
                if (input.id == "person") {
                    this.filteredResult = this.filteredResult.filter(record => this.filterByPerson(value, record));
                }
                if (input.id == "year") {
                    this.filteredResult = this.filteredResult.filter(record => this.filterByYear(value, record));
                }
                if (input.id == "keyword") {
                    this.filteredResult = this.filteredResult.filter(record => this.filterByKeyword(value, record));
                }
            }
        });
    }
    filterReset(e) {
        e.preventDefault();
        this.filteredResult = this.gardb;
        this.selectedRecord = undefined;
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.inputs.forEach((input) => {
            input.value = "";
        });
    }
    filterLetter(e) {
        e.preventDefault();
        this.filterReset(e);
        this.filteredResult = this.gardb;
        var letter = e.toElement.innerText.toLowerCase();
        this.filteredResult = this.filteredResult.filter(record => this.filterByInitial(letter, record));
    }
    glossar() {
        let glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var output = [];
        glossary.forEach((element) => {
            element = h("li", null, h("a", { href: "#", onClick: (e) => this.filterLetter(e) }, element));
            output.push(element);
        });
        return output;
    }
    todoCompletedHandler(event) {
        console.log('Received the custom recordSelected event: ', event.detail);
        this.selectedRecord = event.detail;
    }
    return_errors() {
        return (h(Host, null, h("h5", null, "Fehler"), this.errors.map((error) => h("div", null, error))));
    }
    return_record() {
        return (h(Host, { id: "top" }, h("gardener-detail", { record: this.selectedRecord })));
    }
    render() {
        if (this.errors.length > 0) {
            return this.return_errors();
        }
        if (this.selectedRecord) {
            return this.return_record();
        }
        else if (this.api) {
            return (h(Host, { id: "top" }, h("div", { class: "gardener-search-wrapper" }, h("div", { class: "gardener-search-container" }, h("form", { id: "form", class: "gardener-search-filter" }, h("div", { class: "border p-3" }, h("h4", { class: "mb-3" }, "Datensatz finden"), h("div", { class: "row align-items-end" }, h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Person/Autor"), h("div", null, h("input", { class: "form-control", type: "text", id: "person" }))), h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Jahr"), h("div", null, h("input", { class: "form-control", type: "text", id: "year" }))), h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Stichwort"), h("div", null, h("input", { class: "form-control", type: "text", id: "keyword" }))), h("div", { class: "form-group submit col pt-3 pt-lg-0" }, h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: (e) => this.filterResults(e) }, "Suchen")))), h("div", { class: "row mt-3" }, h("div", { class: "col-12 col-lg-9" }, h("div", { class: "border p-3 " }, h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"), h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))), h("div", { class: "gardener-search-reset col pl-0" }, h("div", { class: "border p-3 h100" }, h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: (e) => this.filterReset(e) }, "Zur\u00FCcksetzen"))))))), !this.loading
                ? h("gardener-results", { results: this.filteredResult })
                : h("loading-spinner", null)));
        }
    }
    get host() { return getElement(this); }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}\@media (min-width:768px){gardener-search{padding:25px}}gardener-search *,gardener-search :after,gardener-search :before{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;text-transform:uppercase;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search .gardener-search-wrapper .gardener-search-content{overflow:auto}gardener-search .gardener-search-wrapper .gardener-search-options{padding:0;margin:0;background:0 none}\@media (min-width:1024px){gardener-search .gardener-search-wrapper .gardener-search-options{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}}gardener-search .gardener-search-wrapper .glossary{list-style:none;padding:0}gardener-search .gardener-search-wrapper .glossary li{text-transform:uppercase;font-weight:700;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}gardener-search .gardener-search-wrapper .glossary li a{display:block;height:100%;text-decoration:none;-webkit-transition:all .2s cubic-bezier(.075,.82,.165,1);transition:all .2s cubic-bezier(.075,.82,.165,1)}gardener-search .gardener-search-wrapper .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}gardener-search .gardener-search-wrapper button{-webkit-appearance:none;display:block;-ms-flex:1;flex:1;margin:10px 0 0;padding-left:25px;padding-right:25px;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}gardener-search .gardener-search-wrapper button+button{margin-left:10px}\@media (min-width:480px){gardener-search .gardener-search-wrapper button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}\@media (min-width:1024px){gardener-search .gardener-search-wrapper button{width:100%}}gardener-search .h100{height:100%}"; }
};

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "d-flex justify-content-lg-center py-3" }, h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), h("span", { class: "sr-only" }, "Loading..."))));
    }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}:host{display:block}"; }
};

const Pagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.currentPage = 1;
        this.pageSelected = createEvent(this, "pageSelected", 7);
    }
    pageSelectedHandler(e, record) {
        e.preventDefault();
        this.pageSelected.emit(record);
    }
    changePage(page) {
        this.currentPage = page;
        this.pageSelected.emit(page);
    }
    pagination() {
        let pages = [];
        let loop_start = this.currentPage - 3;
        let loop_end = this.currentPage + 3;
        // Correct start and end if negative
        if (loop_start < 0) {
            loop_end += Math.abs(loop_start);
            loop_start = 1;
        }
        if (this.pages > 1) {
            // First Page
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(1) }, "\u00AB")));
            // Previous Page
            if (this.currentPage > 1) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage - 1) }, "\u2039")));
                // Previous Page Disabled
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u2039")));
            }
            // Loop Pages
            for (let i = 1; i <= this.pages; i++) {
                // Active Page
                if (i === this.currentPage) {
                    pages.push(h("li", { class: "page-item active" }, h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(i) }, i)));
                }
            }
            // Next Page
            if (this.currentPage < this.pages) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage + 1) }, "\u203A")));
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u203A")));
            }
            // Last Page
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.pages) }, "\u00BB")));
        }
        return pages;
    }
    render() {
        return (h(Host, null, h("nav", { "aria-label": "Navigate results" }, h("ul", { class: "pagination justify-content-center" }, this.pagination()))));
    }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}results-pagination{display:block}"; }
};

export { Detail as gardener_detail, Results as gardener_results, MyComponent as gardener_search, Spinner as loading_spinner, Pagination as results_pagination };
