import { Injectable } from '@angular/core';
import { BuildSettings } from '../../../../BuildSettings';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { UberReader } from '../../../../UberReader';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';
import { Router } from '@angular/router';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';

@Injectable()
export class UrlLoaderService {

    constructor(private router: Router) {}
    public loginAdmin:boolean = false;
    public OpenAdminInterface()
    {
        if (BuildSettings.DeviceDebugType == AppSettings.IPAD_ANGULAR || BuildSettings.DeviceDebugType == AppSettings.ANDROID_ANGULAR) {
            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'admin'}}]);
        }
        else {
            var baseApp:string = "";
            if (BuildSettings.isLocalBuild) {
                baseApp = "http://localhost:3000/";
            }
            else if (BuildSettings.isDevBuild) {
                baseApp = "https://typesy.com/apps/test2/";
            }
            else {
                baseApp = "https://typesy.com/type/";
            }
            var url = baseApp += (UberApplication.GetInstance().CurrentUser.CleverUser ? "edu/?navigate=admin" : "admin/home");
            
            if(this.loginAdmin){
                window.open(url, "_self");
                this.loginAdmin = false;
            }
            else{
                window.open(url, "_blank");
            }
        }
    }

    public OpenMainApp(inNewTab: boolean = false)
    {       
        if (inNewTab) {
            let url:string = "";
            if (BuildSettings.isLocalBuild) {
                url = "http://localhost:3000/home";
            }
            else if (BuildSettings.isDevBuild) {
                url = "https://typesy.com/apps/test2/home";
            }
            else {
                url = "https://typesy.com/type/home";
            }
            window.open(url, "_blank");
        }
        else {
            UberReader.GetInstance().SwitchScreenState(ScreenState.DEFAULT_VIEW);
        }
    }
    
    //opens an external url in a default browser if running in electorn or in a new tab if runnign web app
	public OpenUrlNewWindow(url:string) {
        window.open(url, '_blank');
	}
}