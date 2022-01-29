import { r as registerInstance, f as createEvent, h, e as Host } from './index-e1351b7d.js';

const paginationCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}results-pagination{display:block}";

const Pagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.pageSelected = createEvent(this, "pageSelected", 7);
    }
    pageSelectedHandler(e, record) {
        e.preventDefault();
        this.pageSelected.emit(record);
    }
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
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(1) }, "\u00AB")));
            // Previous Page
            if (this.currentPage > 1) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage - 1) }, "\u2039")));
                // Previous Page Disabled
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u2039")));
            }
            // Loop Pages
            for (let i = 1; i <= this.pages; i++) {
                // Active Page
                if (i === this.currentPage) {
                    pages.push(h("li", { class: "page-item active" }, h("span", { class: "page-link", tabindex: "1 " }, i)));
                }
                // Default Page
                else if (i >= loop_start && i <= loop_end) {
                    pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(i) }, i)));
                }
            }
            // Next Page
            if (this.currentPage < this.pages) {
                pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.currentPage + 1) }, "\u203A")));
            }
            else {
                pages.push(h("li", { class: "page-item disabled" }, h("span", { class: "page-link" }, "\u203A")));
            }
            // Last Page
            pages.push(h("li", { class: "page-item" }, h("a", { class: "page-link", href: "#results", onClick: () => this.changePage(this.pages) }, "\u00BB")));
        }
        return pages;
    }
    render() {
        return (h(Host, null, h("nav", { "aria-label": "Navigate results" }, h("ul", { class: "pagination justify-content-center" }, this.pagination()))));
    }
};
Pagination.style = paginationCss;

export { Pagination as results_pagination };
