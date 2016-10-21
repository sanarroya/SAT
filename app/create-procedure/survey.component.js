"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Survey = (function () {
    function Survey() {
        this.payload = null;
    }
    Survey.prototype.ngOnInit = function () {
        this.form = this.model.toGroup();
    };
    Survey.prototype.onSubmit = function () {
        this.payload = JSON.stringify(this.form.value);
        console.log(this.payload);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Survey.prototype, "model", void 0);
    Survey = __decorate([
        core_1.Component({
            selector: 'survey',
            templateUrl: './app/create-procedure/survey.component.html',
            styleUrls: ['./app/signin/signin.component.css', './app/edit-profile/edit-profile.component.css'],
        }), 
        __metadata('design:paramtypes', [])
    ], Survey);
    return Survey;
}());
exports.Survey = Survey;
//# sourceMappingURL=survey.component.js.map