import { Component, Host, h, Prop } from '@stencil/core';
export class PrintErrors {
    componentWillRender() {
    }
    render() {
        if (this.errors.length) {
            return (h(Host, null, this.errors));
        }
    }
    static get is() { return "print-errors"; }
    static get originalStyleUrls() { return {
        "$": ["print-errors.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["print-errors.css"]
    }; }
    static get properties() { return {
        "errors": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "errors",
            "reflect": false
        }
    }; }
}
