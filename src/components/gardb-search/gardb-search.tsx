import { Component, Host, State, h, Prop } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { MessageService } from "../../services/message.service";

@Component({
  tag: "gardb-search",
  styleUrl: "gardb-search.scss",
  shadow: false,
})
export class MyComponent {
  @State() gardbService: GardbService;
  @State() messageService: MessageService;
  @Prop() api: string;
  // Debug property enables to show all messages from message.service, not just errors
  @Prop({
    mutable: true,
  })
  debug: boolean = false;

  public results: any;
  @State() public loading: boolean = true;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
    this.messageService.debugMode.next(this.debug);
  }

  @State() async getGardeners() {
    return this.gardbService.loadData(this.api).then(() => {
      this.loading = false;
    });
  }

  componentWillLoad() {
    this.loading = true;
    this.getGardeners();
  }

  componentDidUpdate() {
    this.messageService.clear();
  }

  render() {
    return (
      <Host>
        <header>
          <app-messages></app-messages>
          <app-loading visible={this.loading}></app-loading>
          <gardb-filters></gardb-filters>
        </header>
        <main>
          <gardb-detail></gardb-detail>
          <gardb-results></gardb-results>
        </main>
      </Host>
    );
  }
}
