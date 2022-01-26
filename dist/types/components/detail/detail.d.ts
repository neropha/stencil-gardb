import { EventEmitter } from "../../stencil-public-runtime";
export declare class Detail {
    record: any;
    cleanRecord: Array<object>;
    handleScroll(ev: any): void;
    hideColumns: string[];
    componentWillLoad(): void;
    componentDidLoad(): void;
    recordSelected: EventEmitter<any>;
    closeDetail: (e: any) => void;
    render(): any;
}
