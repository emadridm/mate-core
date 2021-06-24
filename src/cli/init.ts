import { App } from '../api'
import { LoadSettings } from '../api/settings';

export async function InitApp(MateApp: new () => App, fileconf: string = App.fileSettings): Promise<App> {
    let app = new MateApp(); // new app with default settings.
    try {
        app.settings = await LoadSettings(fileconf, app.settings);
    } catch (reason) {
        console.log(reason);
    }
    return app;
}
