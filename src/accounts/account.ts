import { Document } from '../base/archive';

export enum AccountProvider {
    Mate = 'Mate',
    Exchange = 'Exchange',
    Google = 'Google'
}

export abstract class Account extends Document {

    provider: AccountProvider = AccountProvider.Mate;
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    static schema = Account.extendsSchema(Document.schema, {
        name: 'Account',
        properties: {
            name: 'string',
            provider: 'string',
        }
    });
}
