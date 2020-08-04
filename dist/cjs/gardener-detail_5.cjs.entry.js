'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-013e6d42.js');

const Detail = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
        this.recordSelected = core.createEvent(this, "recordSelected", 7);
    }
    componentDidLoad() {
    }
    render() {
        if (this.record) {
            return (core.h(core.Host, null, core.h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: (e) => this.closeDetail(e) }, "Zur\u00FCck ", core.h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), core.h("h4", { class: "mb-3 mb-md-4" }, this.record.Person), core.h("table", { class: "table border-bottom stacktable" }, Object.keys(this.record).map(key => (core.h("tr", null, core.h("td", { class: "label" }, core.h("strong", null, key)), core.h("td", null, this.record[key])))))));
        }
    }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-detail{display:block}gardener-detail .close{font-size:inherit}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}"; }
};

const Results = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.page = 1;
        this.itemsPerPage = 50;
        this.recordSelected = core.createEvent(this, "recordSelected", 7);
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
        return (core.h("div", { class: "py-3 py-md-4 small" }, 'Zeige ', (this.total > 0)
            ? (this.firstItemShown() + 1) + '–' + this.lastItemShown() + ' von ' + this.total + ' Ergebnissen'
            : this.firstItemShown() + ' Ergebnisse'));
    }
    render() {
        return (core.h(core.Host, null, core.h("div", { id: "results" }, this.resultInfo(), core.h("table", { class: "table stacktable border-bottom" }, core.h("thead", null, core.h("tr", null, core.h("th", { class: "person" }, "Person"), core.h("th", { class: "content" }, "Inhalt"), core.h("th", { class: "type" }, "Dokumententyp"), core.h("th", { class: "year" }, "Jahr"), core.h("th", { class: "author" }, "Autor"), core.h("th", { class: "details" }, "\u00A0"))), core.h("tbody", null, this.pagedResult().map((gardener) => core.h("tr", null, core.h("td", null, gardener.Person), core.h("td", null, gardener.Inhalt), core.h("td", null, gardener.Dokumententyp), core.h("td", null, gardener.Jahr), core.h("td", null, gardener.Autor), core.h("td", null, core.h("a", { class: "link", title: "Details", href: "#", onClick: (e) => this.recordSelectedHandler(e, gardener) }, core.h("i", { class: "fa fa-info-circle fa-lg" }))))))), core.h("results-pagination", { "current-page": this.page, pages: this.pages }))));
    }
    static get watchers() { return {
        "results": ["watchHandler"]
    }; }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-results{display:block;overflow:hidden}gardener-results #results{width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id,gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}"; }
};

