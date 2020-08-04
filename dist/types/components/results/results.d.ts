import { EventEmitter } from '../../stencil.core';
export declare class Results {
    results: any;
    selectedRecord: true;
    page: number;
    pages: number;
    currentRecord: any;
    itemsPerPage: number;
    total: any;
    componentWillRender(): void;
    watchHandler(newValue: boolean, oldValue: boolean): void;
    firstItemShown(): number;
    lastItemShown(): number;
    pagedResult(): any;
    recordSelectedHandler(e: any, record: any): void;
    recordSelected: EventEmitter<any>;
    changePageHandler(event: CustomEvent<any>): void;
    resultInfo(): any;
    render(): any;
}
