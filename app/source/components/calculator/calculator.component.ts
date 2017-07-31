class CalculatorController implements ICalculatorController {

  protected static $inject = [];

  constructor () {
    return this;
  }

  result = 0;
  valueA = 0;
  valueB = 0;

  addValues () {
    this.result = this.valueA + this.valueB;
  }

}

const calculatorComponent: angular.IComponentOptions = {
  controller: CalculatorController,
  controllerAs: 'vm',
  template: [`$templateCache`, ($templateCache: angular.ITemplateCacheService) => $templateCache.get(`calculator/calculator.template.html`)],
};

export const calculator_component = angular.module('calculator_component', [])
  .component('calculatorComponent', calculatorComponent);
