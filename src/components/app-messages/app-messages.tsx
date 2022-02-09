import { Component, State, Host, h } from "@stencil/core";
import { MessageService } from "../../services/message.service";

@Component({
  tag: "app-messages",
  styleUrl: "app-messages.scss",
  shadow: false,
})
export class AppMessages {
  private messageService: MessageService;
  @State() messages: string[] = [];

  constructor() {
    this.messageService = MessageService.Instance;
  }

  componentWillLoad() {
    this.getMessages();
  }

  getMessages(): void {
    this.messageService.getMessages().subscribe(messages => {
      this.messages = [];
      this.messages = messages;
    });
  }

  render() {
    if (this.messages.length)
      return (
        <Host class="p-3 text-dark mb-3">
          {this.messages ? this.messages.map(message => <div>- {message}</div>) : null}
          <div class="d-flex justify-content-end">
            <button class="btn btn-outline-dark btn-sm" onClick={() => this.messageService.clear()}>
              clear
            </button>
          </div>
        </Host>
      );
  }
}
