import { AccountProvider, Account } from './account';

export class GoogleAccount extends Account {

    address?: string;
    phone?: string;
    password?: string;

    constructor(name: string) {
        super(name);
        this.provider = AccountProvider.Google;
    }

    static schema = GoogleAccount.extendsSchema(Account.schema, {
        name: 'Google',
        properties: {
            address: 'string?',
            phone: 'string?',
            password: 'string?'
        }
    });

}
