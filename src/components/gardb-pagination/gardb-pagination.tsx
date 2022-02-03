import { Component, Host, h, Prop } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';


@Component({
  tag: 'gardb-pagination',
  styleUrl: 'gardb-pagination.scss',
  shadow: false
})
export class Pagination {

  @Prop() currentPage: number;
  @Prop() pages: number;

  pageSelectedHandler(e, record) {
    e.preventDefault();
    this.pageSelected.emit(record);
  }

  @Event({
    eventName: 'pageSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) pageSelected: EventEmitter<any>;

  changePage(page) {
    this.currentPage = page;
    this.pageSelected.emit(page);
  }

  pagination() {
    let pages = [];
    let loop_start = this.currentPage - 3;
    let loop_end = this.currentPage + 3;

    // Correct start and end if negative
    if (loop_start < 0) {
      loop_end += Math.abs(loop_start);
      loop_start = 1;
    }
    if (this.pages > 1) {
      // First Page
      pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(1)}>&laquo;</a></li>)
      // Previous Page
      if (this.currentPage > 1) {
        pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(this.currentPage - 1)}>&lsaquo;</a></li>)
        // Previous Page Disabled
      } else {
        pages.push(<li class="page-item disabled"><span class="page-link">&lsaquo;</span></li>)
      }
      // Loop Pages
      for (let i = 1; i <= this.pages; i++) {
        // Active Page
        if (i === this.currentPage) {
          pages.push(<li class="page-item active"><span class="page-link" tabindex="1 ">{i}</span></li>)
        }
        // Default Page
        else if (i >= loop_start && i <= loop_end) {
          pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(i)}>{i}</a></li>);
        }
      }
      // Next Page
      if (this.currentPage < this.pages) {
        pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(this.currentPage + 1)}>&rsaquo;</a></li>)
      }
      else {
        pages.push(<li class="page-item disabled"><span class="page-link">&rsaquo;</span></li>)
      }
      // Last Page
      pages.push(<li class="page-item"><a class="page-link" href="#results" onClick={() => this.changePage(this.pages)}>&raquo;</a></li>)

    }
    return pages;
  }

  render() {
    return (
      <Host>
        <nav aria-label="Navigate results">
          <ul class="pagination justify-content-center">
            {this.pagination()}
          </ul>
        </nav>
      </Host>
    )
  }
}
