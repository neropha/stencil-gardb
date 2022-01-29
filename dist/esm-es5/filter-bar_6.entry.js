var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-1ede1968.js';
var filterBarCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}filter-bar{display:block}filter-bar .glossary{list-style:none;padding:0}filter-bar .glossary li{text-transform:uppercase;font-weight:bold;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}filter-bar .glossary li a{display:block;height:100%;text-decoration:none;-webkit-transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1);transition:0.2s all cubic-bezier(0.075, 0.82, 0.165, 1)}filter-bar .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}filter-bar button{-webkit-appearance:none;-webkit-appearance:none;display:block;display:block;-ms-flex:1;flex:1;margin:10px 0 0;padding-left:25px;padding-right:25px;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}filter-bar button:after{content:\"\";display:block;position:absolute;border-radius:4em;left:0;top:0;width:100%;height:100%;opacity:0;-webkit-transition:all 0.5s;transition:all 0.5s;-webkit-box-shadow:0 0 10px 40px white;box-shadow:0 0 10px 40px white}filter-bar button:active:after{-webkit-box-shadow:0 0 0 0 white;box-shadow:0 0 0 0 white;position:absolute;border-radius:4em;left:0;top:0;opacity:1;-webkit-transition:0s;transition:0s}filter-bar button:active{top:1px}filter-bar button+button{margin-left:10px}@media (min-width: 480px){filter-bar button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}@media (min-width: 1024px){filter-bar button{width:100%}}";
var FilterBar = /** @class */ (function () {
    function FilterBar(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
        this.filterEvent = createEvent(this, "filterEvent", 7);
        this.formValues = {
            person: "",
            year: "",
            keyword: "",
        };
    }
    FilterBar.prototype.componentWillLoad = function () {
        this.filteredResults = this.results;
    };
    // Store Form Value Properties
    FilterBar.prototype.handleFormInput = function (event) {
        this.formValues[event.target.id] = event.target.value;
    };
    FilterBar.prototype.recordSelectedHandler = function (record) {
        this.recordSelected.emit(record);
    };
    // Watch for changed result-set and broadcast value for event listener in parent component
    FilterBar.prototype.watchStateHandler = function (newValue) {
        // Broadcast Event and reset results to filtered value
        this.filterEvent.emit(newValue);
    };
    FilterBar.prototype.filterByPerson = function (needle, haystack) {
        // Searches in Person and Autor
        var indexedFields = [haystack.Person, haystack.Autor].join().toLowerCase();
        return indexedFields.includes(needle);
    };
    FilterBar.prototype.filterByYear = function (needle, haystack) {
        var indexedFields = [haystack.Jahr].join().toLowerCase();
        return indexedFields.includes(needle);
    };
    FilterBar.prototype.filterByKeyword = function (needle, haystack) {
        // Searches in Inhalt | Dokumententyp | Zeitschrift |
        var indexedFields = [haystack.Inhalt, haystack.Dokumententyp, haystack.Zeitschrift].join().toLowerCase();
        return indexedFields.includes(needle);
    };
    FilterBar.prototype.filterByInitial = function (needle, haystack) {
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
    };
    FilterBar.prototype.submitSearch = function (e) {
        var _this = this;
        e.preventDefault();
        this.recordSelected.emit(null);
        this.filteredResults = this.results;
        var _loop_1 = function (key, value) {
            value = value.toLowerCase();
            if (value.length > 0) {
                if (key == "person") {
                    this_1.filteredResults = this_1.filteredResults.filter(function (record) { return _this.filterByPerson(value, record); });
                }
                if (key == "year") {
                    this_1.filteredResults = this_1.filteredResults.filter(function (record) { return _this.filterByYear(value, record); });
                }
                if (key == "keyword") {
                    this_1.filteredResults = this_1.filteredResults.filter(function (record) { return _this.filterByKeyword(value, record); });
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.entries(this.formValues); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            _loop_1(key, value);
        }
    };
    FilterBar.prototype.resetSearch = function (e) {
        e.preventDefault();
        this.recordSelected.emit(null);
        this.filteredResults = this.results;
        // this.selectedRecord = undefined;
        for (var _i = 0, _a = Object.entries(this.formValues); _i < _a.length; _i++) {
            var key = _a[_i][0];
            // Reset Form Value Properties
            // Will automatically empty form, because of Prop Value Variable
            this.formValues[key] = "";
        }
    };
    FilterBar.prototype.filterLetter = function (e) {
        var _this = this;
        e.preventDefault();
        this.resetSearch(e);
        var letter = e.target.innerText.toLowerCase();
        this.filteredResults = this.results.filter(function (record) { return _this.filterByInitial(letter, record); });
    };
    FilterBar.prototype.glossar = function () {
        var _this = this;
        var glossary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var letters = [];
        glossary.forEach(function (element) {
            element = (h("li", null, h("a", { href: "#", onClick: function (e) { return _this.filterLetter(e); } }, element)));
            letters.push(element);
        });
        return letters;
    };
    FilterBar.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("div", { class: "filter-bar" }, h("form", { id: "form", class: "gardener-search-filter" }, h("div", { class: "border p-3" }, h("h4", { class: "mb-3" }, "Datensatz finden"), h("div", { class: "row align-items-end" }, h("div", { class: "field-person form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Person/Autor"), h("div", null, h("input", { class: "form-control", type: "text", id: "person", value: this.formValues.person, onInput: function (event) { return _this.handleFormInput(event); } }))), h("div", { class: "field-year form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Jahr"), h("div", null, h("input", { class: "form-control", type: "text", id: "year", value: this.formValues.year, onInput: function (event) { return _this.handleFormInput(event); } }))), h("div", { class: "field-keyword form-group col-12 col-md-4 col-lg-3" }, h("label", { class: "col-form-label" }, "Stichwort"), h("div", null, h("input", { class: "form-control", type: "text", id: "keyword", value: this.formValues.keyword, onInput: function (event) { return _this.handleFormInput(event); } }))), h("div", { class: "form-group submit col pt-3 pt-lg-0" }, h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: function (e) { return _this.submitSearch(e); } }, "Suchen")))), h("div", { class: "row mt-3" }, h("div", { class: "col-12 col-lg-9" }, h("div", { class: "border p-3 " }, h("h4", { class: "mb-3" }, "Nach Anfangsbuchstaben filtern"), h("ul", { class: "glossary d-flex flex-wrap justify-content-start" }, this.glossar()))), h("div", { class: "gardener-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0" }, h("div", { class: "border p-3 h100" }, h("button", { type: "button", class: "btn btn-outline-dark btn-sm submit-selection", onClick: function (e) { return _this.resetSearch(e); } }, "Zur\u00FCcksetzen"))))))));
    };
    Object.defineProperty(FilterBar.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FilterBar, "watchers", {
        get: function () {
            return {
                "filteredResults": ["watchStateHandler"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return FilterBar;
}());
FilterBar.style = filterBarCss;
var detailCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-detail{display:block;position:relative}gardener-detail .close{font-size:inherit;outline:none;border:0 none;-webkit-transition:0.5s cubic-bezier(0.075, 0.82, 0.165, 1);transition:0.5s cubic-bezier(0.075, 0.82, 0.165, 1)}gardener-detail .close:focus,gardener-detail .close:hover{outline:none;-webkit-transform:translateX(-5%);transform:translateX(-5%)}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}";
var Detail = /** @class */ (function () {
    function Detail(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
        this.cleanRecord = [];
        this.hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
    }
    Detail.prototype.handleScroll = function (ev) {
        if (window.location.hash == "#results") {
            this.closeDetail(ev);
        }
    };
    Detail.prototype.recordSelectedHandler = function (record) {
        this.recordSelected.emit(record);
    };
    Detail.prototype.componentWillLoad = function () {
        var _a;
        for (var _i = 0, _b = Object.entries(this.record); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            if (!this.hideColumns.includes(key)) {
                this.cleanRecord = Object.assign(Object.assign({}, this.cleanRecord), (_a = {}, _a[key] = value, _a));
            }
        }
    };
    Detail.prototype.componentDidLoad = function () {
        this.element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    };
    Detail.prototype.render = function () {
        var _this = this;
        if (this.cleanRecord) {
            return (h(Host, { id: "id" + this.record.ID, class: "mt-5" }, h("button", { type: "button", class: "close btn-sm mt-3 mr-3", "aria-label": "Close", onClick: function (e) { return _this.closeDetail(e); } }, "Zur\u00FCck ", h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), h("div", { class: "border p-3 mt-3" }, h("h2", { class: "mb-3 mb-md-4" }, this.record.Person), h("table", { class: "table border-bottom stacktable" }, Object.keys(this.cleanRecord).map(function (key) { return (h("tr", null, h("td", { class: "label" }, h("strong", null, key)), h("td", null, _this.cleanRecord[key]))); })))));
        }
    };
    Object.defineProperty(Detail.prototype, "element", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return Detail;
}());
Detail.style = detailCss;
var resultsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-results{display:block;overflow:hidden;width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:0.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}";
var Results = /** @class */ (function () {
    function Results(hostRef) {
        registerInstance(this, hostRef);
        this.recordSelected = createEvent(this, "recordSelected", 7);
        this.currentPage = 1;
        this.itemsPerPage = 50;
    }
    Results.prototype.componentWillRender = function () {
        this.total = this.results.length;
        this.pages = Math.ceil(this.total / this.itemsPerPage);
    };
    Results.prototype.watchHandler = function (newValue, oldValue) {
        if (newValue != oldValue) {
            this.currentPage = 1;
        }
    };
    Results.prototype.firstItemShown = function () {
        return this.itemsPerPage * this.currentPage - this.itemsPerPage;
    };
    Results.prototype.lastItemShown = function () {
        var lastCount = this.itemsPerPage * this.currentPage;
        var last;
        if (lastCount > this.total) {
            last = this.total;
        }
        else {
            last = lastCount;
        }
        return last;
    };
    Results.prototype.pagedResult = function () {
        return this.results.slice(this.firstItemShown(), this.lastItemShown());
    };
    Results.prototype.recordSelectedHandler = function (record) {
        this.recordSelected.emit(record);
    };
    Results.prototype.changePageHandler = function (event) {
        this.currentPage = event.detail;
        this.pagedResult();
    };
    Results.prototype.resultInfo = function () {
        return (h("div", { class: "py-3 py-md-4 small" }, "Zeige ", this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"));
    };
    Results.prototype.render = function () {
        var _this = this;
        return (h(Host, null, this.resultInfo(), h("table", { class: "table stacktable border-bottom" }, h("thead", null, h("tr", null, h("th", { class: "person" }, "Person"), h("th", { class: "content" }, "Inhalt"), h("th", { class: "type" }, "Dokumententyp"), h("th", { class: "year" }, "Jahr"), h("th", { class: "author" }, "Autor"), h("th", { class: "details" }, "\u00A0"))), h("tbody", null, this.pagedResult().map(function (gardener) { return (h("tr", null, h("td", null, gardener.Person), h("td", null, gardener.Inhalt), h("td", null, gardener.Dokumententyp), h("td", null, gardener.Jahr), h("td", null, gardener.Autor), h("td", null, h("a", { class: "link", title: "Details", href: '#id' + gardener['ID'], onClick: function () { return _this.recordSelectedHandler(gardener.ID); } }, h("i", { class: "fa fa-info-circle fa-lg" }))))); }))), h("results-pagination", { "current-page": this.currentPage, pages: this.pages })));
    };
    Object.defineProperty(Results, "watchers", {
        get: function () {
            return {
                "results": ["watchHandler"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return Results;
}());
Results.style = resultsCss;
var gardenerSearchCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}@media (min-width: 768px){gardener-search{padding:25px}}gardener-search *{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search *:before,gardener-search *:after{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search .h100{height:100%}";
var MyComponent = /** @class */ (function () {
    function class_1(hostRef) {
        registerInstance(this, hostRef);
        this.errors = [];
        this.loading = true;
    }
    class_1.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, fetch(this.api, {
                                method: "GET",
                                mode: "cors",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            })];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) {
                            // Prepare for catch(err)
                            throw new Error(response.status + ": " + response.statusText);
                        }
                        _a = this;
                        _b = this;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.results = _b.filteredResults = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _c.sent();
                        this.errors.push(err_1.message);
                        this.errors.push("Datenbank konnte nicht geladen werden.");
                        return [3 /*break*/, 5];
                    case 4:
                        this.loading = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    class_1.prototype.componentWillLoad = function () {
        if (!this.api) {
            this.errors.push("Datenbank nicht definiert.");
        }
        else {
            this.loadData();
        }
    };
    class_1.prototype.filterResultHandler = function (event) {
        this.filteredResults = event.detail;
    };
    class_1.prototype.recordSelectedHandler = function (record) {
        if (record.detail) {
            this.selectedRecord = this.filteredResults.filter(function (element) { return (element.ID == record.detail); }).shift();
            window.location.hash = "id" + record.detail;
        }
        else {
            // window.location.hash = "results";
            this.selectedRecord = null;
        }
    };
    class_1.prototype.return_errors = function (errors) {
        return (h(Host, null, h("h5", null, "Fehler"), errors.map(function (error) { return (h("div", null, error)); })));
    };
    class_1.prototype.render = function () {
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
    };
    return class_1;
}());
MyComponent.style = gardenerSearchCss;
var spinnerCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}:host{display:block}";
var Spinner = /** @class */ (function () {
    function Spinner(hostRef) {
        registerInstance(this, hostRef);
    }
    Spinner.prototype.render = function () {
        return (h(Host, null, h("div", { class: "d-flex justify-content-lg-center py-3" }, h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), h("span", { class: "sr-only" }, "Loading..."))));
    };
    return Spinner;
}());
Spinner.style = spinnerCss;
var paginationCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}results-pagination{display:block}";
var Pagination = /** @class */ (function () {
    function Pagination(hostRef) {
        registerInstance(this, hostRef);
        this.pageSelected = createEvent(this, "pageSelected", 7);
    }
    Pagination.prototype.pageSelectedHandler = function (e, record) {
        e.preventDefault();
        this.pageSelected.emit(record);
    };
    Pagination.prototype.changePage = function (page) {
        this.currentPage = page;
        this.pageSelected.emit(page);
    };
    Pagination.prototype.pagination = function () {
        var _this = this;
        var pages = [];
        var loop_start = this.currentPage - 3;
        var loop_end = this.currentPage + 3;
        // Correct start and end if negative
        if (loop_start < 0) {
            loop_end += Math.abs(loop_start);
            loop_start = 1;
        }
        if (this.pages > 1) {
            // First Page
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(1); } }, "\u00AB")));
            // Previous Page
            if (this.currentPage > 1) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(_this.currentPage - 1); } }, "\u2039")));
                // Previous Page Disabled
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u2039")));
            }
            var _loop_2 = function (i) {
                // Active Page
                if (i === this_2.currentPage) {
                    pages.push(h("li", { class: "page-item active" }, h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(i); } }, i)));
                }
            };
            var this_2 = this;
            // Loop Pages
            for (var i = 1; i <= this.pages; i++) {
                _loop_2(i);
            }
            // Next Page
            if (this.currentPage < this.pages) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(_this.currentPage + 1); } }, "\u203A")));
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u203A")));
            }
            // Last Page
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(_this.pages); } }, "\u00BB")));
        }
        return pages;
    };
    Pagination.prototype.render = function () {
        return (h(Host, null, h("nav", { "aria-label": "Navigate results" }, h("ul", { class: "pagination justify-content-center" }, this.pagination()))));
    };
    return Pagination;
}());
Pagination.style = paginationCss;
export { FilterBar as filter_bar, Detail as gardener_detail, Results as gardener_results, MyComponent as gardener_search, Spinner as loading_spinner, Pagination as results_pagination };
