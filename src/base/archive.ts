import Realm from 'realm';
import * as _ from 'lodash';

export type Archive = Required<Pick<Realm.Configuration, 'path' | 'schema'>>;

export type DocumentSchema = Realm.ObjectSchema;

export interface DocumentClass<T extends Document> extends Realm.ObjectClass {
    new(...props: any[]): T
}

export abstract class Document {

    _id?: Realm.BSON.ObjectId;

    get id() {
        return this._id?.toHexString();
    }

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

    static extendsSchema<B extends Realm.ObjectSchema, X extends Partial<Realm.ObjectSchema>>(base: B, prop: X): B & X {
        return _.merge({}, base, prop);
    }
}
