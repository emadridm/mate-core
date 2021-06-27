import { AccountProvider, Account } from './account';


export class ExchangeAccount extends Account {

    address?: string;
    username?: string;
    password?: string;

    constructor(name: string) {
        super(name);
        this.provider = AccountProvider.Exchange;
    }

    static schema = {
        name: 'Exchange',
        properties: {
            ...Account.schema.properties,
            address: 'string?',
            username: 'string?',
            password: 'string?'
        },
        primaryKey: Account.schema.primaryKey
    }
}
