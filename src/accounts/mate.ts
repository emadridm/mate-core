import { AccountProvider, Account } from './account';

export default class MateAccount extends Account {

    username?: string;
    password?: string;

    constructor(name: string) {
        super(name);
        this.provider = AccountProvider.Mate;
    }

    static schema = MateAccount.extendsSchema(Account.schema, {
        name: 'Mate',
        properties: {
            username: 'string?',
            password: 'string?'
        }
    });

}
