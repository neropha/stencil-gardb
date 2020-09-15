export declare class MyComponent {
    filteredResult: any;
    selectedRecord: true;
    errors: any[];
    formValues: {
        year: string;
        keyword: string;
        person: string;
    };
    host: HTMLElement;
    api: string;
    inputs: any;
    gardb: any;
    loading: boolean;
    loadData(): Promise<void>;
    componentWillLoad(): void;
    private filterByPerson;
    private filterByYear;
    private filterByKeyword;
    private filterByInitial;
    submitSearch(e: any): void;
    resetSearch(e: any): void;
    filterLetter(e: any): void;
    glossar(): any[];
    recordSelectedHandler(event: CustomEvent<any>): void;
    return_errors(): any;
    return_record(): any;
    render(): any;
}
