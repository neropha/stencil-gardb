import { Component, Host, State, h, Prop, Listen } from "@stencil/core";
import {} from "@stencil/router";
import { Gardener } from "../../utils/interfaces";
import { GardbService } from "../../services/gardb.service";
import { MessageService } from "../../services/message.service";

@Component({
  tag: "gardb-search",
  styleUrl: "gardb-search.scss",
  shadow: false,
})
export class MyComponent {
  public gardbService: GardbService;
  public messageService: MessageService;
  @Prop() public api: string;
  @State() results: any;
  @State() filteredResults: any;
  @State() public selectedRecord: Gardener;
  @State() public loading: boolean = true;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  componentWillLoad() {
    this.messageService.clear();
    if (this.api !== undefined) {
      this.loading = true;
      this.gardbService.getGardeners(this.api).finally(() => {
        this.loading = false;
      });
    }
  }
  componentDidLoad() {
    if (this.api === undefined) {
      this.messageService.add("api @Prop() not set.");
      this.loading = false;
    }
  }
  @Listen("filterEvent")
  filterResultHandler(event: CustomEvent<any>) {
    this.filteredResults = event.detail;
    // this.selectedRecord = GardbService.getSelectedRecord();
  }

  render() {
    return (
      <Host>
        <header>
          <app-messages></app-messages>
          <app-loading visible={this.loading}></app-loading>
          <gardb-filters results={this.results}></gardb-filters>
        </header>
        <main>
          <stencil-router>
            <stencil-route url="/results" component="gardb-detail"></stencil-route>
            <stencil-route url="/" component="gardb-results" exact={true}></stencil-route>
          </stencil-router>
        </main>
      </Host>
    );

    // if (this.errors.length) {
    //   return this.return_errors(this.errors);
    // } else if (this.loading) {
    //   return <app-loading></app-loading>;
    // } else if (this.selectedRecord) {
    //   return (
    //     <Host>
    //       <app-messages></app-messages>
    //       <gardb-filters results={this.results}></gardb-filters>
    //       <gardb-detail record={this.selectedRecord}></gardb-detail>
    //     </Host>
    //   );
    // } else {
    //   return (
    //     <Host>
    //       <app-messages></app-messages>
    //       <gardb-filters results={this.results}></gardb-filters>
    //       <gardb-results results={this.filteredResults}></gardb-results>
    //     </Host>
    //   );
    // }
  }
}
