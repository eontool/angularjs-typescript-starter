"use strict";
class MainCtrl {
    constructor() {
        this.app = {
            name: 'My App',
            version: 1.3
        };
    }
    main(value) {
        console.log(value);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainCtrl;
