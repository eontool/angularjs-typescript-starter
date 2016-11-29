export default class MainCtrl {

    static $inject = [
        '$http'
    ];

    private app: Object = {
        name: 'My App',
        version: 1.3
    }

    constructor(private $http: angular.IHttpService) {

    }
    
    public main(value: boolean): void {
        console.log(value);
    }

    public getData(): void {
        this.$http.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson').then(
            (data) => {
                console.log(data);
            }
        ).catch((error) => {
            console.log(error);
        });
    }

}