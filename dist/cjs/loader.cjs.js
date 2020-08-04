'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-013e6d42.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["gardener-detail_5.cjs",[[0,"gardener-search",{"api":[1],"filteredResult":[32],"selectedRecord":[32],"errors":[32]},[[0,"recordSelected","todoCompletedHandler"]]],[0,"gardener-results",{"results":[8],"selectedRecord":[32],"page":[32],"pages":[32],"currentRecord":[32]},[[0,"pageSelected","changePageHandler"]]],[0,"gardener-detail",{"record":[8]}],[0,"loading-spinner"],[0,"results-pagination",{"currentPage":[2,"current-page"],"pages":[2]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
