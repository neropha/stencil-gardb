import { Component, Host, h, Prop, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'gardener-detail',
  styleUrl: 'detail.scss',
  shadow: false
})
export class Detail {
  @Prop() public record: any;

  @State() cleanRecord: Array<object> = [];

  public hideColumns = ['location', 'reserve01', 'reserve02', 'sourcefile', 'created', 'updated'];

  componentDidLoad() {
    var top = document.querySelector('main').offsetTop;
    window.scrollTo(0, top);
    for (const [key, value] of Object.entries(this.record)) {
      // console.log(`${key}: ${value}`);
      if (!this.hideColumns.includes(key)) {
        this.cleanRecord = { ...this.cleanRecord, [key]: value }
      }
    }
    console.log(this.cleanRecord);
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
    window.location.hash = 'results';
  }

  render() {
    if (this.cleanRecord) {
      return (
        <Host id={'id' + this.record.ID}>
          <button type="button" class="close btn-sm" aria-label="Close" onClick={(e) => this.closeDetail(e)}>Zurück <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i></button>
          <h4 class="mb-3 mb-md-4">{this.record.Person}</h4>
          <table class="table border-bottom stacktable">
            {Object.keys(this.cleanRecord).map(key => (
              <tr>
                <td class="label">
                  <strong>{key}</strong>
                </td>
                <td>
                  {this.cleanRecord[key]}
                </td>
              </tr>
            ))}
          </table>
        </Host>
      );
    }
  }
}
