import { Component, Element, State, h, Prop } from '@stencil/core';

@Component({
  tag: 'gardener-search',
  styleUrl: 'gardener-search.scss',
  shadow: false
})
export class MyComponent {
  @State() filteredResult: any;
  @Element() host: HTMLElement;

  @Prop() public api: string;

  public inputs: any;
  public gardb: any;
  public loading = true;

  async componentWillLoad() {
    console.log(this.api);
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
        throw new Error(response.statusText);
      }
      this.loading = false;
      this.gardb = await response.json();
      this.filteredResult = this.gardb;
    } catch (err) {
      console.log(err);
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
    return true;
  }
  private filterByKeyword(needle, haystack) {
    if (haystack.Inhalt && haystack.Inhalt.length > 0) {
      var keyword = haystack.Inhalt.toLowerCase();
      if (!keyword.includes(needle)) {
        console.log(keyword)
        return false;
      }
    } else {
      return false;
    }
    return true;
  }

  public filterResults(e) {
    e.preventDefault();
    this.inputs = this.host.querySelector('form').querySelectorAll('input');
    this.filteredResult = this.gardb;

    this.inputs.forEach((input) => {
      console.log(input.id, input.value);
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
    this.inputs = this.host.querySelector('form').querySelectorAll('input');
    this.inputs.forEach((input) => {
      input.value = "";
    }
  }

  public loader() {
    if (this.loading) {
      return (
        <div class="d-flex justify-content-lg-center py-3">
          <i class="fa fa-spinner fa-pulse fa-3x fa-lg"></i>
          <span class="sr-only">Loading...</span>
        </div>
      )
    }
  }

  public glossar() {
    let glossary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    glossary.forEach((element, index) => {
      element = <li><a href="#">{element}</a></li>;
      glossary[index] = element;
    });
    
    return glossary;
  }


  render() {
    return (

      <div class="gardener-search-wrapper">
        <div class="gardener-search-container">
          <form class="gardener-search-filter">
            <div class="row">
              <div class="col-12 col-md-5">
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
              <div class="col-12 col-md-7">
                <h4 class="mb-3">Inhalte filtern</h4>
                <ul class="glossary d-flex justify-content-between">
                  {this.glossar()}
                </ul>
              </div>
              <div class="gardener-search-submit pt-3 pt-lg-4 col d-flex justify-content-end">
                <button type="button" class="submit-selection" onClick={(e) => this.filterReset(e)}>Zurücksetzen</button>
                <button type="submit" class="submit-all" onClick={(e) => this.filterResults(e)}>Filtern</button>
              </div>
            </div>
            {this.loader()}

            <gardener-results results={this.filteredResult}></gardener-results>

          </form>
        </div>
      </div>
    )
  }
}

