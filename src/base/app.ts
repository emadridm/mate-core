import * as os from 'os';
import * as path from 'path';
import { Settings } from './settings';
import { Archive, DocumentClass, Document } from './archive';

type Session = { [s: string]: Realm };

export abstract class App {

    private _archives: Session = {};

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

    protected async openArchive(archive: Archive): Promise<Realm> {
        let key = archive.path;
        if (this._archives[key] === undefined) {
            archive.path = this.pathResolve(archive.path);
            this._archives[key] = await Realm.open(archive);
        }
        return this._archives[key];
    }

    protected closeArchives() {
        Object.values<Realm>(this._archives).forEach((db) => {
            db.close();
        })
        this._archives = {};
    }

    public close() {
        this.closeArchives();
    }

    newDocument<T extends Document>(schemas: DocumentClass<T>[], schemaName: string, ...props: any[]): T {
        for (let klass of schemas) {
            if (schemaName === klass.schema.name) {
                return new klass(...props)
            }
        }
        throw (`Document class ${schemaName} does not exists!`);
    }

    async createDocument<T extends Document>(archive: Archive, schemaName: string, document: T): Promise<Document> {
        try {
            let result: Document = (document as Document);
            let db = await this.openArchive(archive);
            db.write(() => {
                document.newID();
                result = db.create<Document>(schemaName, document);
            })
            return (result as T);
        } catch (reason) {
            console.log(reason);
            throw (`Document can not be created!`);
        }
    }

    async readDocuments<T extends Document>(archive: Archive, schemaName: string): Promise<T[]> {
        try {
            // let result: Document[] = [];
            let binder = await this.openArchive(archive);
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
