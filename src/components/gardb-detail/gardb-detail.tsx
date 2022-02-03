import { Component, Host, h, Prop, State, Element } from "@stencil/core";
import { Event, EventEmitter, Listen } from "@stencil/core";

@Component({
  tag: "gardb-detail",
  styleUrl: "gardb-detail.scss",
  shadow: false,
})
export class Detail {
  @Prop() public record: any;
  @State() cleanRecord: Array<object> = [];
  @Element() private element: HTMLElement;

  @Listen("hashchange", { target: "window" })
  handleScroll(ev) {
    if (window.location.hash == "#results") {
      this.closeDetail(ev);
    }
  }

  @Event() recordSelected: EventEmitter<CustomEvent>;
  recordSelectedHandler(record: CustomEvent<number>) {
    this.recordSelected.emit(record);
  }

  public hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];

  componentWillLoad() {
    for (const [key, value] of Object.entries(this.record)) {
      if (!this.hideColumns.includes(key)) {
        this.cleanRecord = { ...this.cleanRecord, [key]: value };
      }
    }
  }
  componentDidLoad() {
    this.element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }

  public closeDetail = function (e) {
    e.preventDefault();
    this.recordSelected.emit(null);
  };

  render() {
    if (this.cleanRecord) {
      return (
        <Host id={"id" + this.record.ID} class="mt-5">
          <button type="button" class="close btn-sm mt-3 mr-3" aria-label="Close" onClick={e => this.closeDetail(e)}>
            Zurück <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
          </button>
          <div class="border p-3 mt-3">
            <h2 class="mb-3 mb-md-4">{this.record.Person}</h2>
            <table class="table border-bottom stacktable">
              {Object.keys(this.cleanRecord).map(key => (
                <tr>
                  <td class="label">
                    <strong>{key}</strong>
                  </td>
                  <td>{this.cleanRecord[key]}</td>
                </tr>
              ))}
            </table>
          </div>
        </Host>
      );
    }
  }
}
