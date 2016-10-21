"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var field_base_1 = require('../create-procedure/field-base');
var FileField = (function (_super) {
    __extends(FileField, _super);
    function FileField() {
        _super.call(this);
        this.controlType = 'file';
    }
    return FileField;
}(field_base_1.FieldBase));
exports.FileField = FileField;
//# sourceMappingURL=file-field.js.map