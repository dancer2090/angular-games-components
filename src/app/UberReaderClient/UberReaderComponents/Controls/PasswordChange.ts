import {Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../UberReaderData/DataClasses/db/User';
import { UberReaderMd5 } from '../../../UberReaderData/Utils/UberReaderMd5';
import { StringUtils } from '../../../UberReaderData/Utils/StringUtils';
import { VisualComponent } from '../VisualComponent';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { UserAuthenticatedEvent } from '../../../UberReaderData/Events/UserAuthenticatedEvent';
import { AppSettings } from '../../../UberReaderData/AppSettings';

@Component({
    selector: 'password-change-control',
    styleUrls: ['./PasswordChange.css'],
    template: `
    <div>
        <mdl-textfield type="password" label="Password" [(ngModel)]="password" floating-label autofocus (keyup)="PasswordChanged()" (keyup.enter)="enter()"></mdl-textfield>                
        <mdl-textfield type="password" label="Verify Password" [(ngModel)]="verifyPassword" floating-label (keyup)="VerifyPasswordChanged()" (keyup.enter)="enter()"></mdl-textfield>
    </div>
<!--
    <div *ngIf="visible">
        <div class="passwordChangeDetailContainer">
            <div class="row">                
                <input #passwordInput type="password" placeholder="Password" [(ngModel)]="password" (keyup)="PasswordChanged()" (keyup.enter)="enter()"/>
            </div>
            <div class="rowLast">                
                <input type="password" placeholder="Verify Password" [(ngModel)]="verifyPassword" (keyup)="VerifyPasswordChanged()" (keyup.enter)="enter()"/>
            </div>
        </div>
    </div>
-->
    `
})

export class PasswordChange extends VisualComponent
{
    @Input() visible:boolean = true;
    @Output() submit = new EventEmitter();

    @ViewChild("passwordInput", { static: true }) passwordInput:any;

    public password:string = "";
    public verifyPassword:string = "";

    private _hasValidated:boolean = false;
    private _user:User;

    private _pass:string;
    private _model:UberApplication = UberApplication.GetInstance();

    private _title:string = "";

    public ngAfterViewInit():void
    {
        /*setTimeout(() => {
            this.passwordInput.nativeElement.focus();
        }, 0);*/
    }

    public Init(user:User):void
    {
        this.SetUser(user);
    }

    private SetUser(userToEdit:User):void
    {
        this._user = userToEdit.Clone();
        this._pass = userToEdit.hasPassword ? "haspassword" : "";//(userToEdit.Password == null || userToEdit.Password == ""  ? "" : userToEdit.Password);
        if (this._pass != "")
        {
            this.password = "";
            this.verifyPassword = "";
        }
    }
    
    public GetUser():User
    {
        return this._user;
    }
    
    public CheckIfValidAndAssignValues():string[]
    {
        var errors:string[] = [];
        this._hasValidated = true;
        
            //Password
            if (this.password.length == 0)
            {
                errors.push(this._model.GetUiTextByKey("ERR_EMPTY_PASSWORD_MESSAGE"));
            }
            else if (this.password != this.verifyPassword)
            {
                errors.push(this._model.GetUiTextByKey("ERR_PASSWORD_MISMATCH_MESSAGE"));
            }
            else if (StringUtils.hasSpaces(this.password) && this._pass == "")
            {
                errors.push(this._model.GetUiTextByKey("ERR_PASSWORD_HAS_SPACES_MESSAGE"));
            }
            else if (this.password.length < AppSettings.PasswordMinLength) 
            {
                errors.push(this._model.GetUiTextByKey("ERR_PASSWORD_TOO_SHORT_MESSAGE"));
            }
            else if (this.password.length > AppSettings.PasswordMaxLength) 
            {
                errors.push(this._model.GetUiTextByKey("ERR_PASSWORD_TOO_LONG_MESSAGE"));
            }
            
            if (errors.length == 0)
            {
                this._user.Password = this._pass == "" ? UberReaderMd5.hashStr(this.password) : "";
            }
        
        return errors;
    }
    
    public ControlChanged():void
    {
        if (this._hasValidated)
        {
            this.CheckIfValidAndAssignValues();
        }
    }
    
    public PasswordChanged():void
    {
        if (this._pass != "")
        {
            this._pass = "";
            this.verifyPassword = "";
        }
        this.ControlChanged();
        this.validateEntries();
    } 
    
    public VerifyPasswordChanged():void
    {
        if (this._pass != "")
        {
            this._pass = "";
            this.password = "";
        }
        this.ControlChanged();
        this.validateEntries();
    }

    public validateEntries():void
    {
        var valid:number = 0;
        //pw
        if(StringUtils.TrimString(this.password).length > 0)
        {
            valid++;
        }
        
        //vpw
        if(StringUtils.TrimString(this.verifyPassword).length > 0)
        {
            valid++;
        }
        
        this.dispatchEvent(new UserAuthenticatedEvent(valid == 2 ? UserAuthenticatedEvent.VALID_USER : UserAuthenticatedEvent.INVALID_USER, null));
    }

    public enter():void
    {
        this.submit.emit();
    } 
    
    public dispose():void
    {
        this._user = null;
        this._model = null;
    }
}