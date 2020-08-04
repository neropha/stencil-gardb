export declare class MyComponent {
    filteredResult: any;
    selectedRecord: true;
    errors: any[];
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
    filterResults(e: any): void;
    filterReset(e: any): void;
    filterLetter(e: any): void;
    glossar(): any[];
    todoCompletedHandler(event: CustomEvent<any>): void;
    return_errors(): any;
    return_record(): any;
    render(): any;
}
