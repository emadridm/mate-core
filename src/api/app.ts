import * as os from 'os';
import * as path from 'path';
import { Settings } from './settings';
import Realm from 'realm';
import { Binder, Model, Document } from './storage';

export abstract class App {

    static Name = 'mate';
    static Home = os.homedir() || '';

    static FilenameSettings = path.resolve(App.Home, `.${App.Name}.json`);

    static DefaultSettings: Settings = {
        home: path.resolve(App.Home, `.${App.Name}`),
    }

    settings: Settings = App.DefaultSettings;

    constructor() {
    }

    pathResolve(...pathSegments: string[]) {
        return path.resolve(this.settings.home, ...pathSegments);
    }

}
