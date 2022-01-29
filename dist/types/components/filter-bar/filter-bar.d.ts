import { EventEmitter } from "../../stencil-public-runtime";
export declare class FilterBar {
    host: HTMLElement;
    results: any;
    filteredResults: any;
    formValues: {
        person: string;
        year: string;
        keyword: string;
    };
    componentWillLoad(): void;
    handleFormInput(event: any): void;
    recordSelected: EventEmitter<CustomEvent>;
    recordSelectedHandler(record: CustomEvent<number>): void;
    filterEvent: EventEmitter<any>;
    watchStateHandler(newValue: any): void;
    private filterByPerson;
    private filterByYear;
    private filterByKeyword;
    private filterByInitial;
    submitSearch(e: any): void;
    resetSearch(e: any): void;
    filterLetter(e: any): void;
    glossar(): any[];
    render(): any;
}
