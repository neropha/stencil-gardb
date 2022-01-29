import { r as registerInstance, h, e as Host } from './index-e1351b7d.js';

const gardenerSearchCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}@media (min-width: 768px){gardener-search{padding:25px}}gardener-search *{box-sizing:border-box}gardener-search *:before,gardener-search *:after{box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search .h100{height:100%}";

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
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                // Prepare for catch(err)
                throw new Error(response.status + ": " + response.statusText);
            }
            this.results = this.filteredResults = await response.json();
        }
        catch (err) {
            this.errors.push(err.message);
            this.errors.push("Datenbank konnte nicht geladen werden.");
        }
        finally {
            this.loading = false;
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
            // window.location.hash = "results";
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

export { MyComponent as gardener_search };
