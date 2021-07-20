import { App } from '../base/app';
import { Archive } from '../base/archive';
import { Account } from './account';
import MateAccount from './mate'
import ExchangeAccount from './exchange';
import GoogleAccount from './google';


export class AccountApp extends App {

    constructor() {
        super();
    }

    static SCHEMAS = [MateAccount, ExchangeAccount, GoogleAccount];
    static SLABELS = AccountApp.SCHEMAS.map<string>((klass) => { return klass.schema.name });

    static ARCHIVE: Archive = {
        path: 'accounts',
        schema: AccountApp.SCHEMAS
    }

    async createAccount(provider: string, ...props: any[]): Promise<Account> {
        let account: Account = this.newDocument<Account>(AccountApp.SCHEMAS,
            provider,
            ...props);
        let document = await this.createDocument<Account>(AccountApp.ARCHIVE,
            provider,
            account
        );
        return (document as Account);
    }

    async readAccounts(provider: string): Promise<Account[]> {
        return (this.readDocuments<Account>(AccountApp.ARCHIVE, provider));
    }

}
