import * as _angular_ from 'angular';

declare global {

  const angular: typeof _angular_;

  interface ICalculatorController extends angular.IController{
    addValues:() => void;
    result: number;
    valueA: number;
    valueB: number;
  }
}
