import { r as registerInstance, h, H as Host, c as getElement } from './core-93a7cc70.js';

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
    static get style() { return ":root {\n  --gs-container-max-width: 1280px;\n  --gs-container-padding: 50px;\n  --gs-color-bg: #efefef;\n  --gs-color-primary: #71BC51;\n  --gs-color-secondary: #2196F3;\n  --gs-color-text: #333;\n  --gs-color-border: #999;\n  --gs-color-disabled: #ccc;\n  --gs-color-background: #fff;\n  --gs-border-radius: 5px;\n  --gs-border-radius-small: 2px;\n  --gs-font-size-base: 15px;\n  --gs-button-primary: var(--gs-color-primary);\n  --gs-button-primary-focus-color: #c1d6b7;\n  --gs-button-primary-border: var(--gs-color-primary);\n  --gs-button-light: #FFF;\n}\n\ngardener-search {\n  font-weight: 400;\n  font-family: inherit;\n  font-size: var(--gs-font-size-base);\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  background: var(--gs-color-bg);\n  color: var(--gs-color-text);\n  line-height: 1.4;\n  padding: 15px;\n  max-height: 100%;\n}\n\@media (min-width: 768px) {\n  gardener-search {\n    padding: 25px;\n  }\n}\ngardener-search * {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\ngardener-search *:before,\ngardener-search *:after {\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\ngardener-search p {\n  margin: 0 0 1em 0;\n}\ngardener-search h2,\ngardener-search h3,\ngardener-search h4 {\n  margin-top: 0;\n  text-transform: uppercase;\n  font-family: inherit;\n}\ngardener-search p + h4 {\n  margin-top: 1.5em;\n}\ngardener-search .gardener-search-wrapper .gardener-search-content {\n  overflow: auto;\n}\ngardener-search .gardener-search-wrapper .gardener-search-options {\n  padding: 0;\n  margin: 0;\n  background: 0 none;\n}\n\@media (min-width: 1024px) {\n  gardener-search .gardener-search-wrapper .gardener-search-options {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n    justify-content: space-between;\n    -ms-flex-align: center;\n    align-items: center;\n  }\n}\ngardener-search .gardener-search-wrapper .glossary {\n  list-style: none;\n  padding: 0;\n}\ngardener-search .gardener-search-wrapper .glossary li {\n  text-transform: uppercase;\n  font-weight: bold;\n  min-width: 25px;\n  min-height: 25px;\n  text-align: center;\n  line-height: 20px;\n  font-size: 18px;\n}\ngardener-search .gardener-search-wrapper .glossary li a {\n  display: block;\n  height: 100%;\n  text-decoration: none;\n  -webkit-transition: 0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);\n  transition: 0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);\n}\ngardener-search .gardener-search-wrapper .glossary li a:hover {\n  -webkit-transform: scale(1.5);\n  transform: scale(1.5);\n}\ngardener-search .gardener-search-wrapper button {\n  -webkit-appearance: none;\n  -webkit-appearance: none;\n  display: block;\n  display: block;\n  -ms-flex: 1;\n  flex: 1;\n  margin: 10px 0 0;\n  padding-left: 25px;\n  padding-right: 25px;\n  text-align: center;\n  text-decoration: none;\n  text-transform: uppercase;\n  white-space: nowrap;\n}\ngardener-search .gardener-search-wrapper button + button {\n  margin-left: 10px;\n}\n\@media (min-width: 480px) {\n  gardener-search .gardener-search-wrapper button {\n    margin: 0;\n    display: inline-block;\n    min-width: 200px;\n    -ms-flex: none;\n    flex: none;\n  }\n}\n\@media (min-width: 1024px) {\n  gardener-search .gardener-search-wrapper button {\n    width: 100%;\n  }\n}\ngardener-search .h100 {\n  height: 100%;\n}"; }
};

export { MyComponent as gardener_search };
