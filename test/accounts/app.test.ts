import * as chai from 'chai';
import { AccountApp, ExchangeAccount } from '../../src/accounts';

const expect = chai.expect;

describe('accounts/app', () => {

    let app = new AccountApp();

    describe('createAccount', () => {
        it('should return an Exchange Account', () => {
            expect(app.createAccount('Exchange', 'Account name')).to.be.instanceOf(ExchangeAccount);
        })
    })

})
