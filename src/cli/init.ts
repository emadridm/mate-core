import { App } from '../api/app'
import { LoadSettings } from '../api/settings';

type AppClass = new () => App;

export async function InitApp<T extends App>(MateApp: AppClass, fileconf: string = App.FilenameSettings): Promise<T> {
    let app = new MateApp(); // new app with default settings.
    try {
        app.settings = await LoadSettings(fileconf, app.settings);
    } catch (reason) {
        console.log(reason);
    }
    return (app as T);
}
