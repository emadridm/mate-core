import * as os from 'os';
import * as path from 'path';
import { Settings } from './settings';
import Realm from 'realm';
import { ConfigDB, HashOfDBs } from './storage';

export abstract class App {

    private _dbs: HashOfDBs = {};

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

    protected async openDB(config: ConfigDB): Promise<Realm> {
        let key = config.path;
        if (this._dbs[key] == undefined) {
            config.path = this.pathResolve(config.path);
            this._dbs[key] = await Realm.open(config);
        }
        return this._dbs[key];
    }

    protected closeDBs() {
        Object.values<Realm>(this._dbs).forEach((db) => {
            db.close();
        })
        this._dbs = {};
    }

    public close() {
        this.closeDBs();
    }

}
