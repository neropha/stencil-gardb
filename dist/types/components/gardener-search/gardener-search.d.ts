export declare class MyComponent {
    selectedRecord: true;
    errors: any[];
    results: any;
    filteredResults: any;
    api: string;
    loading: boolean;
    loadData(): Promise<void>;
    componentWillLoad(): void;
    filterResultHandler(event: CustomEvent<any>): void;
    recordSelectedHandler(record: CustomEvent<number>): void;
    return_errors(errors: any): any;
    render(): any;
}
