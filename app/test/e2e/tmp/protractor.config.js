"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
exports.config = {
    capabilities: {
        'browserName': `chrome`
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: `ts:ts-node/register`,
        format: [`json:./reports/e2e/results.json`],
        require: ['../steps/*.ts', '../support/*.ts'],
        tags: '',
    },
    specs: [`../features/*.feature`],
    onPrepare: () => {
        protractor_1.browser.manage().window().maximize();
        protractor_1.browser.manage().timeouts().implicitlyWait(5000);
    }
};
