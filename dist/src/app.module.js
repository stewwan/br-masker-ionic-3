import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrMaskerIonic3 } from './directives/brmasker-ionic-3';
var BrMaskerModule = (function () {
    function BrMaskerModule() {
    }
    BrMaskerModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        BrMaskerIonic3
                    ],
                    exports: [
                        BrMaskerIonic3
                    ],
                    imports: [
                        CommonModule
                    ],
                    schemas: [
                        CUSTOM_ELEMENTS_SCHEMA
                    ]
                },] },
    ];
    /** @nocollapse */
    BrMaskerModule.ctorParameters = function () { return []; };
    return BrMaskerModule;
}());
export { BrMaskerModule };
//# sourceMappingURL=app.module.js.map