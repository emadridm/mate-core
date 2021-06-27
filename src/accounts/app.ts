import { App } from '../api/app';
import { Account } from './account';
import { ExchangeAccount } from './exchange';
import { Binder } from '../api/storage';
import Realm from 'realm';

export class AccountApp extends App {

    constructor() {
        super();
    }

    static AccountDB: Binder = {
        path: 'accounts',
        schema: [ExchangeAccount]
    }

    async addAccount<T extends Account>(account: Account): Promise<T> {
        Realm.defaultPath = this.pathResolve('accounts');
        try {
            const db = await Realm.open(AccountApp.AccountDB);
            db.write(() => {
                account.newID();
                account = db.create<Account>(account.provider, account);
            })
            db.close();
        } catch (reason) {
            console.log(reason);
        }
        return (account as T);
    }
}
