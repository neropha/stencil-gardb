import { Component, Element, Host, State, h, Prop, Listen } from '@stencil/core';
export class MyComponent {
    constructor() {
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
        var letter = e.target.innerText.toLowerCase();
        this.filteredResult = this.filteredResult.filter(record => this.filterByInitial(letter, record));
    }
    glossar() {
        let glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var output = [];
        glossary.forEach((element) => {
            element = h("li", null,
                h("a", { href: "#", onClick: (e) => this.filterLetter(e) }, element));
            output.push(element);
        });
        return output;
    }
    recordSelectedHandler(event) {
        // console.log('Received the custom recordSelected event: ', event.detail);
        this.selectedRecord = event.detail;
    }
    return_errors() {
        return (h(Host, null,
            h("h5", null, "Fehler"),
            this.errors.map((error) => h("div", null, error))));
    }
    return_record() {
        return (h(Host, { id: "top" },
            h("gardener-detail", { record: this.selectedRecord })));
    }
    render() {
        if (this.errors.length > 0) {
            return this.return_errors();
        }
        if (this.selectedRecord) {
            return this.return_record();
        }
        else if (this.api) {
            return (h(Host, { id: "top" },
                h("div", { class: "gardener-search-wrapper" },
                    h("div", { class: "gardener-search-container" },
                        h("form", { id: "form", class: "gardener-search-filter" },
                            h("div", { class: "border p-3" },
                                h("h4", { class: "mb-3" }, "Datensatz finden"),
                                h("div", { class: "row align-items-end" },
                                    h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" },
                                        h("label", { class: "col-form-label" }, "Person/Autor"),
                                        h("div", null,
                                            h("input", { class: "form-control", type: "text", id: "person", value: this.formValues.person }))),
                                    h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" },
                                        h("label", { class: "col-form-label" }, "Jahr"),
                                        h("div", null,
                                            h("input", { class: "form-control", type: "text", id: "year", value: this.formValues.year }))),
                                    h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" },
                                        h("label", { class: "col-form-label" }, "Stichwort"),
                                        h("div", null,
                                            h("input", { class: "form-control", type: "text", id: "keyword", value: this.formValues.keyword }))),
                                    h("div", { class: "form-group submit col pt-3 pt-lg-0" },
                                        h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: (e) => this.submitSearch(e) }, "Suchen")))),
                            h("div", { class: "row mt-3" },
                                h("div", { class: "col-12 col-lg-9" },
                                    h("div", { class: "border p-3 " },
                                        h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"),
                                        h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))),
                                h("div", { class: "gardener-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0" },
                                    h("div", { class: "border p-3 h100" },
                                        h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: (e) => this.resetSearch(e) }, "Zur\u00FCcksetzen"))))))),
                !this.loading
                    ? h("gardener-results", { results: this.filteredResult })
                    : h("loading-spinner", null)));
        }
    }
    static get is() { return "gardener-search"; }
    static get originalStyleUrls() { return {
        "$": ["gardener-search.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["gardener-search.css"]
    }; }
    static get properties() { return {
        "api": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "api",
            "reflect": false
        }
    }; }
    static get states() { return {
        "filteredResult": {},
        "selectedRecord": {},
        "errors": {},
        "formValues": {}
    }; }
    static get elementRef() { return "host"; }
    static get listeners() { return [{
            "name": "recordSelected",
            "method": "recordSelectedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
