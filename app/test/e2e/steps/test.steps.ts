import { browser } from 'protractor';
import { CalculatorPageObject } from '../pages/test.page';
import { defineSupportCode } from 'cucumber';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(({Given, When, Then}) => {

  let calc: CalculatorPageObject = new CalculatorPageObject();

  Given(/^The calculator component is present$/, () => {
    browser.waitForAngular();
    return expect(browser.getTitle()).to.eventually.equal('My App');
  });

  When(/^I type two numbers "(.*?)" "(.*?)"$/, (num1: string, num2: string) => {
    calc.valueA.sendKeys(num1);
    return calc.valueB.sendKeys(num2);
  });

  Then(/^the correct result should be displayed "(.*?)"$/, (result: string) => {
    return expect(calc.result.getText()).to.eventually.equal(result);
  });
});
