import { r as registerInstance, h, H as Host } from './core-93a7cc70.js';

const Spinner = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, null, h("div", { class: "d-flex justify-content-lg-center py-3" }, h("i", { class: "fa fa-circle-o-notch fa-pulse fa-2x" }), h("span", { class: "sr-only" }, "Loading..."))));
    }
    static get style() { return ":root {\n  --gs-container-max-width: 1280px;\n  --gs-container-padding: 50px;\n  --gs-color-bg: #efefef;\n  --gs-color-primary: #71BC51;\n  --gs-color-secondary: #2196F3;\n  --gs-color-text: #333;\n  --gs-color-border: #999;\n  --gs-color-disabled: #ccc;\n  --gs-color-background: #fff;\n  --gs-border-radius: 5px;\n  --gs-border-radius-small: 2px;\n  --gs-font-size-base: 15px;\n  --gs-button-primary: var(--gs-color-primary);\n  --gs-button-primary-focus-color: #c1d6b7;\n  --gs-button-primary-border: var(--gs-color-primary);\n  --gs-button-light: #FFF;\n}\n\n:host {\n  display: block;\n}"; }
};

export { Spinner as loading_spinner };
