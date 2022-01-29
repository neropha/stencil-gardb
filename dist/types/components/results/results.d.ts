import { EventEmitter } from "../../stencil-public-runtime";
export declare class Results {
    results: any;
    currentPage: number;
    selectedRecord: null;
    pages: number;
    currentRecord: any;
    itemsPerPage: number;
    total: any;
    componentWillRender(): void;
    watchHandler(newValue: boolean, oldValue: boolean): void;
    firstItemShown(): number;
    lastItemShown(): number;
    pagedResult(): any;
    recordSelected: EventEmitter<CustomEvent>;
    recordSelectedHandler(record: CustomEvent<number>): void;
    changePageHandler(event: CustomEvent<any>): void;
    resultInfo(): any;
    render(): any;
}
