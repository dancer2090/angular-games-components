import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppSettings } from 'app/UberReaderData/AppSettings';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { DevUtils } from 'app/UberReaderData/DevUtils';

@Component({
    selector: 'typesy-redirect',
    template: ``
})
export class TypesyRedirectComponent implements OnInit, OnDestroy {    
    private queryParamsObservable:any;

    constructor(private route:ActivatedRoute, private router:Router) {}

    ngOnInit() {    
        this.queryParamsObservable = this.route.queryParams
            .subscribe( (queryParams: Params) => {
                    /* if (window.location.href.indexOf("zoho.com") != -1) {
                        let zohoDeskCode: string = queryParams['code'];
                        if (zohoDeskCode) {
                            console.log("HOME ZOHO DESK CODE ", zohoDeskCode);
                            UberApplication.GetInstance().CurrentZohoDeskCode = zohoDeskCode;
                            this.router.navigate([ { outlets: { recommendOutlet: null, primary: ['admin', 'support'] } } ]);
                            return;
                        } 
                    } */
                    let login_type: string = queryParams['login_type'];
                    let code: string = queryParams['code'];
                    let link: string = queryParams['navigate'];
                    let trialkey: string = queryParams['trialkey'];
                    DevUtils.LogFunction("TypesyRedirectComponent", "ngOnInit : login_type : code : link", [login_type, code, link, trialkey]);
                    
                    if (trialkey) {
                        AppSettings.TrialEnabled = true;
                        AppSettings.TrialKey = trialkey;
                    }
                    
                    let sso = queryParams['sso'];
                    let sig = queryParams['sig'];
                    if (sso && sig) {
                        let ssob64 = atob(decodeURIComponent(sso));
                        let urlSearchParams = new URLSearchParams('?' + ssob64);
                        let return_sso_url = decodeURIComponent(urlSearchParams.get('return_sso_url'));
                        UberApplication.GetInstance().SSO = sso;
                        UberApplication.GetInstance().Sig = sig;
                        UberApplication.GetInstance().Return_sso_url = return_sso_url;
                        console.log({sso}, {sig});        
                        console.log({ssob64}, {return_sso_url});
                    }                
                    
                    console.log('TYPESY REDIRECT LINK : ', link || 'home');
                    //setTimeout(() => {
                        this.router.navigate([{outlets: {recommendOutlet: null, primary: link || 'home'}}]);
                    //}, 3000);
                }
            );
    }

    ngOnDestroy() {
        if(this.queryParamsObservable) this.queryParamsObservable.unsubscribe();
    }
}