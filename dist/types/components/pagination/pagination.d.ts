import { EventEmitter } from '../../stencil-public-runtime';
export declare class Pagination {
    currentPage: number;
    pages: number;
    pageSelectedHandler(e: any, record: any): void;
    pageSelected: EventEmitter<any>;
    changePage(page: any): void;
    pagination(): any[];
    render(): any;
}
