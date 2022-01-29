import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-e1351b7d.js';

const filterBarCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}filter-bar{display:block}filter-bar .glossary{list-style:none;padding:0}filter-bar .glossary li{text-transform:uppercase;font-weight:bold;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}filter-bar .glossary li a{display:block;height:100%;text-decoration:none;transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1)}filter-bar .glossary li a:hover{transform:scale(1.5)}filter-bar button{-webkit-appearance:none;-webkit-appearance:none;display:block;display:block;flex:1;margin:10px 0 0;padding-left:25px;padding-right:25px;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}filter-bar button:after{content:\"\";display:block;position:absolute;border-radius:4em;left:0;top:0;width:100%;height:100%;opacity:0;transition:all 0.5s;box-shadow:0 0 10px 40px white}filter-bar button:active:after{box-shadow:0 0 0 0 white;position:absolute;border-radius:4em;left:0;top:0;opacity:1;transition:0s}filter-bar button:active{top:1px}filter-bar button+button{margin-left:10px}@media (min-width: 480px){filter-bar button{margin:0;display:inline-block;min-width:200px;flex:none}}@media (min-width: 1024px){filter-bar button{width:100%}}";

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
        ;
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
        ;
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

export { FilterBar as filter_bar };
