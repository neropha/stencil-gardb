import { Component, Host, State, h, Prop } from "@stencil/core";
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
  @Prop() api: string;
  // Debug property enables to show all messages from message.service, not just errors
  @Prop({
    mutable: true,
  })
  debug: boolean = false;

  public results: any;
  @State() loading: boolean = true;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
    this.messageService.debugMode.next(this.debug);
  }

  getGardeners() {
    return this.gardbService.getAllGardeners(this.api).then(() => {
      this.loading = false;
    });
  }

  componentWillLoad() {
    this.loading = true;
    this.getGardeners();
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
          <gardb-results></gardb-results>
        </main>
      </Host>
    );
  }
}
