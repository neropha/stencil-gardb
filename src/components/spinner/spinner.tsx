import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "loading-spinner",
  styleUrl: "spinner.scss",
  shadow: false,
})
export class Spinner {
  render() {
    return (
      <Host>
        <div class="d-flex justify-content-lg-center py-3">
          <i class="fa fa-circle-o-notch fa-pulse fa-2x"></i>
          <span class="px-3">Loading...</span>
        </div>
      </Host>
    );
  }
}
