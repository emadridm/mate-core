import Realm from "realm";

export type ConfigDB = Required<Pick<Realm.Configuration, 'path' | 'schema'>>;
export type HashOfDBs = { [s: string]: Realm };

export interface DocumentClass<T extends Document> extends Realm.ObjectClass {
    new(...props: any): T
}

export abstract class Document {

    _id?: Realm.BSON.ObjectId;

    newID() {
        this._id = this._id || new Realm.BSON.ObjectID();
    }

    static schema = {
        name: 'Document',
        properties: {
            _id: 'objectId',
        },
        primaryKey: '_id'
    }
}

export { Realm }
