import { Component, Host, h, Prop } from "@stencil/core";
import loader from "./three-dots.svg";

@Component({
  tag: "app-loading",
  styleUrl: "app-loading.scss",
  shadow: false,
})
export class Spinner {
  @Prop({
    mutable: true,
  })
  public visible: boolean;

  render() {
    if (this.visible) {
      return (
        <Host>
          <div class="d-flex justify-content-center py-3">
            <span class="loader" innerHTML={loader}></span>
          </div>
        </Host>
      );
    }
  }
}
