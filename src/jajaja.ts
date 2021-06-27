import Realm, { BSON } from 'realm';
import os from 'os';
import path from 'path';

const TaskSchema = {
    name: "Task",
    properties: {
        _id: "objectId",
        name: "string",
        status: "string?",
    },
    primaryKey: "_id",
};

class Task {
    _id?: BSON.ObjectId
    name: string = '';
    status?: string;

    constructor() {

    }
}

function mainNew() {
    const db = new Realm({
        path: path.resolve(os.homedir(), '.mate', 'jajaja'),
        schema: [TaskSchema],
    });

    let task = new Task();
    task._id = new BSON.ObjectId();
    task.name = "go exercise";
    task.status = 'Open';

    db.write(() => {
        task = db.create<Task>("Task", task);
        console.log(`created three tasks: ${task.name} `);
    });
    db.close();
}

async function mainOpen() {
    try {
        // Realm.defaultPath = path.resolve(os.homedir(), '.mate');
        const db = await Realm.open({
            path: path.resolve(os.homedir(), 'mate', 'jajaja.realm'),
            schema: [TaskSchema],
        });

        let task1, task2, task3: Task;

        let task = new Task();
        task._id = new BSON.ObjectId();
        task.name = "go exercise";
        task.status = 'Open';

        task3 = new Task();
        task3._id = new BSON.ObjectId();
        task3.name = "go clicling";
        task3.status = 'never';

        db.write(() => {
            task1 = db.create<Task>('Task', {
                _id: new BSON.ObjectID(),
                name: "go grocery shopping",
                status: "Open",
            });
            task2 = db.create<Task>("Task", task);
            task3 = db.create<Task>('Task', task3);
            console.log(`created three tasks: ${task1.name} & ${task2.name} & ${task3.name}`);
        });
        db.close();
    } catch (reason) {
        console.log(reason);
    } finally {
        console.log('this is the end!');
    }
}

mainOpen().finally(() => {
    process.exit(0);
})

// mainNew();
