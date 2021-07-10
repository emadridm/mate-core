import { Document } from '../api/storage';

export enum AccountProvider {
    Mate = 'Mate',
    Google = 'Google',
    Outlook = 'Outlook',
    Exchange = 'Exchange',
}

export abstract class Account extends Document {

    provider: AccountProvider = AccountProvider.Mate;
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    static schema = {
        name: 'Account',
        properties: {
            ...Document.schema.properties,
            name: 'string',
            provider: 'string',
        },
        primaryKey: Document.schema.primaryKey
    }

}
