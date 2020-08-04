import { Host, h } from "@stencil/core";
export class MyComponent {
    constructor() {
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
            element = h("li", null,
                h("a", { href: "#", onClick: (e) => this.filterLetter(e) }, element));
            output.push(element);
        });
        return output;
    }
    todoCompletedHandler(event) {
        console.log('Received the custom recordSelected event: ', event.detail);
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
                            h("div", { class: "row" },
                                h("div", { class: "col-12 col-md-6 col-xl-5" },
                                    h("div", { class: "h100 border p-3" },
                                        h("h4", { class: "mb-3" }, "Datensatz finden"),
                                        h("div", { class: "field-person form-group row" },
                                            h("label", { class: "col-12 col-lg-2 col-form-label" }, "Person"),
                                            h("div", { class: "col-12 col-lg-10" },
                                                h("input", { class: "form-control", type: "text", id: "person" }))),
                                        h("div", { class: "field-year form-group row" },
                                            h("label", { class: "col-12 col-lg-2 col-form-label" }, "Jahr"),
                                            h("div", { class: "col-12 col-lg-10" },
                                                h("input", { class: "form-control", type: "text", id: "year" }))),
                                        h("div", { class: "field-keyword form-group row" },
                                            h("label", { class: "col-12 col-lg-2 col-form-label" }, "Stichwort"),
                                            h("div", { class: "col-12 col-lg-10" },
                                                h("input", { class: "form-control", type: "text", id: "keyword" }))))),
                                h("div", { class: "col-12 col-md-6 col-xl-7 mt-3 mt-md-0" },
                                    h("div", { class: "h100 border p-3" },
                                        h("h4", { class: "mb-3" }, "Nach Namen filtern"),
                                        h("ul", { class: "glossary d-flex flex-wrap justify-content-start justify-content-xl-between" }, this.glossar()))),
                                h("div", { class: "gardener-search-submit pt-3 pt-lg-4 col-12 d-flex justify-content-end" },
                                    h("button", { type: "button", class: "btn btn-primary btn-outline submit-selection", onClick: (e) => this.filterReset(e) }, "Zur\u00FCcksetzen"),
                                    h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: (e) => this.filterResults(e) }, "Filtern")))))),
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
        "errors": {}
    }; }
    static get elementRef() { return "host"; }
    static get listeners() { return [{
            "name": "recordSelected",
            "method": "todoCompletedHandler",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
