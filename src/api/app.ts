import * as os from 'os';
import * as path from 'path';
import { Settings } from './settings';
import Realm from 'realm';
import { ConfigDB, DocumentClass, Document, HashOfDBs, Archive } from './storage';

export abstract class App {

    private _dbs: HashOfDBs = {};

    static Name = 'mate';
    static Home = os.homedir() || '';

    static FilenameSettings = path.resolve(App.Home, `.${App.Name}.json`);

    static DefaultSettings: Settings = {
        home: path.resolve(App.Home, `.${App.Name}`),
    }

    settings: Settings = App.DefaultSettings;

    pathResolve(...pathSegments: string[]) {
        return path.resolve(this.settings.home, ...pathSegments);
    }

    protected async openDB(config: ConfigDB): Promise<Realm> {
        let key = config.path;
        if (this._dbs[key] === undefined) {
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

    newDocument<T extends Document>(schemas: DocumentClass<T>[], schemaName: string, ...props: any[]): T {
        for (let klass of schemas) {
            if (schemaName === klass.schema.name) {
                return new klass(...props)
            }
        }
        throw (`Document class ${schemaName} does not exists!`);
    }

    async createDocument<T extends Document>(archive: ConfigDB, binder: string, document: T): Promise<Document> {
        try {
            let result: Document = (document as Document);
            let db = await this.openDB(archive);
            db.write(() => {
                document.newID();
                result = db.create<Document>(binder, document);
            })
            console.log(`Document created!`);
            return (result as T);
        } catch (reason) {
            console.log(reason);
            throw (`Document can not be created!`);
        }
    }

    async readDocuments<T extends Document>(archive: Archive, schemaName: string): Promise<T[]> {
        try {
            // let result: Document[] = [];
            let binder = await this.openDB(archive);
            // binder.objects<Document>(schemaName).snapshot().forEach((document) => {
            //     result.push(document);
            // })
            // return (result as T[]);
            return ((binder.objects<Document>(schemaName).snapshot() as unknown) as T[])
        } catch (reason) {
            console.log(reason);
            throw (`Documents ${schemaName} in ${archive.path} can not be readed!`);
        }
    }
}
