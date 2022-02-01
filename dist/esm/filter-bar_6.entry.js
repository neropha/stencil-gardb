import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-1ede1968.js';

const filterBarCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}filter-bar{display:block}filter-bar .glossary{list-style:none;padding:0}filter-bar .glossary li{text-transform:uppercase;font-weight:bold;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}filter-bar .glossary li a{display:block;height:100%;text-decoration:none;-webkit-transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1)}filter-bar .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}filter-bar button{-webkit-appearance:none;-webkit-appearance:none;display:block;display:block;-ms-flex:1;flex:1;margin:10px 0 0;padding-left:25px;padding-right:25px;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}filter-bar button:after{content:\"\";display:block;position:absolute;border-radius:4em;left:0;top:0;width:100%;height:100%;opacity:0;-webkit-transition:all 0.5s;transition:all 0.5s;-webkit-box-shadow:0 0 10px 40px white;box-shadow:0 0 10px 40px white}filter-bar button:active:after{-webkit-box-shadow:0 0 0 0 white;box-shadow:0 0 0 0 white;position:absolute;border-radius:4em;left:0;top:0;opacity:1;-webkit-transition:0s;transition:0s}filter-bar button:active{top:1px}filter-bar button+button{margin-left:10px}@media (min-width: 480px){filter-bar button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}@media (min-width: 1024px){filter-bar button{width:100%}}";

const FilterBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
        this.filterEvent = createEvent(this, "filterEvent", 7);
        this.formValues = {
            person: "",
            year: "",
            keyword: "",
        };
    }
    componentWillLoad() {
        this.filteredResults = this.results;
    }
    // Store Form Value Properties
    handleFormInput(event) {
        this.formValues[event.target.id] = event.target.value;
    }
    recordSelectedHandler(record) {
        this.recordSelected.emit(record);
    }
    // Watch for changed result-set and broadcast value for event listener in parent component
    watchStateHandler(newValue) {
        // Broadcast Event and reset results to filtered value
        this.filterEvent.emit(newValue);
    }
    filterByPerson(needle, haystack) {
        // Searches in Person and Autor
        let indexedFields = [haystack.Person, haystack.Autor].join().toLowerCase();
        return indexedFields.includes(needle);
    }
    filterByYear(needle, haystack) {
        let indexedFields = [haystack.Jahr].join().toLowerCase();
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
        return true;
    }
    submitSearch(e) {
        e.preventDefault();
        this.recordSelected.emit(null);
        this.filteredResults = this.results;
        for (let [key, value] of Object.entries(this.formValues)) {
            value = value.toLowerCase();
            if (value.length > 0) {
                if (key == "person") {
                    this.filteredResults = this.filteredResults.filter(record => this.filterByPerson(value, record));
                }
                if (key == "year") {
                    this.filteredResults = this.filteredResults.filter(record => this.filterByYear(value, record));
                }
                if (key == "keyword") {
                    this.filteredResults = this.filteredResults.filter(record => this.filterByKeyword(value, record));
                }
            }
        }
    }
    resetSearch(e) {
        e.preventDefault();
        this.recordSelected.emit(null);
        this.filteredResults = this.results;
        // this.selectedRecord = undefined;
        for (let [key] of Object.entries(this.formValues)) {
            // Reset Form Value Properties
            // Will automatically empty form, because of Prop Value Variable
            this.formValues[key] = "";
        }
    }
    filterLetter(e) {
        e.preventDefault();
        this.resetSearch(e);
        var letter = e.target.innerText.toLowerCase();
        this.filteredResults = this.results.filter(record => this.filterByInitial(letter, record));
    }
    glossar() {
        let glossary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var letters = [];
        glossary.forEach(element => {
            element = (h("li", null, h("a", { href: "#", onClick: e => this.filterLetter(e) }, element)));
            letters.push(element);
        });
        return letters;
    }
    render() {
        return (h(Host, null, h("div", { class: "filter-bar" }, h("form", { id: "form", class: "gardener-search-filter" }, h("div", { class: "border p-3" }, h("h4", { class: "mb-3" }, "Datensatz finden"), h("div", { class: "row align-items-end" }, h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Person/Autor"), h("div", null, h("input", { class: "form-control", type: "text", id: "person", value: this.formValues.person, onInput: (event) => this.handleFormInput(event) }))), h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Jahr"), h("div", null, h("input", { class: "form-control", type: "text", id: "year", value: this.formValues.year, onInput: (event) => this.handleFormInput(event) }))), h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Stichwort"), h("div", null, h("input", { class: "form-control", type: "text", id: "keyword", value: this.formValues.keyword, onInput: (event) => this.handleFormInput(event) }))), h("div", { class: "form-group submit col pt-3 pt-lg-0" }, h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: e => this.submitSearch(e) }, "Suchen")))), h("div", { class: "row mt-3" }, h("div", { class: "col-12 col-lg-9" }, h("div", { class: "border p-3 " }, h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"), h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))), h("div", { class: "gardener-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0" }, h("div", { class: "border p-3 h100" }, h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: e => this.resetSearch(e) }, "Zur\u00FCcksetzen"))))))));
    }
    get host() { return getElement(this); }
    static get watchers() { return {
        "filteredResults": ["watchStateHandler"]
    }; }
};
FilterBar.style = filterBarCss;

const detailCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-detail{display:block;position:relative}gardener-detail .close{font-size:inherit;outline:none;border:0 none;-webkit-transition:0.5s cubic-bezier(0.075, 0.82, 0.165, 1);transition:0.5s cubic-bezier(0.075, 0.82, 0.165, 1)}gardener-detail .close:focus,gardener-detail .close:hover{outline:none;-webkit-transform:translateX(-5%);transform:translateX(-5%)}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}";

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

const resultsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-results{display:block;overflow:hidden;width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:0.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}";

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
        return (h(Host, null, this.resultInfo(), h("table", { class: "table stacktable border-bottom" }, h("thead", null, h("tr", null, h("th", { class: "person" }, "Person"), h("th", { class: "content" }, "Inhalt"), h("th", { class: "type" }, "Dokumententyp"), h("th", { class: "year" }, "Jahr"), h("th", { class: "author" }, "Autor"), h("th", { class: "details" }, "\u00A0"))), h("tbody", null, this.pagedResult().map(gardener => (h("tr", null, h("td", null, gardener.Person), h("td", null, gardener.Inhalt), h("td", null, gardener.Dokumententyp), h("td", null, gardener.Jahr), h("td", null, gardener.Autor), h("td", null, h("a", { class: "link", title: "Details", href: '#id' + gardener['ID'], onClick: () => this.recordSelectedHandler(gardener.ID) }, h("i", { class: "fa fa-info-circle fa-lg" })))))))), h("results-pagination", { "current-page": this.currentPage, pages: this.pages })));
    }
    static get watchers() { return {
        "results": ["watchHandler"]
    }; }
};
Results.style = resultsCss;

const gardenerSearchCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}@media (min-width: 768px){gardener-search{padding:25px}}gardener-search *{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search *:before,gardener-search *:after{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search .h100{height:100%}";

const MyComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.errors = [];
        this.loading = true;
    }
    async loadData() {
        try {
            let response = await fetch(this.api, {
                method: "GET",
                mode: "cors",
                referrerPolicy: 'no-referrer',
            });
            if (!response.ok) {
                console.log('!response.ok');
                // Prepare for catch(err)
                throw new Error(response.status + ": " + response.statusText);
            }
            this.results = this.filteredResults = await response.json();
        }
        catch (err) {
            console.log('err');
            this.errors.push(err.message);
            this.errors.push("Datenbank konnte nicht geladen werden.");
        }
        finally {
            this.loading = false;
            console.log('finaly');
        }
    }
    componentWillLoad() {
        if (!this.api) {
            this.errors.push("Datenbank nicht definiert.");
        }
        else {
            this.loadData();
        }
    }
    filterResultHandler(event) {
        this.filteredResults = event.detail;
    }
    recordSelectedHandler(record) {
        if (record.detail) {
            this.selectedRecord = this.filteredResults.filter(element => (element.ID == record.detail)).shift();
            window.location.hash = "id" + record.detail;
        }
        else {
            window.location.hash = "results";
            this.selectedRecord = null;
        }
    }
    return_errors(errors) {
        return (h(Host, null, h("h5", null, "Fehler"), errors.map(error => (h("div", null, error)))));
    }
    render() {
        if (this.errors.length) {
            return this.return_errors(this.errors);
        }
        else if (this.loading) {
            return (h(Host, null, h("loading-spinner", null)));
        }
        if (this.selectedRecord) {
            return (h(Host, null, h("filter-bar", { results: this.results }), h("gardener-detail", { record: this.selectedRecord })));
        }
        else {
            return (h(Host, null, h("filter-bar", { results: this.results }), h("gardener-results", { results: this.filteredResults })));
        }
    }
};
MyComponent.style = gardenerSearchCss;

const spinnerCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}:host{display:block}";

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "d-flex justify-content-lg-center py-3" }, h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), h("span", null, "Lade Datenbank..."))));
    }
};
Spinner.style = spinnerCss;

const paginationCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}results-pagination{display:block}";

const Pagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
};
Pagination.style = paginationCss;

export { FilterBar as filter_bar, Detail as gardener_detail, Results as gardener_results, MyComponent as gardener_search, Spinner as loading_spinner, Pagination as results_pagination };
