import { Component, Host, h, State, Element, Method, Prop, Event, EventEmitter } from "@stencil/core";
// import { GardbService } from "../../services/gardb.service";
import { Gardener } from "../../utils/interfaces";


@Component({
  tag: "gardb-detail",
  styleUrl: "gardb-detail.scss",
  shadow: false,
})
export class Detail {
  @Prop() record: Gardener;
  @State() cleanedRecord: Gardener = null;
  @Element() private element: HTMLElement;
  @Event() recordSelected: EventEmitter<Gardener>;

  @Method()
  async close() {
    this.element.classList.remove("is-open");
    // GardbService.setSelectedRecord(null);
    this.recordSelected.emit(null);
  }

  componentWillLoad() {
    let hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
    for (const [key, value] of Object.entries(this.record)) {
      if (!hideColumns.includes(key)) {
        this.cleanedRecord = { ...this.cleanedRecord, [key]: value };
      }
    }
  }
  componentDidLoad() {
    this.element.classList.add("is-open");
    this.element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  render() {
    if (this.cleanedRecord) {
      return (
        <Host class="mt-5">
          <button type="button" class="close btn-sm mt-3 mr-3" aria-label="Close" onClick={() => this.close()}>
            Zurück <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
          </button>
          <div class="border p-3 mt-3">
            <h2 class="mb-3 mb-md-4">{this.record.Person}</h2>
            <table class="table border-bottom">
              {Object.keys(this.cleanedRecord).map(key => (
                <tr>
                  <td class="label">
                    <strong>{key}</strong>
                  </td>
                  <td>{this.cleanedRecord[key]}</td>
                </tr>
              ))}
            </table>
          </div>
        </Host>
      );
    } else {
      return <app-loading></app-loading>;
    }
  }
}
