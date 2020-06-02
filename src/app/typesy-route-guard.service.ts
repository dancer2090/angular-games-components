import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UberApplication } from './UberReaderData/UberApplication';
import { UberApplicationEventTypes } from './UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from './UberReaderData/Events/UberApplicationEvent';
import { DevUtils } from './UberReaderData/DevUtils';

@Injectable()
export class TypesyRouteGuardService implements CanLoad {
    private model: UberApplication;
    private observer: any;

    constructor(private router: Router) {
        this.model = UberApplication.GetInstance();        
    }

    canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
        console.log('TypesyRouteGuardService:: ', route);
        if (this.model.hasLoggedIn) {
            if (route.path == 'admin') {
                if (!this.model.CurrentUser.Is_admin) {
                    this.router.navigate(['/home']);
                }
                return this.model.CurrentUser.Is_admin;
            }
            else {
                return true;
            }
        }
        else {
            return new Observable<boolean>(observer => {
                //this.observer = observer;
                console.log('canLoad canLoad canLoad canLoad ELSE ELSE ELSE!');
                let loginHandler = (event: UberApplicationEvent) => {
                    this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, loginHandler);
                    this.model.removeEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, loginHandler);
                    console.log('GUARD GUARD GUARD GUARD ! ! ! ! ', event.type == UberApplicationEventTypes.AUTO_LOGIN_FAILED);
                    if (event.type == UberApplicationEventTypes.AUTO_LOGIN_FAILED) {
                        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                        observer.next(false);
                    }
                    else {
                        observer.next(true);
                    }
                    observer.complete();
                }
                this.model.addEventListener(UberApplicationEventTypes.NEW_USER, loginHandler);
                this.model.addEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, loginHandler);
            });
        }
    }
}