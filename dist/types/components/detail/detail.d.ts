import { EventEmitter } from "../../stencil-public-runtime";
export declare class Detail {
    record: any;
    cleanRecord: Array<object>;
    private element;
    handleScroll(ev: any): void;
    recordSelected: EventEmitter<CustomEvent>;
    recordSelectedHandler(record: CustomEvent<number>): void;
    hideColumns: string[];
    componentWillLoad(): void;
    componentDidLoad(): void;
    closeDetail: (e: any) => void;
    render(): any;
}
