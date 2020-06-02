import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { VisualComponent } from '../../VisualComponent';
import { AppSettings } from '../../../../UberReaderData/AppSettings';
import { UberApplication } from '../../../../UberReaderData/UberApplication';

@Component({
    selector: 'trial-login',
    template:`
<div>

</div>
`
})

export class TrialLogin extends VisualComponent implements OnDestroy
{
    private model:UberApplication;
    private queryParamsObservable:any;

    constructor(private router: Router, private route:ActivatedRoute)
    {
        super();
        this.model = UberApplication.GetInstance();

        AppSettings.TrialEnabled = true;
        AppSettings.TrialKey = "TYPESYTRIAL1";

        if(this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
        this.queryParamsObservable = this.route.queryParams
            .subscribe( (queryParams: Params) => {
                    let link: string = queryParams['navigate'];
                    let cleverCode: string = queryParams['code'];

                    if(cleverCode) {
                        this.model.CurrentCleverCode = cleverCode;
                        console.log("TRIAL LOGIN CLEVER CODE ", cleverCode);
                    }

                    switch(link) {                            
                        case 'courses':
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'courses'}}]);
                            break;
                        case 'play':
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'play'}}]);
                            break;
                        case 'admin':
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'admin'}}]);
                            break;
                        case 'stats':
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'stats'}}]);
                            break;
                        case 'hall-of-fame':
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'hall-of-fame'}}]);
                            break;
                        default: 
                            console.log("GOING TO HOME");
                            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                    }
                }
            );
    }

    /*ngAfterViewInit()
    {
        if(this.model.hasLoggedIn)
        {
            this.Init();
        }
        else
        {   
            this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        }
    }

    private loggedIn = (event:UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        this.Init();
    }

    private Init():void
	{
        this.router.navigate(['/home']);
	    //UberReader.GetInstance().SwitchScreenState(ScreenState.DEFAULT_VIEW);
	}*/
    
    ngOnDestroy() {
        if(this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
    }
}