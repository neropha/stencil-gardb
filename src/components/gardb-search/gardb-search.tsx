import { Component, Host, State, h, Prop, Listen } from "@stencil/core";
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
      this.gardbService.getGardeners(this.api).then(() => {
        this.loading = false;
      });
    } else {
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
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route component="gardb-results" exact={false}></stencil-route>
              <stencil-route url="/detail" component="gardb-detail"></stencil-route>
            </stencil-route-switch>
          </stencil-router>
        </main>
      </Host>
    );
  }
}
