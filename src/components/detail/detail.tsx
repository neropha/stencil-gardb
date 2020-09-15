import { Component, Host, h, Prop } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'gardener-detail',
  styleUrl: 'detail.scss',
  shadow: false
})
export class Detail {
  @Prop() public record: any;

  componentDidLoad() {
    var top = document.querySelector('main').offsetTop; 
    window.scrollTo(0, top);  
  }

  @Event({
    eventName: 'recordSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) recordSelected: EventEmitter<any>;


  closeDetail = function (e) {
    e.preventDefault();
    this.recordSelected.emit(null);
  }

  render() {
    if (this.record) {
      return (
        <Host id="detail">
          <button type="button" class="close btn-sm" aria-label="Close" onClick={(e) => this.closeDetail(e)}>Zurück <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i></button>
          <h4 class="mb-3 mb-md-4">{this.record.Person}</h4>
          <table class="table border-bottom stacktable">
            {Object.keys(this.record).map(key => (
              <tr>
                <td class="label">
                  <strong>{key}</strong>
                </td>
                <td>
                  {this.record[key]}
                </td>
              </tr>
            ))}
          </table>
        </Host>
      );
    }
  }
}
