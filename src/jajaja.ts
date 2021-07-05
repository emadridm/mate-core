import Realm from 'realm';
import os from 'os';
import path from 'path';

const TaskSchema = {
    name: "Task",
    properties: {
        _id: "objectId",
        name: "string",
        status: "string",
    },
    primaryKey: "_id",
};

abstract class Task {
    _id?: Realm.BSON.ObjectId
    name: string = '';
    status: string = 'new';
    constructor() {

    }
}

class ProjectTask extends Task {
    date?: string = '';
    constructor() {
        super();
    }
}


function pad2(n: number) { return n < 10 ? '0' + n : n }

var date = new Date();

const timestamp = date.getFullYear().toString() +
    pad2(date.getMonth() + 1) +
    pad2(date.getDate()) +
    pad2(date.getHours()) +
    pad2(date.getMinutes()) +
    pad2(date.getSeconds());


const dbFile = path.resolve(os.homedir(), 'mate', `jajaja-${timestamp}.realm`);

async function createTask(task: Task): Promise<Task | undefined> {
    var result: Task | undefined;
    try {
        const db = await Realm.open({
            path: dbFile,
            schema: [TaskSchema],
        });
        db.write(() => {
            result = db.create<Task>('Task', task);
            // console.log(`created three taspks: ${result.name} and ${result.status}`);
        });
        // db.close();
    } catch (reason) {
        console.log(reason);
    }
    return (result);
}

async function mainOpen() {
    try {

        let ptask1 = new ProjectTask();
        ptask1._id = new Realm.BSON.ObjectId();
        ptask1.name = "go exercise";
        ptask1.status = 'Open';
        ptask1.date = 'Tomorrow';

        let ptask2 = {
            _id: new Realm.BSON.ObjectId(),
            name: 'go cicling',
            status: 'closed'
        }

        let task = await createTask(ptask2);
        if (task) {
            console.log(`created three tasks: ${task.name} and ${task.status}`);
        }
    } catch (e) {
        console.log(e);
    }
}

mainOpen();
