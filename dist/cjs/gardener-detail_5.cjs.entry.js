'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1f060336.js');

const detailCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-detail{display:block}gardener-detail .close{font-size:inherit}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}";

const Detail = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.recordSelected = index.createEvent(this, "recordSelected", 7);
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
            return (index.h(index.Host, { id: "id" + this.record.ID }, index.h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: e => this.closeDetail(e) }, "Zur\u00FCck ", index.h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), index.h("h4", { class: "mb-3 mb-md-4" }, this.record.Person), index.h("table", { class: "table border-bottom stacktable" }, Object.keys(this.cleanRecord).map(key => (index.h("tr", null, index.h("td", { class: "label" }, index.h("strong", null, key)), index.h("td", null, this.cleanRecord[key])))))));
        }
    }
};
Detail.style = detailCss;

const resultsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-results{display:block;overflow:hidden}gardener-results #results{width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:0.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}";

const Results = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.recordSelected = index.createEvent(this, "recordSelected", 7);
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
        return (this.itemsPerPage * this.currentPage) - this.itemsPerPage;
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
    recordSelectedHandler(e, record) {
        e.preventDefault();
        this.recordSelected.emit(record);
        window.location.hash = 'id' + record.ID;
    }
    changePageHandler(event) {
        // console.log('Received the custom pageSelected event: ', event.detail);
        this.selectedRecord = event.detail;
        this.currentPage = event.detail;
        this.pagedResult();
    }
    resultInfo() {
        return (index.h("div", { class: "py-3 py-md-4 small" }, 'Zeige ', (this.total > 0)
            ? (this.firstItemShown() + 1) + '–' + this.lastItemShown() + ' von ' + this.total + ' Ergebnissen'
            : this.firstItemShown() + ' Ergebnisse'));
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { id: "results" }, this.resultInfo(), index.h("table", { class: "table stacktable border-bottom" }, index.h("thead", null, index.h("tr", null, index.h("th", { class: "person" }, "Person"), index.h("th", { class: "content" }, "Inhalt"), index.h("th", { class: "type" }, "Dokumententyp"), index.h("th", { class: "year" }, "Jahr"), index.h("th", { class: "author" }, "Autor"), index.h("th", { class: "details" }, "\u00A0"))), index.h("tbody", null, this.pagedResult().map((gardener) => index.h("tr", null, index.h("td", null, gardener.Person), index.h("td", null, gardener.Inhalt), index.h("td", null, gardener.Dokumententyp), index.h("td", null, gardener.Jahr), index.h("td", null, gardener.Autor), index.h("td", null, index.h("a", { class: "link", title: "Details", href: "#", onClick: (e) => this.recordSelectedHandler(e, gardener) }, index.h("i", { class: "fa fa-info-circle fa-lg" }))))))), index.h("results-pagination", { "current-page": this.currentPage, pages: this.pages }))));
    }
    static get watchers() { return {
        "results": ["watchHandler"]
    }; }
};
Results.style = resultsCss;

const gardenerSearchCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}@media (min-width: 768px){gardener-search{padding:25px}}gardener-search *{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search *:before,gardener-search *:after{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;text-transform:uppercase;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search .gardener-search-wrapper .gardener-search-content{overflow:auto}gardener-search .gardener-search-wrapper .gardener-search-options{padding:0;margin:0;background:0 none}@media (min-width: 1024px){gardener-search .gardener-search-wrapper .gardener-search-options{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}}gardener-search .gardener-search-wrapper .glossary{list-style:none;padding:0}gardener-search .gardener-search-wrapper .glossary li{text-transform:uppercase;font-weight:bold;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}gardener-search .gardener-search-wrapper .glossary li a{display:block;height:100%;text-decoration:none;-webkit-transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1)}gardener-search .gardener-search-wrapper .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}gardener-search .gardener-search-wrapper button{-webkit-appearance:none;-webkit-appearance:none;display:block;display:block;-ms-flex:1;flex:1;margin:10px 0 0;padding-left:25px;padding-right:25px;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}gardener-search .gardener-search-wrapper button+button{margin-left:10px}@media (min-width: 480px){gardener-search .gardener-search-wrapper button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}@media (min-width: 1024px){gardener-search .gardener-search-wrapper button{width:100%}}gardener-search .h100{height:100%}";

