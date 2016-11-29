export default class MainCtrl {

    private app: Object = {
        name: 'My App',
        version: 1.3
    }

    constructor() {

    }

    public main(value: boolean): void {
        console.log(value);
    }

}