import { EventEmitter } from '../../stencil.core';
export declare class Detail {
    record: any;
    cleanRecord: Array<object>;
    hideColumns: string[];
    componentDidLoad(): void;
    recordSelected: EventEmitter<any>;
    closeDetail: (e: any) => void;
    render(): any;
}
