import { b as bootstrapLazy } from './index-1ede1968.js';
import { a as patchEsm } from './patch-accd80c5.js';
var defineCustomElements = function (win, options) {
    if (typeof window === 'undefined')
        return Promise.resolve();
    return patchEsm().then(function () {
        return bootstrapLazy([["print-errors", [[0, "print-errors", { "errors": [8] }]]], ["filter-bar_6", [[0, "gardener-search", { "api": [1], "selectedRecord": [32], "errors": [32], "results": [32], "filteredResults": [32] }, [[0, "filterEvent", "filterResultHandler"], [0, "recordSelected", "recordSelectedHandler"]]], [0, "gardener-results", { "results": [8], "currentPage": [32], "selectedRecord": [32], "pages": [32], "currentRecord": [32] }, [[0, "pageSelected", "changePageHandler"]]], [0, "filter-bar", { "results": [8], "filteredResults": [32], "formValues": [32] }], [0, "gardener-detail", { "record": [8], "cleanRecord": [32] }, [[8, "hashchange", "handleScroll"]]], [0, "loading-spinner"], [0, "results-pagination", { "currentPage": [2, "current-page"], "pages": [2] }]]]], options);
    });
};
export { defineCustomElements };
