import Realm from "realm";
import * as bson from 'bson';

export type Binder = Required<Pick<Realm.Configuration, 'path' | 'schema'>>;

export interface Model extends Realm.ObjectClass {
    // _id?: Realm.BSON.ObjectId
    _id?: bson.ObjectId
}

export abstract class Document {

    // _id?: Realm.BSON.ObjectId;
    _id?: bson.ObjectId;

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
