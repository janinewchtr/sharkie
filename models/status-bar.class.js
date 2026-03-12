class StatusBar {
    constructor() {
        this._status = 'ready';
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}