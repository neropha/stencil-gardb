var __awaiter=this&&this.__awaiter||function(e,t,r,n){function s(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function l(e){try{o(n.next(e))}catch(t){i(t)}}function a(e){try{o(n["throw"](e))}catch(t){i(t)}}function o(e){e.done?r(e.value):s(e.value).then(l,a)}o((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,s,i,l;return l={next:a(0),throw:a(1),return:a(2)},typeof Symbol==="function"&&(l[Symbol.iterator]=function(){return this}),l;function a(e){return function(t){return o([e,t])}}function o(l){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,s&&(i=l[0]&2?s["return"]:l[0]?s["throw"]||((i=s["return"])&&i.call(s),0):s.next)&&!(i=i.call(s,l[1])).done)return i;if(s=0,i)l=[l[0]&2,i.value];switch(l[0]){case 0:case 1:i=l;break;case 4:r.label++;return{value:l[1],done:false};case 5:r.label++;s=l[1];l=[0];continue;case 7:l=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!i||l[1]>i[0]&&l[1]<i[3])){r.label=l[1];break}if(l[0]===6&&r.label<i[1]){r.label=i[1];i=l;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(l);break}if(i[2])r.ops.pop();r.trys.pop();continue}l=t.call(e,r)}catch(a){l=[6,a];s=0}finally{n=i=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};System.register(["./p-d51bd4bd.system.js"],(function(e){"use strict";var t,r,n,s,i;return{setters:[function(e){t=e.r;r=e.c;n=e.h;s=e.H;i=e.g}],execute:function(){var l=e("gardener_detail",function(){function e(e){t(this,e);this.closeDetail=function(e){e.preventDefault();this.recordSelected.emit(null)};this.recordSelected=r(this,"recordSelected",7)}e.prototype.componentDidLoad=function(){};e.prototype.render=function(){var e=this;if(this.record){return n(s,null,n("button",{type:"button",class:"close btn-sm","aria-label":"Close",onClick:function(t){return e.closeDetail(t)}},"Zurück ",n("i",{class:"fa fa-times-circle fa-lg","aria-hidden":"true"})),n("h4",{class:"mb-3 mb-md-4"},this.record.Person),n("table",{class:"table border-bottom stacktable"},Object.keys(this.record).map((function(t){return n("tr",null,n("td",{class:"label"},n("strong",null,t)),n("td",null,e.record[t]))}))))}};Object.defineProperty(e,"style",{get:function(){return":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-detail{display:block}gardener-detail .close{font-size:inherit}gardener-detail table{table-layout:auto}gardener-detail table .label{width:12em;text-transform:capitalize}"},enumerable:true,configurable:true});return e}());var a=e("gardener_results",function(){function e(e){t(this,e);this.page=1;this.itemsPerPage=50;this.recordSelected=r(this,"recordSelected",7)}e.prototype.componentWillRender=function(){this.total=this.results.length;this.pages=Math.ceil(this.total/this.itemsPerPage)};e.prototype.watchHandler=function(e,t){if(e!=t){this.page=1}};e.prototype.firstItemShown=function(){return this.itemsPerPage*this.page-this.itemsPerPage};e.prototype.lastItemShown=function(){var e=this.itemsPerPage*this.page;var t;if(e>this.total){t=this.total}else{t=e}return t};e.prototype.pagedResult=function(){return this.results.slice(this.firstItemShown(),this.lastItemShown())};e.prototype.recordSelectedHandler=function(e,t){e.preventDefault();this.recordSelected.emit(t)};e.prototype.changePageHandler=function(e){console.log("Received the custom pageSelected event: ",e.detail);this.selectedRecord=e.detail;this.page=e.detail;this.pagedResult()};e.prototype.resultInfo=function(){return n("div",{class:"py-3 py-md-4 small"},"Zeige ",this.total>0?this.firstItemShown()+1+"–"+this.lastItemShown()+" von "+this.total+" Ergebnissen":this.firstItemShown()+" Ergebnisse")};e.prototype.render=function(){var e=this;return n(s,null,n("div",{id:"results"},this.resultInfo(),n("table",{class:"table stacktable border-bottom"},n("thead",null,n("tr",null,n("th",{class:"person"},"Person"),n("th",{class:"content"},"Inhalt"),n("th",{class:"type"},"Dokumententyp"),n("th",{class:"year"},"Jahr"),n("th",{class:"author"},"Autor"),n("th",{class:"details"}," "))),n("tbody",null,this.pagedResult().map((function(t){return n("tr",null,n("td",null,t.Person),n("td",null,t.Inhalt),n("td",null,t.Dokumententyp),n("td",null,t.Jahr),n("td",null,t.Autor),n("td",null,n("a",{class:"link",title:"Details",href:"#",onClick:function(r){return e.recordSelectedHandler(r,t)}},n("i",{class:"fa fa-info-circle fa-lg"}))))})))),n("results-pagination",{"current-page":this.page,pages:this.pages})))};Object.defineProperty(e,"watchers",{get:function(){return{results:["watchHandler"]}},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-results{display:block;overflow:hidden}gardener-results #results{width:100%;overflow:hidden}gardener-results table{table-layout:auto;width:100%}gardener-results table .person{width:20em}gardener-results table .id,gardener-results table .year{width:4em;overflow:hidden;white-space:nowrap}gardener-results table .details{width:1em;overflow:hidden;white-space:nowrap}gardener-results table .author{min-width:12em}gardener-results table a.link{padding:.25em;display:block;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;text-decoration:none}gardener-results table td{overflow:hidden}"},enumerable:true,configurable:true});return e}());var o=e("gardener_search",function(){function e(e){t(this,e);this.errors=[];this.loading=true}e.prototype.loadData=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,r,n;return __generator(this,(function(s){switch(s.label){case 0:s.trys.push([0,3,4,5]);return[4,fetch(this.api,{method:"GET",mode:"cors",headers:{"Content-Type":"application/json"}})];case 1:e=s.sent();if(!e.ok){throw new Error(e.status+": "+e.statusText)}t=this;r=this;return[4,e.json()];case 2:t.gardb=r.filteredResult=s.sent();return[3,5];case 3:n=s.sent();this.errors.push(n.message);this.errors.push("Datenbank konnte nicht gelesen werden.");return[3,5];case 4:this.loading=false;return[7];case 5:return[2]}}))}))};e.prototype.componentWillLoad=function(){if(!this.api){this.errors.push("Datenbank konnte nicht geladen werden.")}else{this.loadData()}};e.prototype.filterByPerson=function(e,t){if(t.Person&&t.Person.length>0){var r=t.Person.toLowerCase();if(!r.includes(e)){return false}}else{return false}console.log("filteredByPerson: ",r);return true};e.prototype.filterByYear=function(e,t){if(t.Jahr&&t.Jahr.length>0){var r=t.Jahr.toLowerCase();if(!r.includes(e)){return false}}else{return false}console.log("filteredByYear: ",r);return true};e.prototype.filterByKeyword=function(e,t){if(t.Inhalt&&t.Inhalt.length>0){var r=t.Inhalt.toLowerCase();if(!r.includes(e)){return false}}else{return false}console.log("filteredByKeyword: ",r);return true};e.prototype.filterByInitial=function(e,t){if(t.Person&&t.Person.length>0){var r=t.Person.toLowerCase();if(!r.startsWith(e)){return false}}else{return false}console.log("filteredByInitial: ",r);return true};e.prototype.filterResults=function(e){var t=this;e.preventDefault();this.inputs=this.host.querySelector("form").querySelectorAll("input");this.filteredResult=this.gardb;this.inputs.forEach((function(e){var r=e.value.toLowerCase();if(e.value.length>0){if(e.id=="person"){t.filteredResult=t.filteredResult.filter((function(e){return t.filterByPerson(r,e)}))}if(e.id=="year"){t.filteredResult=t.filteredResult.filter((function(e){return t.filterByYear(r,e)}))}if(e.id=="keyword"){t.filteredResult=t.filteredResult.filter((function(e){return t.filterByKeyword(r,e)}))}}}))};e.prototype.filterReset=function(e){e.preventDefault();this.filteredResult=this.gardb;this.selectedRecord=undefined;this.inputs=this.host.querySelector("form").querySelectorAll("input");this.inputs.forEach((function(e){e.value=""}))};e.prototype.filterLetter=function(e){var t=this;e.preventDefault();this.filterReset(e);this.filteredResult=this.gardb;var r=e.toElement.innerText.toLowerCase();this.filteredResult=this.filteredResult.filter((function(e){return t.filterByInitial(r,e)}))};e.prototype.glossar=function(){var e=this;var t=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];var r=[];t.forEach((function(t){t=n("li",null,n("a",{href:"#",onClick:function(t){return e.filterLetter(t)}},t));r.push(t)}));return r};e.prototype.todoCompletedHandler=function(e){console.log("Received the custom recordSelected event: ",e.detail);this.selectedRecord=e.detail};e.prototype.return_errors=function(){return n(s,null,n("h5",null,"Fehler"),this.errors.map((function(e){return n("div",null,e)})))};e.prototype.return_record=function(){return n(s,{id:"top"},n("gardener-detail",{record:this.selectedRecord}))};e.prototype.render=function(){var e=this;if(this.errors.length>0){return this.return_errors()}if(this.selectedRecord){return this.return_record()}else if(this.api){return n(s,{id:"top"},n("div",{class:"gardener-search-wrapper"},n("div",{class:"gardener-search-container"},n("form",{id:"form",class:"gardener-search-filter"},n("div",{class:"border p-3"},n("h4",{class:"mb-3"},"Datensatz finden"),n("div",{class:"row align-items-end"},n("div",{class:"field-person form-group col-12 col-md-4 col-lg-3"},n("label",{class:"col-form-label"},"Person"),n("div",null,n("input",{class:"form-control",type:"text",id:"person"}))),n("div",{class:"field-year form-group col-12 col-md-4 col-lg-3"},n("label",{class:"col-form-label"},"Jahr"),n("div",null,n("input",{class:"form-control",type:"text",id:"year"}))),n("div",{class:"field-keyword form-group col-12 col-md-4 col-lg-3"},n("label",{class:"col-form-label"},"Stichwort"),n("div",null,n("input",{class:"form-control",type:"text",id:"keyword"}))),n("div",{class:"form-group submit col pt-3 pt-lg-0"},n("button",{type:"submit",class:"btn btn-outline-primary submit-all",onClick:function(t){return e.filterResults(t)}},"Suchen")))),n("div",{class:"row mt-3"},n("div",{class:"col-12 col-lg-9"},n("div",{class:"border p-3 "},n("h4",{class:"mb-3"},"Nach Namen filtern"),n("ul",{class:"glossary d-flex flex-wrap justify-content-start"},this.glossar()))),n("div",{class:"gardener-search-reset col pl-0"},n("div",{class:"border p-3"},n("button",{type:"button",class:"btn btn-primary btn-sm btn-outline-dark submit-selection",onClick:function(t){return e.filterReset(t)}},"Zurücksetzen"))))))),!this.loading?n("gardener-results",{results:this.filteredResult}):n("loading-spinner",null))}};Object.defineProperty(e.prototype,"host",{get:function(){return i(this)},enumerable:true,configurable:true});Object.defineProperty(e,"style",{get:function(){return":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}gardener-search{font-weight:400;font-family:inherit;font-size:var(--gs-font-size-base);-webkit-font-smoothing:antialiased;display:block;background:var(--gs-color-bg);color:var(--gs-color-text);line-height:1.4;padding:15px;max-height:100%}\@media (min-width:768px){gardener-search{padding:25px}}gardener-search *,gardener-search :after,gardener-search :before{-webkit-box-sizing:border-box;box-sizing:border-box}gardener-search p{margin:0 0 1em 0}gardener-search h2,gardener-search h3,gardener-search h4{margin-top:0;text-transform:uppercase;font-family:inherit}gardener-search p+h4{margin-top:1.5em}gardener-search button{margin:10px 0 0;white-space:nowrap;-webkit-appearance:none;padding-right:25px;padding-left:25px;display:block;-ms-flex:1;flex:1}gardener-search button+button{margin-left:10px}\@media (min-width:480px){gardener-search button{margin:0;display:inline-block;min-width:200px;-ms-flex:none;flex:none}}gardener-search .gardener-search-wrapper .gardener-search-content{overflow:auto}gardener-search .gardener-search-wrapper .gardener-search-options{padding:0;margin:0;background:0 none}\@media (min-width:1024px){gardener-search .gardener-search-wrapper .gardener-search-options{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center}}gardener-search .h100{height:100%}gardener-search .glossary{list-style:none;padding:0}gardener-search .glossary li{text-transform:uppercase;font-weight:700;min-width:25px;min-height:25px;text-align:center;line-height:20px;font-size:18px}gardener-search .glossary li a{display:block;height:100%;text-decoration:none;-webkit-transition:all .2s cubic-bezier(.075,.82,.165,1);transition:all .2s cubic-bezier(.075,.82,.165,1)}gardener-search .glossary li a:hover{-webkit-transform:scale(1.5);transform:scale(1.5)}gardener-search button{text-transform:uppercase;background-color:var(--gs-color-primary);color:#fff;text-align:center;text-decoration:none}\@media (min-width:1024px){gardener-search button{width:100%}}gardener-search button:focus{outline:none}gardener-search button.submit-selection{background-color:transparent}gardener-search button.submit-selection:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem rgba(0,0,0,.05)}gardener-search button.submit-all:focus{-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color);box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 0 .2rem var(--gs-button-primary-focus-color)}"},enumerable:true,configurable:true});return e}());var u=e("loading_spinner",function(){function e(e){t(this,e)}e.prototype.render=function(){return n(s,null,n("div",{class:"d-flex justify-content-lg-center py-3"},n("i",{class:"fa fa-circle-o-notch fa-pulse fa-2x"}),n("span",{class:"sr-only"},"Loading...")))};Object.defineProperty(e,"style",{get:function(){return":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}:host{display:block}"},enumerable:true,configurable:true});return e}());var c=e("results_pagination",function(){function e(e){t(this,e);this.currentPage=1;this.pageSelected=r(this,"pageSelected",7)}e.prototype.pageSelectedHandler=function(e,t){e.preventDefault();this.pageSelected.emit(t)};e.prototype.changePage=function(e){this.currentPage=e;this.pageSelected.emit(e)};e.prototype.pagination=function(){var e=this;var t=[];var r=this.currentPage-3;var s=this.currentPage+3;if(r<0){s+=Math.abs(r);r=1}if(this.pages>1){t.push(n("li",{class:"page-item"},n("a",{class:"page-link",href:"#results",onClick:function(){return e.changePage(1)}},"«")));if(this.currentPage>1){t.push(n("li",{class:"page-item"},n("a",{class:"page-link",href:"#results",onClick:function(){return e.changePage(e.currentPage-1)}},"‹")))}else{t.push(n("li",{class:"page-item disabled"},n("span",{class:"page-link"},"‹")))}var i=function(i){if(i===l.currentPage){t.push(n("li",{class:"page-item active"},n("span",{class:"page-link",tabindex:"1 "},i)))}else if(i>=r&&i<=s){t.push(n("li",{class:"page-item"},n("a",{class:"page-link",href:"#results",onClick:function(){return e.changePage(i)}},i)))}};var l=this;for(var a=1;a<=this.pages;a++){i(a)}if(this.currentPage<this.pages){t.push(n("li",{class:"page-item"},n("a",{class:"page-link",href:"#results",onClick:function(){return e.changePage(e.currentPage+1)}},"›")))}else{t.push(n("li",{class:"page-item disabled"},n("span",{class:"page-link"},"›")))}t.push(n("li",{class:"page-item"},n("a",{class:"page-link",href:"#results",onClick:function(){return e.changePage(e.pages)}},"»")))}return t};e.prototype.render=function(){return n(s,null,n("nav",{"aria-label":"Navigate results"},n("ul",{class:"pagination justify-content-center"},this.pagination())))};Object.defineProperty(e,"style",{get:function(){return":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71bc51;--gs-color-secondary:#2196f3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#fff}results-pagination{display:block}"},enumerable:true,configurable:true});return e}())}}}));