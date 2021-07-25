import { BaseApp, Document } from '../../src/base';

class TestApp extends BaseApp {

}

class DocumentA extends Document {
    static schema = DocumentA.extendsSchema(Document.schema, {
        name: 'DocumentA'
    });
}

class DocumentB extends Document {
    static schema = DocumentB.extendsSchema(Document.schema, {
        name: 'DocumentB'
    });
}

const SCHEMAS = [DocumentA, DocumentB];

const ARCHIVE = {
    path: 'documents',
    schema: SCHEMAS
}

describe('api/app', () => {

    let app = new TestApp();

    afterAll(() => {
        app.close();
    })

    describe('newDocument', () => {

        it('should create a new instance DocumentA with schema named "DocumentA"', () => {
            expect(app.newDocument<Document>(SCHEMAS, 'DocumentA')).toBeInstanceOf(DocumentA);
        })

        it('should create a new instance DocumentB with schema named "DocumentB"', () => {
            expect(app.newDocument<Document>(SCHEMAS, 'DocumentB')).toBeInstanceOf(DocumentB);
        })

    })

    describe('createDocument', () => {

        beforeEach(() => {
            app.closeArchives();
        })

        it('should return a new instance DocumentA', async () => {
            return app.createDocument(ARCHIVE, 'DocumentA', new DocumentA()).then((doc) => {
                expect(doc).toBeInstanceOf(DocumentA);
            })
        })

        it('should return a new instance DocumentB', async () => {
            return app.createDocument(ARCHIVE, 'DocumentB', new DocumentB()).then((doc) => {
                expect(doc).toBeInstanceOf(DocumentB)
            })
        })

    })

    describe('readDocuments', () => {

        beforeEach(() => {
            app.closeArchives();
        })

        it('should return an array of documents', async () => {
            await app.createDocument(ARCHIVE, 'DocumentA', new DocumentA());
            return app.readDocuments(ARCHIVE, 'DocumentA').then((result) => {
                expect(result.length).toBe(1)
            })
        })

    })

});
