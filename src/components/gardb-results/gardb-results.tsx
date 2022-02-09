import { Component, Host, h, State, Listen } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { Gardener } from "../../utils/interfaces";
import { MessageService } from "../../services/message.service";
import { GardenerDetail, GardenerRow } from "../../models/gardener";
import { DefaultHash } from "../../utils/options";

@Component({
  tag: "gardb-results",
  styleUrl: "gardb-results.scss",
  shadow: false,
})
export class Results {
  public gardbService: GardbService;
  public messageService: MessageService;
  public itemsPerPage: number = 40;
  public total: any;
  @State() openRow!: HTMLElement;
  @State() openGardenerID: number;
  @State() results: any;
  @State() pagedResults: any;
  @State() currentPage: number = 1;
  @State() pages: number;

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

  @Listen("hashchange", { target: "window" })
  handlehashChange(e) {
    let idHash = "#/" + this.openGardenerID;
    if (window.location.hash === idHash && this.openGardenerID > 0) {
      setTimeout(() => {
        this.openRow = document.getElementById(`g${this.openGardenerID}`) as HTMLTableRowElement;
        this.openRow.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        this.messageService.add(`Results: Opened gardener ID ${this.openGardenerID}`);
    }, 300);
    }
  }

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
      this.openGardenerID = -1;
      this.pages = Math.ceil(this.total / this.itemsPerPage);
      this.page();
    });
  }

  componentWillLoad() {
    this.getGardeners();
  }

  // @Event() gardenerSelected: EventEmitter<Gardener>;
  selectGardener(e, id: number) {
    if (id === this.openGardenerID) {
      this.openGardenerID = -1;
      window.location.hash = DefaultHash;
    } else {
      this.openGardenerID = id;
      window.location.hash = DefaultHash + this.openGardenerID;
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

  public renderResultInfo() {
    return [
      <div class="py-3 py-md-4 px-3 small">
        {"Zeige "}
        {this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"}
      </div>,
    ];
  }

  public renderRow(gardener: Gardener) {
    return <GardenerRow gardener={gardener} onClick={(e) => this.selectGardener(e, gardener.ID)}></GardenerRow>;
  }

  public renderDetail(gardener: Gardener) {
    if (this.openGardenerID == gardener.ID) return <GardenerDetail gardener={this.cleanGardener(gardener)}></GardenerDetail>;
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
