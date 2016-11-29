(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var angular = require('angular');
var mainCtrl_1 = require('./controllers/mainCtrl');
var app = angular.module('mainApp', []);
app.controller('mainCtrl', mainCtrl_1.default);

},{"./controllers/mainCtrl":2,"angular":"angular"}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainCtrl = function () {
    function MainCtrl() {
        _classCallCheck(this, MainCtrl);

        this.app = {
            name: 'My App',
            version: 1.3
        };
    }

    _createClass(MainCtrl, [{
        key: "main",
        value: function main(value) {
            console.log(value);
        }
    }]);

    return MainCtrl;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainCtrl;

},{}]},{},[1]);
