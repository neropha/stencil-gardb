'use strict';

const core = require('./core-013e6d42.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["gardener-detail_5.cjs",[[0,"gardener-search",{"api":[1],"filteredResult":[32],"selectedRecord":[32],"errors":[32],"formValues":[32]},[[0,"recordSelected","recordSelectedHandler"]]],[0,"gardener-results",{"results":[8],"currentPage":[32],"selectedRecord":[32],"pages":[32],"currentRecord":[32]},[[0,"pageSelected","changePageHandler"]]],[0,"gardener-detail",{"record":[8],"cleanRecord":[32]}],[0,"loading-spinner"],[0,"results-pagination",{"currentPage":[2,"current-page"],"pages":[2]}]]]], options);
});
