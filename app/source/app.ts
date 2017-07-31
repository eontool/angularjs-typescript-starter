import { calculator_component } from './components/calculator/calculator.component';

const modules: angular.IModule[] = [
  calculator_component
];

angular.module('app', modules.map(module => module.name).concat(`templates`, `ngSanitize`));
