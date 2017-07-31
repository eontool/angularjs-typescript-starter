import { $, by, element, ElementFinder } from 'protractor';

export class CalculatorPageObject {
  public valueA: ElementFinder;
  public valueB: ElementFinder;
  public result: ElementFinder;

  constructor () {
    this.valueA = element(by.id(`valueA`));
    this.valueB = element(by.id('valueB'));
    this.result = element(by.id('result'));
  }
}
