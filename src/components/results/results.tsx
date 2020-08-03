import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'gardener-results',
  styleUrl: 'results.scss',
  shadow: false
})
export class Results {
  @Prop() public results: any;

  @State() selectedRecord: true;
  @State() public page: number = 1;
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
      this.page = 1
    }
  }

  firstItemShown() {
    return (this.itemsPerPage * this.page) - this.itemsPerPage
  }

  lastItemShown() {
    let lastCount = this.itemsPerPage * this.page;
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

  pagination() {
    let pages = [];
    if (this.pages > 1) {
      for (let i = 1; i <= this.pages; i++) {
        if (i === this.page) {
          pages.push(<li class="page-item active"><a class="page-link">{i}</a></li>)
        } else {
          pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(i)}>{i}</a></li>)
        }
      }
    }
    return pages;
  }

  changePage(page) {
    this.page = page;
    this.pagedResult();
  }

  recordSelectedHandler(e, record) {
    e.preventDefault();
    this.recordSelected.emit(record);
  }

  @Event({
    eventName: 'recordSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) recordSelected: EventEmitter<any>;


  render() {
    return (
      <Host>
        <div id="results">
          <div class="py-3 py-md-4 small">
            Zeige {this.firstItemShown()}–{this.lastItemShown()} von {this.total} Ergebnissen
          </div>
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
                  <td><a class="link" href="#" title="Details" onClick={(e) => this.recordSelectedHandler(e, gardener)}><i class="fa fa-info-circle fa-lg"></i></a></td>
                </tr>
              )}
            </tbody>
          </table>
          <nav aria-label="Navigate results">
            <ul class="pagination justify-content-center">
              {this.pagination()}
            </ul>
          </nav>
        </div>
      </Host>
    )
  }
}


