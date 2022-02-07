import { Component, State, Host, h } from "@stencil/core";
import { MessageService } from "../../services/message.service";

@Component({
  tag: "app-messages",
  styleUrl: "app-messages.scss",
  shadow: false,
})
export class AppMessages {
  private messageService: MessageService;
  @State() messages: string[];

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
    return (
      <Host class="p-3 text-dark mb-3">
        <strong>Messages: </strong>
        {this.messages ? (
          <button class="btn btn-dark btn-sm" onClick={() => this.messageService.clear()}>
            clear
          </button>
        ) : null}
        {this.messages ? this.messages.map(message => <div>- {message}</div>) : null}
      </Host>
    );
  }
}
