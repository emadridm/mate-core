import * as chai from 'chai';
import { App } from '../../src/api/app';
import { Document } from '../../src/api/storage'

const expect = chai.expect;

class TestApp extends App {

}

class DocumentA extends Document {
    static schema = Object.assign({}, Document.schema, { name: 'DocumentA' });
}

class DocumentB extends Document {
    static schema = Object.assign({}, Document.schema, { name: 'DocumentB' });
}

const SCHEMAS = [DocumentA, DocumentB];

const ARCHIVE = {
    path: 'documents',
    schema: SCHEMAS
}

describe('api/app', () => {

    let app = new TestApp();

    after(() => {
        app.close();
    })

    describe('newDocument', () => {

        it('should create a new instance Class1 with schema named "Class1"', () => {
            expect(app.newDocument<Document>(SCHEMAS, 'DocumentA')).to.be.instanceOf(DocumentA);
        })

        it('should create a new instance Class2 with schema named "Class2"', () => {
            expect(app.newDocument<Document>(SCHEMAS, 'DocumentB')).to.be.instanceOf(DocumentB);
        })

    })

    describe('createDocument', () => {

        it('should return a new instance DocumentA', () => {
            return app.createDocument(ARCHIVE, 'DocumentA', new DocumentA()).then((doc) => {
                expect(doc).to.be.instanceOf(DocumentA)
            })
        })

        it('should return a new instance DocumentB', () => {
            return app.createDocument(ARCHIVE, 'DocumentB', new DocumentB()).then((doc) => {
                expect(doc).to.be.instanceOf(DocumentB)
            })
        })

    })

});
