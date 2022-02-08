import { Component, Host, h, State, Listen } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { Gardener } from "../../utils/interfaces";
import { MessageService } from "../../services/message.service";
// import arrow from "./arrow-right.svg";
import { GardenerDetail, GardenerRow } from "./gardener";

@Component({
  tag: "gardb-results",
  styleUrl: "gardb-results.scss",
  shadow: false,
})
export class Results {
  public gardbService: GardbService;
  public messageService: MessageService;
  @State() openGardener: number;
  @State() results: any;
  @State() pagedResults: any;
  @State() currentPage: number = 1;
  @State() pages: number;
  public itemsPerPage: number = 40;
  public total: any;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  getGardeners() {
    // returns promise to componentWillLoad
    // componentWillLoad() is able to have its parent component wait on it to finish loading its data.
    return this.gardbService.garDBStore.subscribe(result => {
      this.results = result;
      this.total = result.length;
      this.currentPage = 1;
      this.pages = Math.ceil(this.total / this.itemsPerPage);
      this.page();
    });
  }

  componentWillLoad() {
    this.getGardeners();
  }

  // @Event() gardenerSelected: EventEmitter<Gardener>;
  selectGardener(id: number) {
    if (id === this.openGardener) {
      this.openGardener = -1;
    } else {
      this.openGardener = id;
    }
  }

  cleanGardener(gardener: Gardener) {
    let hideColumns = ["location", "reserve01", "reserve02", "sourcefile", "created", "updated"];
    let output: Gardener;
    for (const [key, value] of Object.entries(gardener)) {
      if (!hideColumns.includes(key) && gardener[key] != "") {
        output = { ...output, [key]: value };
      }
    }
    return output;
  }

  firstItemShown() {
    return this.itemsPerPage * this.currentPage - this.itemsPerPage;
  }

  lastItemShown() {
    let lastCount = this.itemsPerPage * this.currentPage;
    return lastCount > this.total ? this.total : lastCount;
  }

  page() {
    this.pagedResults = this.results.slice(this.firstItemShown(), this.lastItemShown());
  }

  /**
   * @description Listens for pageSelected event from pagination
   *
   * @param {CustomEvent<any>} event
   * @memberof Results
   */
  @Listen("pageSelected")
  changePageHandler(event: CustomEvent<any>) {
    this.currentPage = event.detail;
    this.page();
  }

  public renderResultInfo() {
    return [
      <div class="py-3 py-md-4 px-3 small">
        {"Zeige "}
        {this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"}
      </div>,
    ];
  }

  public renderRow(gardener: Gardener) {
    return <GardenerRow gardener={gardener} onClick={() => this.selectGardener(gardener.ID)}></GardenerRow>;
  }

  public renderDetail(gardener: Gardener) {
    if (this.openGardener == gardener.ID) return <GardenerDetail gardener={this.cleanGardener(gardener)}></GardenerDetail>;
  }

  render() {
    if (this.pagedResults)
      return (
        <Host>
          {this.renderResultInfo()}
          <div class="table-wrapper">
            <table class="table table-responsive-md border-bottom">
              <thead>
                <tr>
                  <th class="person">Person</th>
                  <th class="content">Inhalt</th>
                  <th class="type">Dokumententyp</th>
                  <th class="year">Jahr</th>
                  <th class="author">Autor</th>
                  <th class="details">&nbsp;</th>
                </tr>
              </thead>
              <tbody>{this.pagedResults.map(gardener => [this.renderRow(gardener), this.renderDetail(gardener)])}</tbody>
            </table>
          </div>
          <gardb-pagination current-page={this.currentPage} pages={this.pages}></gardb-pagination>
        </Host>
      );
  }
}
