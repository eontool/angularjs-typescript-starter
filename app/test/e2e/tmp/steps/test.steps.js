"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const test_page_1 = require("../pages/test.page");
const cucumber_1 = require("cucumber");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
cucumber_1.defineSupportCode(({ Given, When, Then }) => {
    let calc = new test_page_1.CalculatorPageObject();
    Given(/^The calculator component is present$/, () => {
        protractor_1.browser.waitForAngular();
        return expect(protractor_1.browser.getTitle()).to.eventually.equal('My App');
    });
    When(/^I type two numbers "(.*?)" "(.*?)"$/, (num1, num2) => {
        calc.valueA.sendKeys(num1);
        return calc.valueB.sendKeys(num2);
    });
    Then(/^the correct result should be displayed "(.*?)"$/, (result) => {
        return expect(calc.result.getText()).to.eventually.equal(result);
    });
});
