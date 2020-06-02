import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from '../../../UberReaderData/DataClasses/db/User';
import { UberReaderMd5 } from '../../../UberReaderData/Utils/UberReaderMd5';
import { StringUtils } from '../../../UberReaderData/Utils/StringUtils';
import { VisualComponent } from '../VisualComponent';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { UserAuthenticatedEvent } from '../../../UberReaderData/Events/UserAuthenticatedEvent';
import { AppSettings } from '../../../UberReaderData/AppSettings';

@Component({
    selector: 'create-user-control',
    styleUrls: ['./CreateUserControl.css'],
    template: `
    <div class="fields-container">
      <div class="row">
        <mdl-textfield type="text" label="Full Name" [class.is-invalid]="!nameValid" [(ngModel)]="fullName" required disableNativeValidityChecking
            floating-label error-msg="Please enter name" #userFullName (keyup.enter)="createUser(userFullName)"></mdl-textfield>
        <mdl-textfield type="text" label="Email" [class.is-invalid]="!emailValid" [(ngModel)]="email" required disableNativeValidityChecking
            floating-label [error-msg]="emailErrorMsg" #userEmail (keyup.enter)="createUser(userEmail)"></mdl-textfield>
      </div>  
      <div class="row">
        <mdl-textfield type="password" label="Password" [class.is-invalid]="!passwordValid" [(ngModel)]="password" disableNativeValidityChecking
            floating-label floating-label [error-msg]="password1ErrorMsg" #userPassword (keyup.enter)="createUser(userPassword)"></mdl-textfield>
        <mdl-textfield type="password" label="Verify Password" [class.is-invalid]="!passwordValid" [(ngModel)]="verifyPassword" disableNativeValidityChecking
            floating-label floating-label [error-msg]="password2ErrorMsg" #userVerifyPassword (keyup.enter)="createUser(userVerifyPassword)"></mdl-textfield>
      </div>
    </div>
    `
})

export class CreateUserControl extends VisualComponent
{
    @ViewChild('userFullName', { static: true }) userFullName:any;
    @Output() validateUser = new EventEmitter();

    public visible:boolean = true;

    public fullName:string = "";
    public email:string = "";
    public password:string = "";
    public verifyPassword:string = "";

    private _user:User;

    private _pass:string = "";

    public nameValid: boolean = true;
    public passwordValid: boolean = true;
    public emailValid: boolean = true;
    public password1ErrorMsg: string = "";
    public password2ErrorMsg: string = "";
    public emailErrorMsg: string = "";

    private _model:UberApplication = UberApplication.GetInstance();

    constructor() {
        super();
        this._user = new User();
    }

    public ngAfterViewInit():void {
        setTimeout(() => {
            this.userFullName.inputEl.nativeElement.focus();
        }, 0);
    }

    public Init(user:User, creatingNew:boolean):void
    {
        //this._creatingNew = creatingNew;
        //this.SetUser(user);
    }

    private SetUser():void
    {
        this._pass =  "";
        if (this._pass != "")
        {
            this.password = "      ";
            this.verifyPassword = "      ";
        }
        else
        {
            this.password = "";
            this.verifyPassword = "";
        }
        this.email = "";
        this.fullName = "";
    }
    
    public GetUser():User
    {
        return this._user;
    }
    
    public GetDisplayName():string
    {
        return "[First Name]";
    }
    
    public CheckIfValidAndAssignValues():boolean
    {
        this.nameValid = true;
        this.passwordValid = true;
        this.emailValid = true;
        
        //First name
        this.fullName = StringUtils.TrimString(this.fullName);
        this.nameValid = this.fullName.length > 0;
        
        //Email
        var tempEmail:string = StringUtils.TrimString(this.email);
        if (tempEmail.length == 0)
        {
            this.emailErrorMsg = "Please enter an email";
            this.emailValid = false;
        }
        else if(!CreateUserControl.IsValidEmailAddress(tempEmail))
        {
            this.emailErrorMsg = "Invalid email";
            this.emailValid = false;
        }
        
        //Password
        if (this.password.length == 0)
        {
            this.password1ErrorMsg = "User must have a password";
            this.password2ErrorMsg = "";
            this.passwordValid = false;
        }
        else if (this.password != this.verifyPassword)
        {
            this.password1ErrorMsg = this.password2ErrorMsg = "Passwords don't match";
            this.passwordValid = false;
        }
        else if (StringUtils.hasSpaces(this.password) && this._pass == "")
        {
            this.password1ErrorMsg = this._model.GetUiTextByKey("ERR_PASSWORD_HAS_SPACES_MESSAGE");
            this.password2ErrorMsg = "";
            this.passwordValid = false;
        }
        else if (this.password.length < AppSettings.PasswordMinLength) 
        {
            this.password1ErrorMsg = this._model.GetUiTextByKey("ERR_PASSWORD_TOO_SHORT_MESSAGE");
            this.password2ErrorMsg = "";
            this.passwordValid = false;
        }
        else if (this.password.length > AppSettings.PasswordMaxLength) 
        {
            this.password1ErrorMsg = this._model.GetUiTextByKey("ERR_PASSWORD_TOO_LONG_MESSAGE");
            this.password2ErrorMsg = "";
            this.passwordValid = false;
        }

        let isValid = this.nameValid && this.emailValid && this.passwordValid;
        if (isValid)
        {
            // SPLIT INTO FIRST AND LAST NAMES
            var splitNames = this.fullName.split(/\s+/g);
            this._user.First_name = splitNames.shift();
            if (splitNames.length > 0)
            {
                this._user.Last_name = splitNames.join(" ");
            }
            this._user.Email = tempEmail;
            this._user.Password = this._pass == "" ? UberReaderMd5.hashStr(this.password) : "";
        }

        return isValid;
    }
    
    public static IsValidEmailAddress(sEmail:string):boolean
    {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !(sEmail == "" || sEmail.length <= 5 || !EMAIL_REGEXP.test(sEmail));
       
    }

    public dispose():void
    {
        this._user = null;
        this._model = null;
    }
 
    public createUser(el:any):void
    {
        if(el)
        {
            el.inputEl.nativeElement.blur();
        }
        this.validateUser.emit();
    }
}