'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1f060336.js');
const patch = require('./patch-71b35088.js');

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patch.patchEsm().then(() => {
  return index.bootstrapLazy([["print-errors.cjs",[[0,"print-errors",{"errors":[8]}]]],["filter-bar_6.cjs",[[0,"gardener-search",{"api":[1],"selectedRecord":[32],"errors":[32],"results":[32],"filteredResults":[32],"loading":[32]},[[0,"filterEvent","filterResultHandler"],[0,"recordSelected","recordSelectedHandler"]]],[0,"gardener-results",{"results":[8],"currentPage":[32],"selectedRecord":[32],"pages":[32],"currentRecord":[32]},[[0,"pageSelected","changePageHandler"]]],[0,"filter-bar",{"results":[8],"filteredResults":[32],"formValues":[32]}],[0,"gardener-detail",{"record":[8],"cleanRecord":[32]},[[8,"hashchange","handleScroll"]]],[0,"loading-spinner"],[0,"results-pagination",{"currentPage":[2,"current-page"],"pages":[2]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
