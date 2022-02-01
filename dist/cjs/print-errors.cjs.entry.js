'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-1f060336.js');

const printErrorsCss = ":root{--gs-container-max-width:1280px;--gs-container-padding:50px;--gs-color-bg:#efefef;--gs-color-primary:#71BC51;--gs-color-secondary:#2196F3;--gs-color-text:#333;--gs-color-border:#999;--gs-color-disabled:#ccc;--gs-color-background:#fff;--gs-border-radius:5px;--gs-border-radius-small:2px;--gs-font-size-base:15px;--gs-button-primary:var(--gs-color-primary);--gs-button-primary-focus-color:#c1d6b7;--gs-button-primary-border:var(--gs-color-primary);--gs-button-light:#FFF}:host{display:block}";

const PrintErrors = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    componentWillRender() {
    }
    render() {
        if (this.errors.length) {
            return (index.h(index.Host, null, this.errors));
        }
    }
};
PrintErrors.style = printErrorsCss;

exports.print_errors = PrintErrors;
