import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
var BrModel = (function () {
    function BrModel() {
    }
    return BrModel;
}());
export { BrModel };
var BrMaskerIonic3 = (function () {
    function BrMaskerIonic3(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.brmasker = new BrModel();
    }
    BrMaskerIonic3.prototype.inputKeyup = function (event) {
        event.target.value = this.returnValue(event.target.value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', this.returnValue(event.target.value));
    };
    BrMaskerIonic3.prototype.inputOnblur = function (event) {
        event.value = this.returnValue(event.value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', this.returnValue(event.value));
    };
    BrMaskerIonic3.prototype.inputFocus = function (event) {
        event.value = this.returnValue(event.value);
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', this.returnValue(event.value));
    };
    BrMaskerIonic3.prototype.ngOnInit = function () {
    };
    BrMaskerIonic3.prototype.writeValue = function (fn) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', this.returnValue(fn));
    };
    BrMaskerIonic3.prototype.registerOnChange = function (fn) {
    };
    BrMaskerIonic3.prototype.registerOnTouched = function (fn) {
    };
    BrMaskerIonic3.prototype.returnValue = function (value) {
        if (!this.brmasker.mask) {
            this.brmasker.mask = '';
        }
        if (value) {
            if (this.brmasker.money) {
                return this.moneyMask(this.onInput(value));
            }
            if (this.brmasker.phone) {
                return this.phoneMask(value);
            }
            if (this.brmasker.person) {
                return this.peapollMask(value);
            }
            return this.onInput(value);
        }
        else {
            return '';
        }
    };
    BrMaskerIonic3.prototype.phoneMask = function (v) {
        var n = v;
        if (n.length > 14) {
            this.brmasker.len = 15;
            this.brmasker.mask = '(99) 99999-9999';
            n = n.replace(/\D/g, '');
            n = n.replace(/(\d{2})(\d)/, '$1 $2');
            n = n.replace(/(\d{5})(\d)/, '$1-$2');
            n = n.replace(/(\d{4})(\d)/, '$1$2');
        }
        else {
            this.brmasker.len = 14;
            this.brmasker.mask = '(99) 9999-9999';
            n = n.replace(/\D/g, '');
            n = n.replace(/(\d{2})(\d)/, '$1 $2');
            n = n.replace(/(\d{4})(\d)/, '$1-$2');
            n = n.replace(/(\d{4})(\d)/, '$1$2');
        }
        return this.onInput(n);
    };
    BrMaskerIonic3.prototype.peapollMask = function (v) {
        var n = v;
        if (n.length > 14) {
            this.brmasker.len = 18;
            this.brmasker.mask = '99.999.999/9999-99';
            n = n.replace(/\D/g, '');
            n = n.replace(/(\d{2})(\d)/, '$1.$2');
            n = n.replace(/(\d{3})(\d)/, '$1.$2');
            n = n.replace(/(\d{3})(\d)/, '$1/$2');
            n = n.replace(/(\d{4})(\d{1,4})$/, '$1-$2');
            n = n.replace(/(\d{2})(\d{1,2})$/, '$1$2');
        }
        else {
            this.brmasker.len = 14;
            this.brmasker.mask = '999.999.999-99';
            n = n.replace(/\D/g, '');
            n = n.replace(/(\d{3})(\d)/, '$1.$2');
            n = n.replace(/(\d{3})(\d)/, '$1.$2');
            n = n.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return this.onInput(n);
    };
    BrMaskerIonic3.prototype.moneyMask = function (v) {
        var tmp = v;
        tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
        return tmp;
    };
    BrMaskerIonic3.prototype.onInput = function (value) {
        var ret = this.formataCampo(value, this.brmasker.mask, this.brmasker.len);
        return ret;
        // if (ret) {
        //   this.element.nativeElement.value = ret;
        // }
    };
    BrMaskerIonic3.prototype.formataCampo = function (campo, Mascara, tamanho) {
        if (!tamanho) {
            tamanho = 99999999999;
        }
        var boleanoMascara;
        var exp = /\-|\.|\/|\(|\)|\,|\*|\+|\@|\#|\$|\&|\%| /g;
        var campoSoNumeros = campo.toString().replace(exp, '');
        var posicaoCampo = 0;
        var NovoValorCampo = '';
        var TamanhoMascara = campoSoNumeros.length;
        for (var i = 0; i < TamanhoMascara; i++) {
            if (i < tamanho) {
                boleanoMascara = ((Mascara.charAt(i) === '-') || (Mascara.charAt(i) === '.') || (Mascara.charAt(i) === '/'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '(') || (Mascara.charAt(i) === ')') || (Mascara.charAt(i) === ' '));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === ',') || (Mascara.charAt(i) === '*') || (Mascara.charAt(i) === '+'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '@') || (Mascara.charAt(i) === '#'));
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) === '$') || (Mascara.charAt(i) === '&') || (Mascara.charAt(i) === '%'));
                if (boleanoMascara) {
                    NovoValorCampo += Mascara.charAt(i);
                    TamanhoMascara++;
                }
                else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
        }
        return NovoValorCampo;
    };
    BrMaskerIonic3.decorators = [
        { type: Directive, args: [{
                    selector: '[brmasker]',
                    providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: BrMaskerIonic3,
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    BrMaskerIonic3.ctorParameters = function () { return [
        { type: Renderer, },
        { type: ElementRef, },
    ]; };
    BrMaskerIonic3.propDecorators = {
        "brmasker": [{ type: Input },],
        "inputKeyup": [{ type: HostListener, args: ['keyup', ['$event'],] },],
        "inputOnblur": [{ type: HostListener, args: ['ionBlur', ['$event._native.nativeElement'],] },],
        "inputFocus": [{ type: HostListener, args: ['ionFocus', ['$event._native.nativeElement'],] },],
    };
    return BrMaskerIonic3;
}());
export { BrMaskerIonic3 };
//# sourceMappingURL=brmasker-ionic-3.js.map