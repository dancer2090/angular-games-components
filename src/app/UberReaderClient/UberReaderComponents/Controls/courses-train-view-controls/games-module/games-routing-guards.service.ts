import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { UberReader } from '../../../../UberReader';
import { Observable } from 'rxjs/Rx';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';

@Injectable()
export class GamesRouteAccessGuard implements CanActivate {
    private model: UberApplication;
    private observer: any;

    constructor(private router: Router) {
        this.model = UberApplication.GetInstance();
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        //if (this.model.hasLoggedIn) {
            if (this.model.GetUserPref("hide_play_section") == "True" && !this.model.CurrentUser.Is_admin) {
                this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                return false;
            }
            else {
                return true;
            }
        /* }
        else {
            return new Observable<boolean>(observer => {
                this.observer = observer;
                this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
                this.model.addEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
            });
        } */
    }

    canActivateChild() {
        return this.canActivate();
    }

    /* private loginComplete = (event: UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
        this.model.removeEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
        if (this.model.GetUserPref("hide_play_section") == "True" && !this.model.CurrentUser.Is_admin) {
            this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
            this.observer.next(false);
            this.observer.complete();
        }
        else {
            this.observer.next(true);
            this.observer.complete();
        }
    }

    private loginFailed = (event: UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
        this.model.removeEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
        this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
        this.observer.next(false);
        this.observer.complete();
    } */
}