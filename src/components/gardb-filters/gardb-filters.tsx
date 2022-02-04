import { Component, Element, Host, h, State, Prop, Event, EventEmitter, Watch } from "@stencil/core";

@Component({
  tag: "gardb-filters",
  styleUrl: "gardb-filters.scss",
  shadow: false,
})
export class FilterBar {
  @Element() host: HTMLElement;
  @Event() recordSelected: EventEmitter;
  @Prop() results: any;
  @State() letter: string;
  @State() filteredResults: any;
  @State() formValues = {
    person: "",
    year: "",
    keyword: "",
  };

  componentWillLoad() {
    this.filteredResults = this.results;
  }
  // Store Form Value Properties
  handleFormInput(event) {
    this.formValues[event.target.id] = event.target.value;
  }


  @Event() filterEvent: EventEmitter<any>;

  // Watch for changed result-set and broadcast value for event listener in parent component
  @Watch("filteredResults")
  watchStateHandler(newValue: any) {
    // Broadcast Event and reset results to filtered value
    this.filterEvent.emit(newValue);
  }

  private filterByPerson(needle, haystack) {
    // Searches in Person and Autor
    let indexedFields = [haystack.Person, haystack.Autor].join().toLowerCase();
    return indexedFields.includes(needle);
  }
  private filterByYear(needle, haystack) {
    let indexedFields = [haystack.Jahr].join().toLowerCase();
    return indexedFields.includes(needle);
  }
  private filterByKeyword(needle, haystack) {
    // Searches in Inhalt | Dokumententyp | Zeitschrift |
    let indexedFields = [haystack.Inhalt, haystack.Dokumententyp, haystack.Zeitschrift].join().toLowerCase();
    return indexedFields.includes(needle);
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
    return true;
  }

  public submitSearch(e) {
    e.preventDefault();
    this.recordSelected.emit(null);
    this.filteredResults = this.results;
    for (let [key, value] of Object.entries(this.formValues)) {
      value = value.toLowerCase();
      if (value.length > 0) {
        if (key == "person") {
          this.filteredResults = this.filteredResults.filter(record => this.filterByPerson(value, record));
        }
        if (key == "year") {
          this.filteredResults = this.filteredResults.filter(record => this.filterByYear(value, record));
        }
        if (key == "keyword") {
          this.filteredResults = this.filteredResults.filter(record => this.filterByKeyword(value, record));
        }
      }
    }
  }

  public resetSearch(e) {
    e.preventDefault();
    this.recordSelected.emit(null);
    this.filteredResults = this.results;
    // this.selectedRecord = undefined;
    for (let [key] of Object.entries(this.formValues)) {
      // Reset Form Value Properties
      // Will automatically empty form, because of Prop Value Variable
      this.formValues[key] = "";
    }
  }

  public filterLetter(e) {
    e.preventDefault();
    this.resetSearch(e);
    this.letter = e.target.innerText.toLowerCase();
    this.filteredResults = this.results.filter(record => this.filterByInitial(this.letter, record));
  }

  public glossar() {
    let glossary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var letters = [];
    glossary.forEach(element => {
      element = (
        <li>
          <a href="#" onClick={e => this.filterLetter(e)}>
            {element}
          </a>
        </li>
      );
      letters.push(element);
    });

    return letters;
  }

  render() {
    return (
      <Host>
        <form id="form" class="gardb-search-filter">
          <div class="border p-3">
            <h4 class="mb-3">Datensatz finden</h4>
            <div class="row align-items-end">
              <div class="field-person form-group col-12 col-md-4 col-lg-3">
                <label class="col-form-label">Person/Autor</label>
                <div>
                  <input class="form-control" type="text" id="person" value={this.formValues.person} onInput={event => this.handleFormInput(event)} />
                </div>
              </div>
              <div class="field-year form-group col-12 col-md-4 col-lg-3">
                <label class="col-form-label">Jahr</label>
                <div>
                  <input class="form-control" type="text" id="year" value={this.formValues.year} onInput={event => this.handleFormInput(event)} />
                </div>
              </div>
              <div class="field-keyword form-group col-12 col-md-4 col-lg-3">
                <label class="col-form-label">Stichwort</label>
                <div>
                  <input class="form-control" type="text" id="keyword" value={this.formValues.keyword} onInput={event => this.handleFormInput(event)} />
                </div>
              </div>
              <div class="form-group submit col pt-3 pt-lg-0">
                <button type="submit" class="btn btn-primary submit-all" onClick={e => this.submitSearch(e)}>
                  Suchen
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-12 col-lg-9">
              <div class="border p-3 ">
                <h4 class="mb-3">Nach Anfangsbuchstaben filtern</h4>
                <ul class="glossary d-flex flex-wrap justify-content-start">{this.glossar()}</ul>
              </div>
            </div>
            <div class="gardb-search-reset col-12 col-lg-3 mt-3 mt-lg-0 pl-lg-0">
              <div class="border p-3 h100">
                <button type="button" class="btn btn-outline-dark btn-sm submit-selection" onClick={e => this.resetSearch(e)}>
                  Zurücksetzen
                </button>
              </div>
            </div>
          </div>
        </form>
      </Host>
    );
  }
}
