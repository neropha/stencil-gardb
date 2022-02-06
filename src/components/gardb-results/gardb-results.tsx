import { Component, Host, h, State, Listen, Prop, Event, EventEmitter } from "@stencil/core";
import { GardbService } from "../../services/gardb.service";
import { Gardener } from "../../utils/interfaces";
import { MessageService } from "../../services/message.service";
import arrow from "./arrow-right.svg";

@Component({
  tag: "gardb-results",
  styleUrl: "gardb-results.scss",
  shadow: false,
})
export class Results {
  public gardbService: GardbService;
  public messageService: MessageService;
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

  componentWillLoad() {
    this.getGardeners();
  }

  getGardeners() {
    // returns promise to componentWillLoad
    // componentWillLoad() is able to have its parent component wait on it to finish loading its data.
    return this.gardbService.garDB.subscribe(promise => {
      this.results = promise;
      this.total = promise.length;
      this.pages = Math.ceil(this.total / this.itemsPerPage);
      this.page();
    });
  }

  @Event() gardenerSelected: EventEmitter<Gardener>;

  selectGardener(gardener: Gardener) {
    this.gardbService.gardener.next(gardener);
    window.location.hash = "/" + gardener.ID;
    this.gardenerSelected.emit(gardener);
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

  @Listen("pageSelected")
  changePageHandler(event: CustomEvent<number>) {
    this.currentPage = event.detail;
    this.page();
  }

  public resultInfo() {
    return (
      <div class="py-3 py-md-4 px-3 small">
        {"Zeige "}
        {this.total > 0 ? this.firstItemShown() + 1 + "–" + this.lastItemShown() + " von " + this.total + " Ergebnissen" : this.firstItemShown() + " Ergebnisse"}
      </div>
    );
  }

  render() {
    if (this.pagedResults)
      return (
        <Host>
          {this.resultInfo()}
          <div class="table-wrapper">
            <div class="table-responsive table-responsive-md">
              <table class="table border-bottom">
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
                  {this.pagedResults.map(gardener => (
                    <tr>
                      {/* <td class="id">{gardener.ID}</td> */}
                      <td>
                        <div class="table__link" onClick={() => this.selectGardener(gardener)}>
                          {gardener.Person}
                        </div>
                      </td>
                      <td>{gardener.Inhalt}</td>
                      <td>{gardener.Dokumententyp}</td>
                      <td>{gardener.Jahr}</td>
                      <td>{gardener.Autor}</td>
                      <td class="details p-0">
                        <div class="table__button" title="Details" onClick={() => this.selectGardener(gardener)} innerHTML={arrow}></div>
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
