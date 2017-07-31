import 'angular-mocks';
import 'angular-sanitize';

describe(`Calculator component`, () => {

  let $scope, calculatorComponent: ICalculatorController;

  beforeEach(() => angular.mock.module(`app`));

  beforeEach(angular.mock.inject((_$rootScope_: angular.IRootScopeService, _$componentController_: angular.IControllerService) => {
    calculatorComponent = _$componentController_(`calculatorComponent`, {
      $scope: _$rootScope_.$new()
    });
  }));

  describe(`function addValues() behavior.`, () => {
    it(`calculatorComponent.result should equal 7`, (done) => {
      const mockedValueA = 13, mockedValueB = 8, expectedResult = 21;
      calculatorComponent.valueA = mockedValueA;
      calculatorComponent.valueB = mockedValueB;
      calculatorComponent.addValues();
      expect(calculatorComponent.result).toEqual(expectedResult);
      done();
    });
  });

});
