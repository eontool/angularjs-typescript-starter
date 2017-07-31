import { browser } from 'protractor';
import { defineSupportCode, HookScenarioResult, events } from 'cucumber';
import * as fs from 'fs';

defineSupportCode(function ({registerHandler, After }) {

  registerHandler('BeforeFeature', (event) => {
    return browser.get(`http://127.0.0.1:9000/`);
  });

  After((scenario, callback) => {

    if (scenario.failureException) {

      browser.driver.takeScreenshot().then(
        (image) => {

          const decodedImage = new Buffer(image, `base64`);
          scenario.attach(decodedImage, `image/png`);
          callback();

        }
      );

    } else {

      browser.driver.takeScreenshot().then(
        (image) => {

          const decodedImage = new Buffer(image, `base64`);
          scenario.attach(decodedImage, `image/png`);
          callback();

        }
      );

    }

  });

});
