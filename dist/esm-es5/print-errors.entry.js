import { r as registerInstance, h, H as Host } from './index-1ede1968.js';
var printErrorsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}:host{display:block}";
var PrintErrors = /** @class */ (function () {
    function PrintErrors(hostRef) {
        registerInstance(this, hostRef);
    }
    PrintErrors.prototype.componentWillRender = function () {
    };
    PrintErrors.prototype.render = function () {
        if (this.errors.length) {
            return (h(Host, null, this.errors));
        }
    };
    return PrintErrors;
}());
PrintErrors.style = printErrorsCss;
export { PrintErrors as print_errors };