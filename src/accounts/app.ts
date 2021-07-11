import { App } from '../api/app';
import { Account } from './account';
import { ExchangeAccount } from './exchange';
import { ConfigDB } from '../api/storage';


export class AccountApp extends App {

    constructor() {
        super();
    }

    static AccountSchemas = [ExchangeAccount];
    static AccountSchemaNames = AccountApp.AccountSchemas.map<string>((klass) => { return klass.schema.name });

    static AccountDB: ConfigDB = {
        path: 'accounts',
        schema: AccountApp.AccountSchemas
    }

    async createAccount(provider: string, ...props: any[]): Promise<Account> {
        let account = this.newDocument<Account>(AccountApp.AccountSchemas,
            provider,
            ...props);
        let document = await this.createDocument<Account>(AccountApp.AccountDB,
            provider,
            account
        );
        return (document as Account);
    }

}
