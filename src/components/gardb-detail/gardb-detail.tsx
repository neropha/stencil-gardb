import { Component, Host, h, State, Element } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { MessageService } from "../../services/message.service";
import { Gardener } from "../../utils/interfaces";

@Component({
  tag: "gardb-detail",
  styleUrl: "gardb-detail.scss",
  shadow: false,
})
export class Detail {
  public gardbService: GardbService;
  public messageService: MessageService;
  @Element() private element: HTMLElement;
  @State() gardener: Gardener;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  getGardener() {
    return this.gardbService.gardener.subscribe(data => {
      this.gardener = this.cleanResult(data);
    });
  }

  cleanResult(gardener: Gardener) {
    let hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
    let output: Gardener;
    for (const [key, value] of Object.entries(gardener)) {
      if (!hideColumns.includes(key)) {
        output = { ...output, [key]: value };
      }
    }
    return output;
  }

  componentWillLoad() {
    this.getGardener();
  }

  close() {
    this.element.closest("tr.open").remove();
  }

  detailRow(key) {
    if (this.gardener[key] != "") {
      return (
        <div class="row pb-1">
          <div class="label col-xs-12 col-sm-2">
            <strong>{key}</strong>
          </div>
          <div class="col">{this.gardener[key]}</div>
        </div>
      );
    }
  }

  render() {
    return (
      <Host class="detail">
        <button type="button" class="detail__button close btn-sm mt-3 mr-3" aria-label="Close" onClick={() => this.close()}>
          Schließen <i class="fa fa-times-circle fa-lg" aria-hidden="true"></i>
        </button>
        <div class="detail__wrapper px-4 pt-3 pb-4">
          <h3 class="mb-2 mb-md-4">{this.gardener.Person}</h3>
          {Object.keys(this.gardener).map(key => this.detailRow(key))}
        </div>
      </Host>
    );
  }
}
