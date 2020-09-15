import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-93a7cc70.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["gardener-results",[[0,"gardener-results",{"results":[8],"selectedRecord":[32],"page":[32],"pages":[32],"currentRecord":[32]},[[0,"pageSelected","changePageHandler"]]]]],["gardener-detail",[[0,"gardener-detail",{"record":[8]}]]],["loading-spinner",[[0,"loading-spinner"]]],["results-pagination",[[0,"results-pagination",{"currentPage":[2,"current-page"],"pages":[2]}]]],["gardener-search",[[0,"gardener-search",{"api":[1],"filteredResult":[32],"selectedRecord":[32],"errors":[32]},[[0,"recordSelected","todoCompletedHandler"]]]]]], options);
});
