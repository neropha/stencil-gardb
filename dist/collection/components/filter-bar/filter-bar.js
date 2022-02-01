import { Component, Element, Host, h, State, Prop, Event, Watch } from "@stencil/core";
export class FilterBar {
    constructor() {
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
            element = (h("li", null,
                h("a", { href: "#", onClick: e => this.filterLetter(e) }, element)));
            letters.push(element);
        });
        return letters;
    }
    render() {
        return (h(Host, null,
            h("div", { class: "filter-bar" },
                h("form", { id: "form", class: "gardener-search-filter" },
                    h("div", { class: "border p-3" },
                        h("h4", { class: "mb-3" }, "Datensatz finden"),
                        h("div", { class: "row align-items-end" },
                            h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" },
                                h("label", { class: "col-form-label" }, "Person/Autor"),
                                h("div", null,
                                    h("input", { class: "form-control", type: "text", id: "person", value: this.formValues.person, onInput: (event) => this.handleFormInput(event) }))),
                            h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" },
                                h("label", { class: "col-form-label" }, "Jahr"),
                                h("div", null,
                                    h("input", { class: "form-control", type: "text", id: "year", value: this.formValues.year, onInput: (event) => this.handleFormInput(event) }))),
                            h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" },
                                h("label", { class: "col-form-label" }, "Stichwort"),
                                h("div", null,
                                    h("input", { class: "form-control", type: "text", id: "keyword", value: this.formValues.keyword, onInput: (event) => this.handleFormInput(event) }))),
                            h("div", { class: "form-group submit col pt-3 pt-lg-0" },
                                h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: e => this.submitSearch(e) }, "Suchen")))),
                    h("div", { class: "row mt-3" },
                        h("div", { class: "col-12 col-lg-9" },
                            h("div", { class: "border p-3 " },
                                h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"),
                                h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))),
                        h("div", { class: "gardener-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0" },
                            h("div", { class: "border p-3 h100" },
                                h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: e => this.resetSearch(e) }, "Zur\u00FCcksetzen"))))))));
    }
    static get is() { return "filter-bar"; }
    static get originalStyleUrls() { return {
        "$": ["filter-bar.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["filter-bar.css"]
    }; }
    static get properties() { return {
        "results": {
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
            "attribute": "results",
            "reflect": false
        }
    }; }
    static get states() { return {
        "filteredResults": {},
        "formValues": {}
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
                "original": "CustomEvent",
                "resolved": "CustomEvent<any>",
                "references": {
                    "CustomEvent": {
                        "location": "global"
                    }
                }
            }
        }, {
            "method": "filterEvent",
            "name": "filterEvent",
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
    static get elementRef() { return "host"; }
    static get watchers() { return [{
            "propName": "filteredResults",
            "methodName": "watchStateHandler"
        }]; }
}
