import { BuildSettings } from '../UberReaderClient/BuildSettings';
export class DevUtils {
    public static Stringify(obj: any): void {
        console.log("--------------- STRINGIFY START -------------------");
        console.log(JSON.stringify(obj));
        console.log("--------------- STRINGIFY END ---------------------");
    }

    public static DisplayDetails(obj: any): void {
        console.log("--------------- DETAILS START -------------------");
        for (let param in obj) {
            console.log(param + ":" + obj.param);
        }
        console.log("--------------- DETAILS END ---------------------");
    }

    public static ShowTime(comp: string, func: string): void {
        if (BuildSettings.isDevBuild || BuildSettings.isLocalBuild) {
            let date: Date = new Date();
            console.log(comp.toUpperCase() + ": " + func + " - " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds());
        }
    }

    public static DisplayError(errMsg: any, functionName?: string): void {
        if (BuildSettings.isDevBuild || BuildSettings.isLocalBuild) {
            try {
                console.log("ERROR: fn(" + functionName + ") ", errMsg);
            } catch (error) {
                console.log("ERROR LOGGING :" + functionName);
            }
        }
    }

    public static LogFunction(component: string, functionName: string, functionParams: any[]): void {
        if (BuildSettings.isDevBuild || BuildSettings.isLocalBuild) {
            try {
                console.log(component.toUpperCase() + " : " + functionName + " : " , functionParams);
            } catch (error) {
                console.log("ERROR LOGGING :" + component.toUpperCase() + " : " + functionName);
            }
        }
    }
}