"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const cucumber_1 = require("cucumber");
cucumber_1.defineSupportCode(function ({ registerHandler, After }) {
    registerHandler('BeforeFeature', (event) => {
        return protractor_1.browser.get(`http://127.0.0.1:9000/`);
    });
    After((scenario, callback) => {
        if (scenario.isFailed()) {
            protractor_1.browser.driver.takeScreenshot().then((image) => {
                const decodedImage = new Buffer(image, `base64`);
                scenario.attach(decodedImage, `image/png`);
                callback();
            });
        }
        else {
            protractor_1.browser.driver.takeScreenshot().then((image) => {
                const decodedImage = new Buffer(image, `base64`);
                scenario.attach(decodedImage, `image/png`);
                callback();
            });
        }
    });
});
