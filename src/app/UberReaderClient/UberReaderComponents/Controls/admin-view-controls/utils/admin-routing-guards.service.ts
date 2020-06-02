import { Injectable }     from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { UberReader } from '../../../../UberReader';
import { Observable } from 'rxjs/Rx';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';

@Injectable()
export class AdminRouteAccessGuard implements CanActivate
{
    private model: UberApplication;
    private observer:any;

    constructor(private router: Router)
    {
        this.model = UberApplication.GetInstance();
    }
    
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.model.hasLoggedIn)
        {            
            if (!this.model.CurrentUser.Is_admin)
            {
                this.router.navigate(['/home']);
            }
            return this.model.CurrentUser.Is_admin;
        }
        else
        {
            /*let hasDefaultUser = UberReader.GetInstance()._dataStorageManager.HasDefaultUser();
            if(!hasDefaultUser)
            {
                this.router.navigate(['/home']);
                return false;
            }
            else
            {*/
                return new Observable<boolean>(observer =>
                {
                    this.observer = observer;
                    this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
                    this.model.addEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
                });
            //}
        }
    }

    canActivateChild() {
        return this.canActivate();
    }

    private loginComplete = (event:UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
        this.model.removeEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
        if (!this.model.CurrentUser.Is_admin)
        {
            this.router.navigate(['/home']);
        }
        this.observer.next(this.model.CurrentUser.Is_admin);
        this.observer.complete();
    }

    private loginFailed = (event:UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loginComplete);
        this.model.removeEventListener(UberApplicationEventTypes.AUTO_LOGIN_FAILED, this.loginFailed);
        this.router.navigate(['/home']);
        this.observer.next(false);
        this.observer.complete();
    }
}