const MyComponent = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
        if (haystack.Person && haystack.Person.length > 0) {
            var person = haystack.Person.toLowerCase();
            if (!person.includes(needle)) {
                return false;
            }
        }
        else {
            return false;
        }
        console.log('filteredByPerson: ', person);
        return true;
    }
    filterByYear(needle, haystack) {
        if (haystack.Jahr && haystack.Jahr.length > 0) {
            var year = haystack.Jahr.toLowerCase();
            if (!year.includes(needle)) {
                return false;
            }
        }
        else {
            return false;
        }
        console.log('filteredByYear: ', year);
        return true;
    }
    filterByKeyword(needle, haystack) {
        if (haystack.Inhalt && haystack.Inhalt.length > 0) {
            var keyword = haystack.Inhalt.toLowerCase();
            if (!keyword.includes(needle)) {
                return false;
            }
        }
        else {
            return false;
        }
        console.log('filteredByKeyword: ', keyword);
        return true;
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
        this.filteredResult = this.gardb;
        var letter = e.toElement.innerText.toLowerCase();
        this.filteredResult = this.filteredResult.filter(record => this.filterByInitial(letter, record));
    }
    glossar() {
        let glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var output = [];
        glossary.forEach((element) => {
            element = core.h("li", null, core.h("a", { href: "#", onClick: (e) => this.filterLetter(e) }, element));
            output.push(element);
        });
        return output;
    }
    todoCompletedHandler(event) {
        console.log('Received the custom recordSelected event: ', event.detail);
        this.selectedRecord = event.detail;
    }
    return_errors() {
        return (core.h(core.Host, null, core.h("h5", null, "Fehler"), this.errors.map((error) => core.h("div", null, error))));
    }
    return_record() {
        return (core.h(core.Host, { id: "top" }, core.h("gardener-detail", { record: this.selectedRecord })));
    }
    render() {
        if (this.errors.length > 0) {
            return this.return_errors();
        }
        if (this.selectedRecord) {
            return this.return_record();
        }
        else if (this.api) {
            return (core.h(core.Host, { id: "top" }, core.h("div", { class: "gardener-search-wrapper" }, core.h("div", { class: "gardener-search-container" }, core.h("form", { id: "form", class: "gardener-search-filter" }, core.h("div", { class: "row" }, core.h("div", { class: "col-12 col-md-6 col-xl-5" }, core.h("div", { class: "h100 border p-3" }, core.h("h4", { class: "mb-3" }, "Datensatz finden"), core.h("div", { class: "field-person form-group row" }, core.h("label", { class: "col-12 col-lg-2 col-form-label" }, "Person"), core.h("div", { class: "col-12 col-lg-10" }, core.h("input", { class: "form-control", type: "text", id: "person" }))), core.h("div", { class: "field-year form-group row" }, core.h("label", { class: "col-12 col-lg-2 col-form-label" }, "Jahr"), core.h("div", { class: "col-12 col-lg-10" }, core.h("input", { class: "form-control", type: "text", id: "year" }))), core.h("div", { class: "field-keyword form-group row" }, core.h("label", { class: "col-12 col-lg-2 col-form-label" }, "Stichwort"), core.h("div", { class: "col-12 col-lg-10" }, core.h("input", { class: "form-control", type: "text", id: "keyword" }))))), core.h("div", { class: "col-12 col-md-6 col-xl-7 mt-3 mt-md-0" }, core.h("div", { class: "h100 border p-3" }, core.h("h4", { class: "mb-3" }, "Nach Namen filtern"), core.h("ul", { class: "glossary d-flex flex-wrap justify-content-start justify-content-xl-between" }, this.glossar()))), core.h("div", { class: "gardener-search-submit pt-3 pt-lg-4 col-12 d-flex justify-content-end" }, core.h("button", { type: "button", class: "btn btn-primary btn-outline submit-selection", onClick: (e) => this.filterReset(e) }, "Zur\u00FCcksetzen"), core.h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: (e) => this.filterResults(e) }, "Filtern")))))), !this.loading
                ? core.h("gardener-results", { results: this.filteredResult })
                : core.h("loading-spinner", null)));
        }
    }
    get host() { return core.getElement(this); }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}\@media (min-width:768px){gardener-search{padding:25px}}gardener-search *,gardener-search :after,gardener-search :before{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;text-transform:uppercase}gardener-search p+h4{margin-top:1.5em}gardener-search .gardener-search-wrapper{display:-ms-flexbox;display:flex}gardener-search .gardener-search-wrapper .gardener-search-content{overflow:auto}gardener-search .gardener-search-wrapper .gardener-search-options{padding:0;margin:0;background:0 none}\@media (min-width:1024px){gardener-search .gardener-search-wrapper .gardener-search-options{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}}gardener-search .gardener-search-wrapper .gardener-search-submit{-ms-flex:1;flex:1}\@media (min-width:768px){gardener-search .gardener-search-wrapper .gardener-search-submit{display:-ms-flexbox;display:flex}}gardener-search .gardener-search-wrapper .gardener-search-submit button{margin:10px 0 0;white-space:nowrap;-webkit-appearance:none;padding-right:25px;padding-left:25px;display:block;-ms-flex:1;flex:1}gardener-search .gardener-search-wrapper .gardener-search-submit button+button{margin-left:10px}\@media (min-width:480px){gardener-search .gardener-search-wrapper .gardener-search-submit button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}gardener-search .h100{height:100%}gardener-search .glossary{list-style:none;padding:0}gardener-search .glossary li{text-transform:uppercase;font-weight:700;min-width:20px;min-height:20px;text-align:center;line-height:20px}gardener-search .glossary li a{display:block;text-decoration:none;-webkit-transition:all .2s cubic-bezier(.075,.82,.165,1);transition:all .2s cubic-bezier(.075,.82,.165,1)}gardener-search .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}gardener-search button{text-transform:uppercase;background-color:var(--gs-color-primary);border:1px solid var(--gs-color-primary);color:#fff;padding:1.2em;text-align:center;text-decoration:none;display:inline-block;font-size:.875em;border-radius:var(--gs-border-radius)}gardener-search button:focus{outline:none}gardener-search button.submit-selection{background-color:transparent;border:1px solid var(--gs-color-border);color:var(--gs-color-border)}gardener-search button.submit-selection:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05)}gardener-search button.submit-all:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color)}"; }
};

const Spinner = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h(core.Host, null, core.h("div", { class: "d-flex justify-content-lg-center py-3" }, core.h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), core.h("span", { class: "sr-only" }, "Loading..."))));
    }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}:host{display:block}"; }
};

const Pagination = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.currentPage = 1;
        this.pageSelected = core.createEvent(this, "pageSelected", 7);
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
            pages.push(core.h("li", { class: "page-item" }, core.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(1) }, "\u00AB")));
            // Previous Page
            if (this.currentPage > 1) {
                pages.push(core.h("li", { class: "page-item" }, core.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage - 1) }, "\u2039")));
                // Previous Page Disabled
            }
            else {
                pages.push(core.h("li", { class: "page-item disabled" }, core.h("span", { class: "page-link" }, "\u2039")));
            }
            // Loop Pages
            for (let i = 1; i <= this.pages; i++) {
                // Active Page
                if (i === this.currentPage) {
                    pages.push(core.h("li", { class: "page-item active" }, core.h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(core.h("li", { class: "page-item" }, core.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(i) }, i)));
                }
            }
            // Next Page
            if (this.currentPage < this.pages) {
                pages.push(core.h("li", { class: "page-item" }, core.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage + 1) }, "\u203A")));
            }
            else {
                pages.push(core.h("li", { class: "page-item disabled" }, core.h("span", { class: "page-link" }, "\u203A")));
            }
            // Last Page
            pages.push(core.h("li", { class: "page-item" }, core.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.pages) }, "\u00BB")));
        }
        return pages;
    }
    render() {
        return (core.h(core.Host, null, core.h("nav", { "aria-label": "Navigate results" }, core.h("ul", { class: "pagination justify-content-center" }, this.pagination()))));
    }
    static get style() { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}results-pagination{display:block}"; }
};

exports.gardener_detail = Detail;
exports.gardener_results = Results;
exports.gardener_search = MyComponent;
exports.loading_spinner = Spinner;
exports.results_pagination = Pagination;
