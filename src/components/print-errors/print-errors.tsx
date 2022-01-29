import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'print-errors',
  styleUrl: 'print-errors.scss',
  shadow: false,
})
export class PrintErrors {
  @Prop() errors: any;

  componentWillRender() {
  }

  render() {
    if (this.errors.length) {
      return (
        <Host>
          {this.errors}
        </Host>
      );
    }
  }

}
