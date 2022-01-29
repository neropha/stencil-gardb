import { b as bootstrapLazy } from './index-e1351b7d.js';
import { p as patchBrowser, g as globalScripts } from './app-globals-453ea569.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["gardener-search",[[0,"gardener-search",{"api":[1],"selectedRecord":[32],"errors":[32],"results":[32],"filteredResults":[32]},[[0,"filterEvent","filterResultHandler"],[0,"recordSelected","recordSelectedHandler"]]]]],["print-errors",[[0,"print-errors",{"errors":[8]}]]],["gardener-results",[[0,"gardener-results",{"results":[8],"currentPage":[32],"selectedRecord":[32],"pages":[32],"currentRecord":[32]},[[0,"pageSelected","changePageHandler"]]]]],["filter-bar",[[0,"filter-bar",{"results":[8],"filteredResults":[32],"formValues":[32]}]]],["gardener-detail",[[0,"gardener-detail",{"record":[8],"cleanRecord":[32]},[[8,"hashchange","handleScroll"]]]]],["loading-spinner",[[0,"loading-spinner"]]],["results-pagination",[[0,"results-pagination",{"currentPage":[2,"current-page"],"pages":[2]}]]]], options);
});
