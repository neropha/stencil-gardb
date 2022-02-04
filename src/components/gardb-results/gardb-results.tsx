import { Component, Host, h, State, Watch, Listen } from "@stencil/core";
import { Event, EventEmitter } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { Gardener } from "../../utils/interfaces";
import { MessageService } from "../../services/message.service";

@Component({
  tag: "gardb-results",
  styleUrl: "gardb-results.scss",
  shadow: false,
})
export class Results {
  public gardbService: GardbService;
  public messageService: MessageService;
  @State() public results: any;
  @State() public currentPage: number = 1;
  @State() public pages: number;
  public itemsPerPage: number = 50;
  public total: any;

  constructor() {
    this.gardbService = GardbService.Instance;
    this.messageService = MessageService.Instance;
  }

  async getGardeners() {
    let test = await this.gardbService.getGardeners()
    console.log("then: ", test);
    this.results = test;
  }

  componentWillLoad() {
    this.getGardeners();
    this.total = this.results.length;
    this.pages = Math.ceil(this.total / this.itemsPerPage);
  }

  @Watch("results")
  watchHandler(newValue: boolean, oldValue: boolean) {
    this.messageService.add("Results: Change detected");
    if (newValue != oldValue) {
      this.currentPage = 1;
    }
  }

  firstItemShown() {
    return this.itemsPerPage * this.currentPage - this.itemsPerPage;
  }

  lastItemShown() {
    let lastCount = this.itemsPerPage * this.currentPage;
    let last: number;

    if (lastCount > this.total) {
      last = this.total;
    } else {
      last = lastCount;
    }
    return last;
  }

  pagedResult() {
    return this.results.slice(this.firstItemShown(), this.lastItemShown());
  }

  @Event() recordSelected: EventEmitter<Gardener>;
  selectRecord(record: Gardener) {
    console.log("emit from results", record);
    this.recordSelected.emit();
  }

  // @Listen("recordSelected")
  // recordSelectedHandler() {
  //   if (!record) {
  //     // this.recordSelected = null;
  //     window.location.hash = "#results";
  //     this.pagedResult();
  //   } else {
  //     window.location.hash = "#id" + record.ID;
  //     // this.selectedRecord = this.filteredResults.filter(element => element.ID == 5).shift();
  //   }
  // }

  @Listen("pageSelected")
  changePageHandler(event: CustomEvent<any>) {
    this.currentPage = event.detail;
    this.pagedResult();
  }

  @Listen("hashchange", { target: "window" })
  handleHashChange() {
    if (window.location.hash == "#results") {
      // Hide Detail and Show Results
    }
    if (window.location.hash == "#id5") {
      // this.selectedRecord = this.filteredResults.filter(element => element.ID == 5).shift();
    }
  }

  public resultInfo() {
    return (
      <div class="py-3 py-md-4 px-3 small">
        {"Zeige "}
        {this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"}
      </div>
    );
  }

  async render() {
    return (
      <Host>
        Results
        {this.resultInfo()}
        <div class="table-wrapper">
          <div class="table-responsive table-responsive-md">
            <table class="table stacktable border-bottom">
              <thead>
                <tr>
                  {/* <th class="id">ID</th> */}
                  <th class="person">Person</th>
                  <th class="content">Inhalt</th>
                  <th class="type">Dokumententyp</th>
                  <th class="year">Jahr</th>
                  <th class="author">Autor</th>
                  <th class="details">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {this.pagedResult().map(gardener => (
                  <tr>
                    {/* <td class="id">{gardener.ID}</td> */}
                    <td>
                      <a href={"#id" + gardener.ID} onClick={() => this.selectRecord(gardener)}>
                        {gardener.Person}
                      </a>
                    </td>
                    <td>{gardener.Inhalt}</td>
                    <td>{gardener.Dokumententyp}</td>
                    <td>{gardener.Jahr}</td>
                    <td>{gardener.Autor}</td>
                    <td>
                      <a class="link" title="Details" href={"#id" + gardener.ID} onClick={() => this.selectRecord(gardener)}>
                        <i class="fa fa-info-circle fa-lg"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <gardb-pagination current-page={this.currentPage} pages={this.pages}></gardb-pagination>
      </Host>
    );
  }
}
