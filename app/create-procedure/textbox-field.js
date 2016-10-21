"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_base_1 = require('../create-procedure/field-base');
var TextBoxField = (function (_super) {
    __extends(TextBoxField, _super);
    function TextBoxField() {
        _super.call(this);
        this.controlType = 'textbox';
    }
    return TextBoxField;
}(field_base_1.FieldBase));
exports.TextBoxField = TextBoxField;
//# sourceMappingURL=textbox-field.js.map