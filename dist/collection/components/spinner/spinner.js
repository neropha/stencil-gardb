import { Host, h } from "@stencil/core";
export class Spinner {
    render() {
        return (h(Host, null,
            h("div", { class: "d-flex justify-content-lg-center py-3" },
                h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }),
                h("span", { class: "sr-only" }, "Loading..."))));
    }
    static get is() { return "loading-spinner"; }
    static get originalStyleUrls() { return {
        "$": ["spinner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
}