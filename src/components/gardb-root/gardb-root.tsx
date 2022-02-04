import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gardb-root',
  styleUrl: 'gardb-root.css',
  shadow: true,
})
export class GardbRoot {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
