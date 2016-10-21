"use strict";
var forms_1 = require('@angular/forms');
var FieldModel = (function () {
    function FieldModel() {
        this.fields = [];
    }
    FieldModel.prototype.toGroup = function () {
        var group = {};
        this.fields.forEach(function (field) {
            group[field.key] = new forms_1.FormControl('', forms_1.Validators.required);
        });
        return new forms_1.FormGroup(group);
    };
    return FieldModel;
}());
exports.FieldModel = FieldModel;
//# sourceMappingURL=field-model.js.map