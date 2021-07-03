import { App } from '../api/app';
import { Account } from './account';
import { ExchangeAccount } from './exchange';
import { ConfigDB } from '../api/storage';

export class AccountApp extends App {

    constructor() {
        super();
    }

    static AccountDB: ConfigDB = {
        path: 'accounts',
        schema: [ExchangeAccount]
    }

    async addAccount<T extends Account>(account: T): Promise<Account> {
        let result: Account | undefined;
        try {
            let db = await this.openDB(AccountApp.AccountDB);
            db.write(() => {
                account.newID();
                result = db.create<Account>(account.provider, account);
            })
        } catch (reason) {
            console.log(reason);
        }
        return (result as Account);
    }
}
