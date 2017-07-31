"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
class CalculatorPageObject {
    constructor() {
        this.valueA = protractor_1.element(protractor_1.by.id(`valueA`));
        this.valueB = protractor_1.element(protractor_1.by.id('valueB'));
        this.result = protractor_1.element(protractor_1.by.id('result'));
    }
}
exports.CalculatorPageObject = CalculatorPageObject;
