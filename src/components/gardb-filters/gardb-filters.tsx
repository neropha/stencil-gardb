import { Component, Element, Host, h, State } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { MessageService } from "../../services/message.service";
import { FilterService } from "../../services/filter.service";

const formLabels = {
  person: "Person/Autor",
  year: "Jahr",
  keyword: "Stichwort",
};


@Component({
  tag: "gardb-filters",
  styleUrl: "gardb-filters.scss",
  shadow: false,
})
export class FilterBar {
  public gardbService: GardbService;
  public messageService: MessageService;
  public filterService = new FilterService();

  @Element() host: HTMLElement;
  @State() formValues = {
    person: "",
    year: "",
    keyword: "",
  };

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  // Store Form Value Properties
  handleFormInput(e) {
    // triggers state change - even for objects
    this.formValues = { ...this.formValues, [e.target.id]: e.target.value };
  }

  resetFormValues() {
    for (let [key] of Object.entries(this.formValues)) {
      // Reset Form Value Properties
      // Will automatically empty form, because of Prop Value Variable
      this.formValues = { ...this.formValues, [key]: "" };
    }
  }

  renderFormFields(key) {
    return (
      <div class="field-person form-group col-12 col-md-4 col-lg-3">
        <label class="col-form-label">{formLabels[key]}</label>
        <div>
          <input class="form-control" type="text" id={key} name={key} value={this.formValues[key]} onInput={e => this.handleFormInput(e)} />
        </div>
      </div>
    );
  }

  resetSearch(e) {
    e.preventDefault();
    this.filterService.getAllResults();
    this.resetFormValues();
  }

  submitSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    // let formProps = Object.fromEntries(this.formData);
    console.log(e, formData);
    this.filterService.filter(this.formValues.person, this.formValues.year, this.formValues.keyword);
  }

  filterByLetter(e) {
    e.preventDefault();
    this.resetFormValues();
    let letter = e.target.innerText.toLowerCase();
    this.filterService.filterByInitial(letter);
  }

  glossar() {
    let glossary = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var letters = [];
    glossary.forEach(element => {
      element = (
        <li>
          <a href="#" onClick={e => this.filterByLetter(e)}>
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
        <form id="form" class="gardb-search-filter" onSubmit={e => this.submitSearch(e)}>
          <div class="border p-3">
            <h4 class="mb-3">Datensatz finden</h4>
            <div class="row align-items-end">
              {Object.keys(this.formValues).map(key => this.renderFormFields(key))}
              <div class="form-group submit col pt-3 pt-lg-0">
                <button type="submit" class="btn btn-primary submit-all">
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
