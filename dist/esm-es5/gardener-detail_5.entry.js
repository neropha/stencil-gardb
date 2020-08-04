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
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './core-6bb5faa5.js';
var Detail = /** @class */ (function () {
    function Detail(hostRef) {
        registerInstance(this, hostRef);
        this.closeDetail = function (e) {
            e.preventDefault();
            this.recordSelected.emit(null);
        };
        this.recordSelected = createEvent(this, "recordSelected", 7);
    }
    Detail.prototype.componentDidLoad = function () {
    };
    Detail.prototype.render = function () {
        var _this = this;
        if (this.record) {
            return (h(Host, null, h("button", { type: "button", class: "close btn-sm", "aria-label": "Close", onClick: function (e) { return _this.closeDetail(e); } }, "Zur\u00FCck ", h("i", { class: "fa fa-times-circle fa-lg", "aria-hidden": "true" })), h("h4", { class: "mb-3 mb-md-4" }, this.record.Person), h("table", { class: "table border-bottom stacktable" }, Object.keys(this.record).map(function (key) { return (h("tr", null, h("td", { class: "label" }, h("strong", null, key)), h("td", null, _this.record[key]))); }))));
        }
    };
    Object.defineProperty(Detail, "style", {
        get: function () { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-detail{display:block}gardener-detail .close{font-size:inherit}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}"; },
        enumerable: true,
        configurable: true
    });
    return Detail;
}());
var Results = /** @class */ (function () {
    function Results(hostRef) {
        registerInstance(this, hostRef);
        this.page = 1;
        this.itemsPerPage = 50;
        this.recordSelected = createEvent(this, "recordSelected", 7);
    }
    Results.prototype.componentWillRender = function () {
        this.total = this.results.length;
        this.pages = Math.ceil(this.total / this.itemsPerPage);
    };
    Results.prototype.watchHandler = function (newValue, oldValue) {
        if (newValue != oldValue) {
            this.page = 1;
        }
    };
    Results.prototype.firstItemShown = function () {
        return (this.itemsPerPage * this.page) - this.itemsPerPage;
    };
    Results.prototype.lastItemShown = function () {
        var lastCount = this.itemsPerPage * this.page;
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
    Results.prototype.recordSelectedHandler = function (e, record) {
        e.preventDefault();
        this.recordSelected.emit(record);
    };
    Results.prototype.changePageHandler = function (event) {
        console.log('Received the custom pageSelected event: ', event.detail);
        this.selectedRecord = event.detail;
        this.page = event.detail;
        this.pagedResult();
    };
    Results.prototype.resultInfo = function () {
        return (h("div", { class: "py-3 py-md-4 small" }, 'Zeige ', (this.total > 0)
            ? (this.firstItemShown() + 1) + '–' + this.lastItemShown() + ' von ' + this.total + ' Ergebnissen'
            : this.firstItemShown() + ' Ergebnisse'));
    };
    Results.prototype.render = function () {
        var _this = this;
        return (h(Host, null, h("div", { id: "results" }, this.resultInfo(), h("table", { class: "table stacktable border-bottom" }, h("thead", null, h("tr", null, h("th", { class: "person" }, "Person"), h("th", { class: "content" }, "Inhalt"), h("th", { class: "type" }, "Dokumententyp"), h("th", { class: "year" }, "Jahr"), h("th", { class: "author" }, "Autor"), h("th", { class: "details" }, "\u00A0"))), h("tbody", null, this.pagedResult().map(function (gardener) { return h("tr", null, h("td", null, gardener.Person), h("td", null, gardener.Inhalt), h("td", null, gardener.Dokumententyp), h("td", null, gardener.Jahr), h("td", null, gardener.Autor), h("td", null, h("a", { class: "link", title: "Details", href: "#", onClick: function (e) { return _this.recordSelectedHandler(e, gardener); } }, h("i", { class: "fa fa-info-circle fa-lg" })))); }))), h("results-pagination", { "current-page": this.page, pages: this.pages }))));
    };
    Object.defineProperty(Results, "watchers", {
        get: function () {
            return {
                "results": ["watchHandler"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Results, "style", {
        get: function () { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-results{display:block;overflow:hidden}gardener-results #results{width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id,gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}"; },
        enumerable: true,
        configurable: true
    });
    return Results;
}());
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
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })];
                    case 1:
                        response = _c.sent();
                        if (!response.ok) {
                            throw new Error(response.status + ': ' + response.statusText);
                        }
                        _a = this;
                        _b = this;
                        return [4 /*yield*/, response.json()];
                    case 2:
                        _a.gardb = _b.filteredResult = _c.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _c.sent();
                        this.errors.push(err_1.message);
                        this.errors.push('Datenbank konnte nicht gelesen werden.');
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
        // console.log(this.api);
        if (!this.api) {
            this.errors.push('Datenbank konnte nicht geladen werden.');
        }
        else {
            this.loadData();
        }
    };
    class_1.prototype.filterByPerson = function (needle, haystack) {
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
    };
    class_1.prototype.filterByYear = function (needle, haystack) {
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
    };
    class_1.prototype.filterByKeyword = function (needle, haystack) {
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
    };
    class_1.prototype.filterByInitial = function (needle, haystack) {
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
    };
    class_1.prototype.filterResults = function (e) {
        var _this = this;
        e.preventDefault();
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.filteredResult = this.gardb;
        this.inputs.forEach(function (input) {
            var value = input.value.toLowerCase();
            if (input.value.length > 0) {
                if (input.id == "person") {
                    _this.filteredResult = _this.filteredResult.filter(function (record) { return _this.filterByPerson(value, record); });
                }
                if (input.id == "year") {
                    _this.filteredResult = _this.filteredResult.filter(function (record) { return _this.filterByYear(value, record); });
                }
                if (input.id == "keyword") {
                    _this.filteredResult = _this.filteredResult.filter(function (record) { return _this.filterByKeyword(value, record); });
                }
            }
        });
    };
    class_1.prototype.filterReset = function (e) {
        e.preventDefault();
        this.filteredResult = this.gardb;
        this.selectedRecord = undefined;
        this.inputs = this.host.querySelector('form').querySelectorAll('input');
        this.inputs.forEach(function (input) {
            input.value = "";
        });
    };
    class_1.prototype.filterLetter = function (e) {
        var _this = this;
        e.preventDefault();
        this.filteredResult = this.gardb;
        var letter = e.toElement.innerText.toLowerCase();
        this.filteredResult = this.filteredResult.filter(function (record) { return _this.filterByInitial(letter, record); });
    };
    class_1.prototype.glossar = function () {
        var _this = this;
        var glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        var output = [];
        glossary.forEach(function (element) {
            element = h("li", null, h("a", { href: "#", onClick: function (e) { return _this.filterLetter(e); } }, element));
            output.push(element);
        });
        return output;
    };
    class_1.prototype.todoCompletedHandler = function (event) {
        console.log('Received the custom recordSelected event: ', event.detail);
        this.selectedRecord = event.detail;
    };
    class_1.prototype.return_errors = function () {
        return (h(Host, null, h("h5", null, "Fehler"), this.errors.map(function (error) { return h("div", null, error); })));
    };
    class_1.prototype.return_record = function () {
        return (h(Host, { id: "top" }, h("gardener-detail", { record: this.selectedRecord })));
    };
    class_1.prototype.render = function () {
        var _this = this;
        if (this.errors.length > 0) {
            return this.return_errors();
        }
        if (this.selectedRecord) {
            return this.return_record();
        }
        else if (this.api) {
            return (h(Host, { id: "top" }, h("div", { class: "gardener-search-wrapper" }, h("div", { class: "gardener-search-container" }, h("form", { id: "form", class: "gardener-search-filter" }, h("div", { class: "row" }, h("div", { class: "col-12 col-md-6 col-xl-5" }, h("div", { class: "h100 border p-3" }, h("h4", { class: "mb-3" }, "Datensatz finden"), h("div", { class: "field-person form-group row" }, h("label", { class: "col-12 col-lg-2 col-form-label" }, "Person"), h("div", { class: "col-12 col-lg-10" }, h("input", { class: "form-control", type: "text", id: "person" }))), h("div", { class: "field-year form-group row" }, h("label", { class: "col-12 col-lg-2 col-form-label" }, "Jahr"), h("div", { class: "col-12 col-lg-10" }, h("input", { class: "form-control", type: "text", id: "year" }))), h("div", { class: "field-keyword form-group row" }, h("label", { class: "col-12 col-lg-2 col-form-label" }, "Stichwort"), h("div", { class: "col-12 col-lg-10" }, h("input", { class: "form-control", type: "text", id: "keyword" }))))), h("div", { class: "col-12 col-md-6 col-xl-7 mt-3 mt-md-0" }, h("div", { class: "h100 border p-3" }, h("h4", { class: "mb-3" }, "Nach Namen filtern"), h("ul", { class: "glossary d-flex flex-wrap justify-content-start justify-content-xl-between" }, this.glossar()))), h("div", { class: "gardener-search-submit pt-3 pt-lg-4 col-12 d-flex justify-content-end" }, h("button", { type: "button", class: "btn btn-primary btn-outline submit-selection", onClick: function (e) { return _this.filterReset(e); } }, "Zur\u00FCcksetzen"), h("button", { type: "submit", class: "btn btn-primary submit-all", onClick: function (e) { return _this.filterResults(e); } }, "Filtern")))))), !this.loading
                ? h("gardener-results", { results: this.filteredResult })
                : h("loading-spinner", null)));
        }
    };
    Object.defineProperty(class_1.prototype, "host", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(class_1, "style", {
        get: function () { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}\@media (min-width:768px){gardener-search{padding:25px}}gardener-search *,gardener-search :after,gardener-search :before{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;text-transform:uppercase}gardener-search p+h4{margin-top:1.5em}gardener-search .gardener-search-wrapper{display:-ms-flexbox;display:flex}gardener-search .gardener-search-wrapper .gardener-search-content{overflow:auto}gardener-search .gardener-search-wrapper .gardener-search-options{padding:0;margin:0;background:0 none}\@media (min-width:1024px){gardener-search .gardener-search-wrapper .gardener-search-options{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}}gardener-search .gardener-search-wrapper .gardener-search-submit{-ms-flex:1;flex:1}\@media (min-width:768px){gardener-search .gardener-search-wrapper .gardener-search-submit{display:-ms-flexbox;display:flex}}gardener-search .gardener-search-wrapper .gardener-search-submit button{margin:10px 0 0;white-space:nowrap;-webkit-appearance:none;padding-right:25px;padding-left:25px;display:block;-ms-flex:1;flex:1}gardener-search .gardener-search-wrapper .gardener-search-submit button+button{margin-left:10px}\@media (min-width:480px){gardener-search .gardener-search-wrapper .gardener-search-submit button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}gardener-search .h100{height:100%}gardener-search .glossary{list-style:none;padding:0}gardener-search .glossary li{text-transform:uppercase;font-weight:700;min-width:20px;min-height:20px;text-align:center;line-height:20px}gardener-search .glossary li a{display:block;text-decoration:none;-webkit-transition:all .2s cubic-bezier(.075,.82,.165,1);transition:all .2s cubic-bezier(.075,.82,.165,1)}gardener-search .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}gardener-search button{text-transform:uppercase;background-color:var(--gs-color-primary);border:1px solid var(--gs-color-primary);color:#fff;padding:1.2em;text-align:center;text-decoration:none;display:inline-block;font-size:.875em;border-radius:var(--gs-border-radius)}gardener-search button:focus{outline:none}gardener-search button.submit-selection{background-color:transparent;border:1px solid var(--gs-color-border);color:var(--gs-color-border)}gardener-search button.submit-selection:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05)}gardener-search button.submit-all:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color)}"; },
        enumerable: true,
        configurable: true
    });
    return class_1;
}());
var Spinner = /** @class */ (function () {
    function Spinner(hostRef) {
        registerInstance(this, hostRef);
    }
    Spinner.prototype.render = function () {
        return (h(Host, null, h("div", { class: "d-flex justify-content-lg-center py-3" }, h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), h("span", { class: "sr-only" }, "Loading..."))));
    };
    Object.defineProperty(Spinner, "style", {
        get: function () { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}:host{display:block}"; },
        enumerable: true,
        configurable: true
    });
    return Spinner;
}());
var Pagination = /** @class */ (function () {
    function Pagination(hostRef) {
        registerInstance(this, hostRef);
        this.currentPage = 1;
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
            var _loop_1 = function (i) {
                // Active Page
                if (i === this_1.currentPage) {
                    pages.push(h("li", { class: "page-item active" }, h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: function () { return _this.changePage(i); } }, i)));
                }
            };
            var this_1 = this;
            // Loop Pages
            for (var i = 1; i <= this.pages; i++) {
                _loop_1(i);
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
    Object.defineProperty(Pagination, "style", {
        get: function () { return ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}results-pagination{display:block}"; },
        enumerable: true,
        configurable: true
    });
    return Pagination;
}());
export { Detail as gardener_detail, Results as gardener_results, MyComponent as gardener_search, Spinner as loading_spinner, Pagination as results_pagination };
