/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AppLoading {
        "visible": boolean;
    }
    interface AppMessages {
    }
    interface GardbFilters {
    }
    interface GardbPagination {
        "currentPage": number;
        "pages": number;
    }
    interface GardbResults {
    }
    interface GardbSearch {
        "api": string;
        "debug": boolean;
    }
}
declare global {
    interface HTMLAppLoadingElement extends Components.AppLoading, HTMLStencilElement {
    }
    var HTMLAppLoadingElement: {
        prototype: HTMLAppLoadingElement;
        new (): HTMLAppLoadingElement;
    };
    interface HTMLAppMessagesElement extends Components.AppMessages, HTMLStencilElement {
    }
    var HTMLAppMessagesElement: {
        prototype: HTMLAppMessagesElement;
        new (): HTMLAppMessagesElement;
    };
    interface HTMLGardbFiltersElement extends Components.GardbFilters, HTMLStencilElement {
    }
    var HTMLGardbFiltersElement: {
        prototype: HTMLGardbFiltersElement;
        new (): HTMLGardbFiltersElement;
    };
    interface HTMLGardbPaginationElement extends Components.GardbPagination, HTMLStencilElement {
    }
    var HTMLGardbPaginationElement: {
        prototype: HTMLGardbPaginationElement;
        new (): HTMLGardbPaginationElement;
    };
    interface HTMLGardbResultsElement extends Components.GardbResults, HTMLStencilElement {
    }
    var HTMLGardbResultsElement: {
        prototype: HTMLGardbResultsElement;
        new (): HTMLGardbResultsElement;
    };
    interface HTMLGardbSearchElement extends Components.GardbSearch, HTMLStencilElement {
    }
    var HTMLGardbSearchElement: {
        prototype: HTMLGardbSearchElement;
        new (): HTMLGardbSearchElement;
    };
    interface HTMLElementTagNameMap {
        "app-loading": HTMLAppLoadingElement;
        "app-messages": HTMLAppMessagesElement;
        "gardb-filters": HTMLGardbFiltersElement;
        "gardb-pagination": HTMLGardbPaginationElement;
        "gardb-results": HTMLGardbResultsElement;
        "gardb-search": HTMLGardbSearchElement;
    }
}
declare namespace LocalJSX {
    interface AppLoading {
        "visible"?: boolean;
    }
    interface AppMessages {
    }
    interface GardbFilters {
    }
    interface GardbPagination {
        "currentPage"?: number;
        "onPageSelected"?: (event: CustomEvent<number>) => void;
        "pages"?: number;
    }
    interface GardbResults {
    }
    interface GardbSearch {
        "api"?: string;
        "debug"?: boolean;
    }
    interface IntrinsicElements {
        "app-loading": AppLoading;
        "app-messages": AppMessages;
        "gardb-filters": GardbFilters;
        "gardb-pagination": GardbPagination;
        "gardb-results": GardbResults;
        "gardb-search": GardbSearch;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "app-loading": LocalJSX.AppLoading & JSXBase.HTMLAttributes<HTMLAppLoadingElement>;
            "app-messages": LocalJSX.AppMessages & JSXBase.HTMLAttributes<HTMLAppMessagesElement>;
            "gardb-filters": LocalJSX.GardbFilters & JSXBase.HTMLAttributes<HTMLGardbFiltersElement>;
            "gardb-pagination": LocalJSX.GardbPagination & JSXBase.HTMLAttributes<HTMLGardbPaginationElement>;
            "gardb-results": LocalJSX.GardbResults & JSXBase.HTMLAttributes<HTMLGardbResultsElement>;
            "gardb-search": LocalJSX.GardbSearch & JSXBase.HTMLAttributes<HTMLGardbSearchElement>;
        }
    }
}
