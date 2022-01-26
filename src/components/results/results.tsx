import { Component, Host, h, Prop, State, Watch, Listen } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'gardener-results',
  styleUrl: 'results.scss',
  shadow: false
})
export class Results {
  @Prop() public results: any;

  @State() public currentPage: number = 1;
  @State() selectedRecord: true;
  @State() public pages: number;
  @State() public currentRecord: any;

  public itemsPerPage: number = 50;
  public total: any;

  componentWillRender() {
    this.total = this.results.length;
    this.pages = Math.ceil(this.total / this.itemsPerPage);
  }

  @Watch('results')
  watchHandler(newValue: boolean, oldValue: boolean) {
    if (newValue != oldValue) {
      this.currentPage = 1
    }
  }

  firstItemShown() {
    return (this.itemsPerPage * this.currentPage) - this.itemsPerPage
  }

  lastItemShown() {
    let lastCount = this.itemsPerPage * this.currentPage;
    let last: number;

    if (lastCount > this.total) {
      last = this.total
    } else {
      last = lastCount;
    }
    return last;
  }

  pagedResult() {
    return this.results.slice(this.firstItemShown(), this.lastItemShown());
  }

  recordSelectedHandler(e, record) {
    e.preventDefault();
    this.recordSelected.emit(record);
    window.location.hash='id' + record.ID;
  }

  @Event({
    eventName: 'recordSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) recordSelected: EventEmitter<any>;


  @Listen('pageSelected')
  changePageHandler(event: CustomEvent<any>) {
    // console.log('Received the custom pageSelected event: ', event.detail);
    this.selectedRecord = event.detail;
    this.currentPage = event.detail;
    this.pagedResult();
  }

  public resultInfo() {
    return (
      <div class="py-3 py-md-4 small">
        {'Zeige '}
        {(this.total > 0)
          ? (this.firstItemShown() + 1) + '–' + this.lastItemShown() + ' von ' + this.total + ' Ergebnissen'
          : this.firstItemShown() + ' Ergebnisse'
        }
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div id="results">
          {this.resultInfo()}
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
              {this.pagedResult().map((gardener) =>
                <tr>
                  {/* <td class="id">{gardener.ID}</td> */}
                  <td>{gardener.Person}</td>
                  <td>{gardener.Inhalt}</td>
                  <td>{gardener.Dokumententyp}</td>
                  <td>{gardener.Jahr}</td>
                  <td>{gardener.Autor}</td>
                  <td><a class="link" title="Details" href="#" onClick={(e) => this.recordSelectedHandler(e, gardener)}><i class="fa fa-info-circle fa-lg"></i></a></td>
                </tr>
              )}
            </tbody>
          </table>
          <results-pagination current-page={this.currentPage} pages={this.pages}></results-pagination>
        </div>
      </Host>
    )
  }
}


