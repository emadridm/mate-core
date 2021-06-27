import { Document } from '../api/storage';

export enum AccountProvider {
    Mate = 'Mate',
    Google = 'Google',
    Outlook = 'Outlook',
    Exchange = 'Exchange',
}


export abstract class Account extends Document {

    name: string;
    provider: AccountProvider;

    constructor(name: string) {
        super();
        this.name = name;
        this.provider = AccountProvider.Mate;
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
