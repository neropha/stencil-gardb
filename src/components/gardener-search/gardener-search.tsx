import { Component, Element, Host, State, h, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'gardener-search',
  styleUrl: 'gardener-search.scss',
  shadow: false
})
export class MyComponent {
  @State() filteredResult: any;
  @State() selectedRecord: true;
  @State() errors = [];

  @Element() host: HTMLElement;

  @Prop() public api: string;


  public inputs: any;
  public gardb: any;
  public loading = true;

  async componentWillLoad() {
    console.log(this.api);

    if (!this.api) {
      this.errors.push('Datenbank konnte nicht geladen werden.');
      return false;
    }
    try {
      let response = await fetch(this.api, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(this.api),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(response.status + ': ' + response.statusText);
      }
      this.gardb = await response.json();
      this.filteredResult = this.gardb;
    }
    catch (err) {
      this.errors.push(err.message);
      this.errors.push('Datenbank konnte nicht gelesen werden.');
    }
    finally {
      this.loading = false;
    }

  }

  private filterByPerson(needle, haystack) {
    if (haystack.Person && haystack.Person.length > 0) {
      var person = haystack.Person.toLowerCase();
      if (!person.includes(needle)) {
        return false;
      }
    } else {
      return false;
    }
    console.log('filteredByPerson: ', person)
    return true;
  }
  private filterByYear(needle, haystack) {
    if (haystack.Jahr && haystack.Jahr.length > 0) {
      var year = haystack.Jahr.toLowerCase();
      if (!year.includes(needle)) {
        return false;
      }
    } else {
      return false;
    }
    console.log('filteredByYear: ', year)
    return true;
  }
  private filterByKeyword(needle, haystack) {
    if (haystack.Inhalt && haystack.Inhalt.length > 0) {
      var keyword = haystack.Inhalt.toLowerCase();
      if (!keyword.includes(needle)) {
        return false;
      }
    } else {
      return false;
    }
    console.log('filteredByKeyword: ', keyword)
    return true;
  }

  private filterByInitial(needle, haystack) {
    if (haystack.Person && haystack.Person.length > 0) {
      var name = haystack.Person.toLowerCase();
      if (!name.startsWith(needle)) {
        return false;
      }
    } else {
      return false;
    }
    console.log('filteredByInitial: ', name)
    return true;
  }

  public filterResults(e) {
    e.preventDefault();
    this.inputs = this.host.querySelector('form').querySelectorAll('input');
    this.filteredResult = this.gardb;

    this.inputs.forEach((input) => {
      let value = input.value.toLowerCase();
      if (input.value.length > 0) {
        if (input.id == "person") {
          this.filteredResult = this.filteredResult.filter(record => this.filterByPerson(value, record));
        }
        if (input.id == "year") {
          this.filteredResult = this.filteredResult.filter(record => this.filterByYear(value, record));
        }
        if (input.id == "keyword") {
          this.filteredResult = this.filteredResult.filter(record => this.filterByKeyword(value, record));
        }
      }
    });
  }

  public filterReset(e) {
    e.preventDefault();
    this.filteredResult = this.gardb;
    this.selectedRecord = undefined;
    this.inputs = this.host.querySelector('form').querySelectorAll('input');
    this.inputs.forEach((input) => {
      input.value = "";
    })
  }

  public filterLetter(e) {
    e.preventDefault();
    this.filteredResult = this.gardb;
    var letter = e.toElement.innerText.toLowerCase();
    this.filteredResult = this.filteredResult.filter(record => this.filterByInitial(letter, record));
  }

  public loader() {
    if (this.loading) {
      return (
        <div class="d-flex justify-content-lg-center py-3">
          <i class="fa fa-spinner fa-pulse fa-3x"></i>
          <span class="sr-only">Loading...</span>
        </div>
      )
    }
  }

  public glossar() {
    let glossary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var output = [];
    glossary.forEach((element) => {
      element = <li><a href="#" onClick={(e) => this.filterLetter(e)}>{element}</a></li>;
      output.push(element);
    });

    return output;
  }

  @Listen('recordSelected')
  todoCompletedHandler(event: CustomEvent<any>) {
    console.log('Received the custom recordSelected event: ', event.detail);
    this.selectedRecord = event.detail;
  }

  render() {
    if (this.errors.length > 0) {
      return (
        <Host>
          <h5>Fehler</h5>
          {this.errors.map((error) =>
            <div>{error}</div>
          )}
        </Host>
      )
    }
    if (this.selectedRecord) {
      return (
        <gardener-detail record={this.selectedRecord}></gardener-detail>
      )
    } 
    else if (this.api) {
      return (
        <Host>
          <div class="gardener-search-wrapper">
            <div class="gardener-search-container">
              <form class="gardener-search-filter">
                <div class="row">
                  <div class="col-12 col-md-6 col-xl-5">
                    <div class="h100 border p-3">
                      <h4 class="mb-3">Datensatz finden</h4>
                      <div class="field-person form-group row">
                        <label class="col-12 col-lg-2 col-form-label">Person</label>
                        <div class="col-12 col-lg-10">
                          <input class="form-control" type="text" id="person" />
                        </div>
                      </div>
                      <div class="field-year form-group row">
                        <label class="col-12 col-lg-2 col-form-label">Jahr</label>
                        <div class="col-12 col-lg-10">
                          <input class="form-control" type="text" id="year" /></div>
                      </div>
                      <div class="field-keyword form-group row">
                        <label class="col-12 col-lg-2 col-form-label">Stichwort</label>
                        <div class="col-12 col-lg-10">
                          <input class="form-control" type="text" id="keyword" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6 col-xl-7 mt-3 mt-md-0">
                    <div class="h100 border p-3">
                      <h4 class="mb-3">Nach Namen filtern</h4>
                      <ul class="glossary d-flex flex-wrap justify-content-start justify-content-xl-between">
                        {this.glossar()}
                      </ul>
                    </div>
                  </div>
                  <div class="gardener-search-submit pt-3 pt-lg-4 col-12 d-flex justify-content-end">
                    <button type="button" class="btn btn-primary btn-outline submit-selection" onClick={(e) => this.filterReset(e)}>Zurücksetzen</button>
                    <button type="submit" class="btn btn-primary submit-all" onClick={(e) => this.filterResults(e)}>Filtern</button>
                  </div>
                </div>
                {this.loader()}

              </form>
            </div>
          </div>
          <gardener-results results={this.filteredResult}></gardener-results>
        </Host>
      )
    }
  }
}