const MyComponent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.errors = [];
        this.formValues = {
            year: '',
            keyword: '',
            person: ''
        };
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
        // console.log('filteredByInitial: ', name)
        return true;
    }
    submitSearch(e) {
        e.preventDefault();
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.filteredResult = this.gardb;
        this.inputs.forEach((input) => {
            // Store Form Value Properties
            this.formValues[input.id] = input.value;
            let value = input.value.toLowerCase();
            if (input.id == "person") {
                this.filteredResult = this.filteredResult.filter(record => this.filterByPerson(value, record));
            }
            if (input.id == "year") {
                this.filteredResult = this.filteredResult.filter(record => this.filterByYear(value, record));
            }
            if (input.id == "keyword") {
                this.filteredResult = this.filteredResult.filter(record => this.filterByKeyword(value, record));
            }
        });
    }
    resetSearch(e) {
        e.preventDefault();
        this.filteredResult = this.gardb;
        this.selectedRecord = undefined;
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.inputs.forEach((input) => {
            // Reset Form Value Properties
            // Will automatically empty form, because of Prop Value Variable
            this.formValues[input.id] = "";
        });
    }
    filterLetter(e) {
        e.preventDefault();
        this.resetSearch(e);
        this.filteredResult = this.gardb;
        console.log(e);
        var letter = e.target.innerText.toLowerCase();
        this.filteredResult = this.filteredResult.filter(record => this.filterByInitial(letter, record));
    }
    glossar() {
        let glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var output = [];
        glossary.forEach((element) => {
            element = index.h("li", null, index.h("a", { href: "#", onClick: (e) => this.filterLetter(e) }, element));
            output.push(element);
        });
        return output;
    }
    recordSelectedHandler(event) {
        // console.log('Received the custom recordSelected event: ', event.detail);
        this.selectedRecord = event.detail;
    }
    return_errors() {
        return (index.h(index.Host, null, index.h("h5", null, "Fehler"), this.errors.map((error) => index.h("div", null, error))));
    }
    return_record() {
        return (index.h(index.Host, { id: "top" }, index.h("gardener-detail", { record: this.selectedRecord })));
    }
    render() {
        if (this.errors.length > 0) {
            return this.return_errors();
        }
        if (this.selectedRecord) {
            return this.return_record();
        }
        else if (this.api) {
            return (index.h(index.Host, { id: "top" }, index.h("div", { class: "gardener-search-wrapper" }, index.h("div", { class: "gardener-search-container" }, index.h("form", { id: "form", class: "gardener-search-filter" }, index.h("div", { class: "border p-3" }, index.h("h4", { class: "mb-3" }, "Datensatz finden"), index.h("div", { class: "row align-items-end" }, index.h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" }, index.h("label", { class: "col-form-label" }, "Person/Autor"), index.h("div", null, index.h("input", { class: "form-control", type: "text", id: "person", value: this.formValues.person }))), index.h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" }, index.h("label", { class: "col-form-label" }, "Jahr"), index.h("div", null, index.h("input", { class: "form-control", type: "text", id: "year", value: this.formValues.year }))), index.h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" }, index.h("label", { class: "col-form-label" }, "Stichwort"), index.h("div", null, index.h("input", { class: "form-control", type: "text", id: "keyword", value: this.formValues.keyword }))), index.h("div", { class: "form-group submit col pt-3 pt-lg-0" }, index.h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: (e) => this.submitSearch(e) }, "Suchen")))), index.h("div", { class: "row mt-3" }, index.h("div", { class: "col-12 col-lg-9" }, index.h("div", { class: "border p-3 " }, index.h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"), index.h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))), index.h("div", { class: "gardener-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0" }, index.h("div", { class: "border p-3 h100" }, index.h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: (e) => this.resetSearch(e) }, "Zur\u00FCcksetzen"))))))), !this.loading
                ? index.h("gardener-results", { results: this.filteredResult })
                : index.h("loading-spinner", null)));
        }
    }
    get host() { return index.getElement(this); }
};
MyComponent.style = gardenerSearchCss;

const spinnerCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}:host{display:block}";

const Spinner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { class: "d-flex justify-content-lg-center py-3" }, index.h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), index.h("span", { class: "sr-only" }, "Loading..."))));
    }
};
Spinner.style = spinnerCss;

const paginationCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}results-pagination{display:block}";

const Pagination = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.pageSelected = index.createEvent(this, "pageSelected", 7);
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
            pages.push(index.h("li", { class: "page-item" }, index.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(1) }, "\u00AB")));
            // Previous Page
            if (this.currentPage > 1) {
                pages.push(index.h("li", { class: "page-item" }, index.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage - 1) }, "\u2039")));
                // Previous Page Disabled
            }
            else {
                pages.push(index.h("li", { class: "page-item disabled" }, index.h("span", { class: "page-link" }, "\u2039")));
            }
            // Loop Pages
            for (let i = 1; i <= this.pages; i++) {
                // Active Page
                if (i === this.currentPage) {
                    pages.push(index.h("li", { class: "page-item active" }, index.h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(index.h("li", { class: "page-item" }, index.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(i) }, i)));
                }
            }
            // Next Page
            if (this.currentPage < this.pages) {
                pages.push(index.h("li", { class: "page-item" }, index.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage + 1) }, "\u203A")));
            }
            else {
                pages.push(index.h("li", { class: "page-item disabled" }, index.h("span", { class: "page-link" }, "\u203A")));
            }
            // Last Page
            pages.push(index.h("li", { class: "page-item" }, index.h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.pages) }, "\u00BB")));
        }
        return pages;
    }
    render() {
        return (index.h(index.Host, null, index.h("nav", { "aria-label": "Navigate results" }, index.h("ul", { class: "pagination justify-content-center" }, this.pagination()))));
    }
};
Pagination.style = paginationCss;

exports.gardener_detail = Detail;
exports.gardener_results = Results;
exports.gardener_search = MyComponent;
exports.loading_spinner = Spinner;
exports.results_pagination = Pagination;
