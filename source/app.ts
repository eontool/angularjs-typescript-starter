import * as angular from 'angular';
import * as $ from 'jquery';
import MainCtrl from './controllers/mainCtrl';

let app: angular.IModule = angular.module('mainApp', []);

app.controller('mainCtrl', MainCtrl);
