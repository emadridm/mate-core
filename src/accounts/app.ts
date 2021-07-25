import { BaseApp, Archive } from '../base'
import { Account } from './account';
import { MateAccount } from './mate'
import { ExchangeAccount } from './exchange';
import { GoogleAccount } from './google';

export class App extends BaseApp {

    constructor() {
        super();
    }

    static SCHEMAS = [MateAccount, ExchangeAccount, GoogleAccount];
    static BINDERS = App.SCHEMAS.map<string>((klass) => { return klass.schema.name });

    static ARCHIVE: Archive = {
        path: 'accounts',
        schema: App.SCHEMAS
    }

    async createAccount(provider: string, ...props: any[]): Promise<Account> {
        let account: Account = this.newDocument<Account>(App.SCHEMAS,
            provider,
            ...props);
        let document = await this.createDocument<Account>(App.ARCHIVE,
            provider,
            account
        );
        return (document as Account);
    }

    async readAccounts(provider: string): Promise<Account[]> {
        return (this.readDocuments<Account>(App.ARCHIVE, provider));
    }

}
