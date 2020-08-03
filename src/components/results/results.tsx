import { Component, Host, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'gardener-results',
  styleUrl: 'results.scss',
  shadow: false
})
export class Results {
  @Prop() public results: any;

  @State() public page: number = 1;
  @State() public pages: number;

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
    for (let i = 1; i <= this.pages; i++) {
      if (i === this.page) {
        pages.push(<li class="page-item active"><a class="page-link">{i}</a></li>)
      } else {
        pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(i)}>{i}</a></li>)
      }
    }
    return pages;
  }

  changePage(page) {
    this.page = page;
    this.pagedResult();
  }

  render() {
    return (
      <Host>
        <div id="results">
          <div class="py-3 py-md-4">
            Zeige {this.firstItemShown()}–{this.lastItemShown()} von {this.total} Ergebnissen
          </div>

          <table class="table stacktable">
            <thead>
              <tr>
                {/* <th class="id">ID</th> */}
                <th>Person</th>
                <th>Inhalt</th>
                <th>Dokumententyp</th>
                <th>Jahr</th>
                <th>Autor</th>
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
                  <td><a class="link" href="#" title="Detailsansicht"><i class="fa fa-info-circle fa-2x"></i></a></td>
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
    );
  }

}
