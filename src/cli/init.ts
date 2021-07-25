import { BaseApp } from '../base/app'
import { LoadSettings } from '../base/settings';

type AppClass = new () => BaseApp;

export async function InitApp<T extends BaseApp>(MateApp: AppClass, fileconf: string = BaseApp.FilenameSettings): Promise<T> {
    let app = new MateApp(); // new app with default settings.
    try {
        app.settings = await LoadSettings(fileconf, app.settings);
    } catch (reason) {
        console.log(reason);
    }
    return (app as T);
}
