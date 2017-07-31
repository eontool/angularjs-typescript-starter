import { browser, Config } from 'protractor';

export const config = {

    capabilities: {
        'browserName':`chrome`
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    cucumberOpts: {
        compiler: `ts:ts-node/register`,
        format: [ `json:./reports/e2e/results.json` ],
        require: ['../steps/*.ts', '../support/*.ts'],
        tags: '',
    },

    specs: [ `../features/*.feature` ],
    onPrepare: () => {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
    }

};
