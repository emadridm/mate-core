import { AccountProvider, Account } from './account';

export class ExchangeAccount extends Account {

    address?: string;
    username?: string;
    password?: string;

    constructor(name: string) {
        super(name);
        this.provider = AccountProvider.Exchange;
    }

    static schema = ExchangeAccount.extendsSchema(Account.schema, {
        name: 'Exchange',
        properties: {
            address: 'string?',
            username: 'string?',
            password: 'string?'
        }
    })
}
