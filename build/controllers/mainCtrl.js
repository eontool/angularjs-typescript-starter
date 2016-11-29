"use strict";
class MainCtrl {
    constructor($http) {
        this.$http = $http;
        this.app = {
            name: 'My App',
            version: 1.3
        };
    }
    main(value) {
        console.log(value);
    }
    getData() {
        this.$http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson').then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }
}
MainCtrl.$inject = [
    '$http'
];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainCtrl;
