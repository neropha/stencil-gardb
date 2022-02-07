import { Component, Host, h, State, Listen } from "@stencil/core";
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
    return this.gardbService.garDBStore.subscribe(result => {
      this.results = result;
      this.total = result.length;
      this.pages = Math.ceil(this.total / this.itemsPerPage);
      this.page();
    });
  }

  // @Event() gardenerSelected: EventEmitter<Gardener>;

  selectGardener(e, gardener: Gardener) {
    // this.gardenerSelected.emit(gardener);
    this.gardbService.gardener.next(gardener);
    window.location.hash = "/" + gardener.ID;
    this.appendDetails(e.target.closest("tr"));
  }

  removeOpenDetails(rows) {
    for (var i = rows.length - 1; i >= 0; i--) {
      rows[i].remove();
    }
  }

  /**
   *
   * TODO find more elegant way to do this
   *
   * @param {Node} row
   * @memberof Results
   */
  appendDetails(row) {
    let openClass = "open";
    let siblings = row.parentNode.getElementsByClassName("open");
    this.removeOpenDetails(siblings);

    if (!row.nextSibling || !row.nextSibling.classList.contains(openClass)) {
      let el = document.createElement("gardb-detail");
      let newRow = row.closest("table").insertRow(row.rowIndex + 1);
      newRow.classList.add(openClass);
      let newCol = newRow.insertCell(0);
      newCol.setAttribute("colspan", "6");
      newCol.classList.add("p-0");
      newCol.appendChild(el);
      newCol.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
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
            <table class="table table-responsive-md border-bottom">
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
                  <tr onClick={e => this.selectGardener(e, gardener)}>
                    {/* <td class="id">{gardener.ID}</td> */}
                    <td class="person">
                      <div class="table__link">{gardener.Person}</div>
                    </td>
                    <td class="content">{gardener.Inhalt}</td>
                    <td class="type">{gardener.Dokumententyp}</td>
                    <td class="year">{gardener.Jahr}</td>
                    <td class="author">{gardener.Autor}</td>
                    <td class="details p-0">
                      <div class="table__button" title="Details" innerHTML={arrow}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <gardb-pagination current-page={this.currentPage} pages={this.pages}></gardb-pagination>
        </Host>
      );
  }
}
