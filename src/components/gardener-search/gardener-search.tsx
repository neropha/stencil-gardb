import { Component, Host, State, h, Prop, Listen } from "@stencil/core";

@Component({
  tag: "gardener-search",
  styleUrl: "gardener-search.scss",
  shadow: false,
})
export class MyComponent {
  @State() selectedRecord: true;
  @State() errors = [];
  @State() results: any;
  @State() filteredResults: any;

  @Prop() public api: string;

  public loading = true;

  async loadData() {
    try {
      let response = await fetch(this.api, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // Prepare for catch(err)
        throw new Error(response.status + ": " + response.statusText);
      }
      this.results = this.filteredResults = await response.json();
    } catch (err) {
      this.errors.push(err.message);
      this.errors.push("Datenbank konnte nicht geladen werden.");
    } finally {
      this.loading = false;
    }
  }
  componentWillLoad() {
    if (!this.api) {
      this.errors.push("Datenbank nicht definiert.");
    } else {
      this.loadData();
    }
  }

  @Listen("filterEvent")
  filterResultHandler(event: CustomEvent<any>) {
    this.filteredResults = event.detail;
  }

  @Listen("recordSelected")
  recordSelectedHandler(record: CustomEvent<number>) {
    if (record.detail) {
      this.selectedRecord = this.filteredResults.filter(element => (element.ID == record.detail)).shift();
      window.location.hash = "id" + record.detail;
    } else {
      // window.location.hash = "results";
      this.selectedRecord = null;
    }
  }

  public return_errors(errors) {
    return (
      <Host>
        <h5>Fehler</h5>
        {errors.map(error => (
          <div>{error}</div>
        ))}
      </Host>
    );
  }

  render() {
    if (this.errors.length) {
      return this.return_errors(this.errors);
    }
    else if (this.loading) {
      return (
        <Host>
          <loading-spinner></loading-spinner>
        </Host>
      );
    }
    if (this.selectedRecord) {
      return (
        <Host>
          <filter-bar results={this.results}></filter-bar>
          <gardener-detail record={this.selectedRecord}></gardener-detail>
        </Host>
      );
    } else {
      return (
        <Host>
          <filter-bar results={this.results}></filter-bar>
          <gardener-results results={this.filteredResults}></gardener-results>
        </Host>
      );
    }
  }
}
