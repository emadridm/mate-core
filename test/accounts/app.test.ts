import { App, ExchangeAccount } from '../../src/accounts';

describe('accounts/app', () => {

    let app = new App();

    afterAll(() => {
        app.close();
    })

    describe('createAccount', () => {

        it('should return an Exchange Account', async () => {
            return app.createAccount('Exchange', 'Account name').then((account) => {
                expect(account).toBeInstanceOf(ExchangeAccount);
            })
        })

    })

})
