import {EventEmitter} from "events";

const event = new EventEmitter();

class EventUtils {
    static _instance = event;

    static emit(key: string | symbol, value = []) {
        this._instance.emit(key, ...value);
    }

    static addListener(key: string | symbol, callback: (...args: any[]) => void) {
        this._instance.addListener(key, callback);
    }

    static removeListener(key: string | symbol, callback: (...args: any[]) => void) {
        this._instance.removeListener(key, callback);
    }

}

class EventKey {
    static scrollRefresh(event = 'default') {
        return `${event}betterScrollRefresh`;
    }

    static scrollToTop(event = 'default') {
        return `${event}betterScrollToTop`;
    }
}

export {
    EventUtils,
    EventKey,
}
