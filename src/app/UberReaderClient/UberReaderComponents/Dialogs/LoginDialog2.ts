import { OnInit } from '@angular/core';
import { Component, Inject, ViewChild } from '@angular/core';
import { MdlTextFieldComponent } from '@angular-mdl/core';
import { UberApplication } from '../../../UberReaderData/UberApplication';
import { StringUtils } from '../../../UberReaderData/Utils/StringUtils';
import { UserIdentificationData } from '../../../UberReaderData/DataClasses/other/UserIdentificationData';
import { UberReaderMd5 } from '../../../UberReaderData/Utils/UberReaderMd5';
import { AppSettings } from '../../../UberReaderData/AppSettings';
import { UserAuthenticatedEvent } from '../../../UberReaderData/Events/UserAuthenticatedEvent';
import { User } from '../../../UberReaderData/DataClasses/db/User';
import { ProductInfo } from '../../../UberReaderData/DataClasses/db/ProductInfo';
import { DataStorageManager } from '../../DataStorageManager';
import { StartupAuthenticationEvent } from '../../../UberReaderData/Events/StartupAuthenticationEvent';
import { UberApplicationEvent } from '../../../UberReaderData/Events/UberApplicationEvent';
import { CreateUserControl } from '../Controls/CreateUserControl';
import { ErrorMessage } from '../../../UberReaderData/Utils/ErrorMessage';

import { MessageEvent } from '../../../UberReaderData/Events/MessageEvent';
import { HeapService } from '../../../UberReaderData/Utils/Services/HeapService';
import { BuildSettings } from '../../BuildSettings';
import { School_Trial_Info } from '../../../UberReaderData/DataClasses/db/School_Trial_Info';
import { DateFormatter } from '../Controls/admin-view-controls/utils/date-formatter';
import { DevUtils } from '../../../UberReaderData/DevUtils';
import { ParentDialog } from './ParentDialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UberDataAccessRemoteService } from 'app/UberReaderData/UberDataAccess/uber-data-access-remote.service';
import { map, take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UrlLoaderService } from '../SharedModules/shared-components-module/services/UrlLoader.service';


declare var ga:Function;
declare var fbq:Function;
declare var gapi:any;
declare var gapiPromise: any;

@Component({
    selector: 'login-dialog2',
    styleUrls: ['./LoginDialog.css'],
    template: `

    <div class="{{ showLoading ? 'disableDialogOverlay' : 'hide' }}">
        <mdl-progress [indeterminate]="true"></mdl-progress>
        <div class="disableDialog"></div>
    </div>
    
  <div class="mdl-grid login-form-grid" id="loginContainer">
    <div class="mdl-cell mdl-cell--12-col login-form-cell">
      <img class="logo-img" src="{{ loginLogo | resourceLoc }}" width="100" height="46" />
      <h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">{{ forceActivate && state == LOGIN ? 'Upgrade User' : title }}</h3>

      <!-- ********************* LOGIN ********************* -->
      <div *ngIf="state == LOGIN">
     
        <div>
          <mdl-textfield type="text" label="Email or Username" #loginEmailElement [(ngModel)]="loginEmail" floating-label (keyup.enter)="signInButton_clickHandler()"
            [class.is-invalid]="!emailValid"
            disableNativeValidityChecking
            [error-msg]="emailErrorMessage"></mdl-textfield>
          <mdl-textfield type="password" label="Password" [(ngModel)]="loginPassword" floating-label (keyup.enter)="signInButton_clickHandler()"
            [class.is-invalid]="!passwordValid"
            disableNativeValidityChecking
            [error-msg]="passwordErrorMessage"></mdl-textfield>
        </div>
            <p class="mdl-typography--subhead mdl-color-text--red p-margins2">{{ errorMessage }}</p>    
            <p class="mdl-typography--subhead p-margins"><a class="login-links" (click)="changeState(RESET)">I forgot my password</a></p>
        
        <div class="mdl-dialog__actions">     
            <!--button mdl-button class="button--primary button--primary-login" (click)="signInButton_clickHandler()" mdl-button-type="raised" mdl-ripple>Login</button--> 
            <button mat-raised-button class="button--primary button--primary-login" (click)="signInButton_clickHandler()">{{ forceActivate ? 'Upgrade' : 'Login' }}</button> 
        </div>
      </div>

      <!-- ********************* END LOGIN ********************* -->
    
    
      <!-- ********************* RESET PASSWORD ********************* -->
      <div *ngIf="state == RESET">
        <p class="mdl-color-text--grey-800 p-margins">Enter your email address and a temporary password will be sent via email.</p>
        <div>
           <mdl-textfield type="text" label="Email Address" #resetEmailElement [(ngModel)]="resetPasswordEmail" floating-label (keyup.enter)="ResetPassword()"></mdl-textfield>
        </div>

        <p class="mdl-typography--subhead mdl-color-text--grey-800 p-margins2">{{ resetPasswordErrorMessage }}</p>

        <div class="mdl-dialog__actions">
          <!--button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--primary" (click)="ResetPassword()" style="margin-bottom: 10px;">Reset Password</button>
          <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" (click)="changeState(LOGIN)"><mdl-icon>arrow_back</mdl-icon> Back </button-->

          <button type="button" mat-raised-button class="button--primary" (click)="ResetPassword()" style="margin-bottom: 10px;">Reset Password</button>
          <button type="button" mat-raised-button class="button--mat-secondary" (click)="changeState(LOGIN)"><mdl-icon>arrow_back</mdl-icon> Back </button>
        </div>
      </div>
      <!-- ********************* END RESET PASSWORD ********************* -->

      <!-- ********************* RESET PASSWORD SENT ********************* -->
      <div *ngIf="state == RESET_SENT">
        <p class="mdl-color-text--grey-800 p-margins">{{resetPasswordStatus}}</p>
        <p class="mdl-color-text--grey-800 p-margins">If you do not receive and email shortly, check your junk email folder.</p>

        <div class="mdl-dialog__actions">
          <!--button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button--primary"> Resend </button>
          <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" (click)="changeState(LOGIN)"><mdl-icon>arrow_back</mdl-icon> Back </button-->
          <button type="button" mat-raised-button class="button--primary" style="margin-left: 5px;"> Resend </button>
          <button type="button" mat-raised-button class="button--mat-secondary" (click)="changeState(LOGIN)"><mdl-icon>arrow_back</mdl-icon> Back </button>
        </div>
      </div>
      <!-- ********************* END RESET PASSWORD SENT ********************* -->
    </div>
  </div>

  <div *ngIf="iframeSource != null" class='hide'>
        <iframe [src]="iframeSource | saferesourceurl" class='hide'></iframe>
  </div>
    `
})

export class LoginDialog2 extends ParentDialog implements OnInit {

    @ViewChild('loginEmailElement', { static: false }) loginEmailElement:MdlTextFieldComponent;
    @ViewChild('resetEmailElement', { static: false }) resetEmailElement:any;
    @ViewChild('createUserControl', { static: false }) createUserControl:CreateUserControl;    
    
    public static OpenScreenState: number = 0;    

    public iframeSource:string = null;
    public currentUserCreated:User;
    private EMAIL_USER:string = "Email";
    private PREAUTHENTICATED_USER:string = "PreAuthenticated";
    private userType:string = this.EMAIL_USER;

    /* dummy password variable */
    private dummyPass: string = "";
    private _hashedPass: string;

    /* variables to save/store */
    private emailToStore: string;
    private hashedPassToStore: string;

    /* login variables */
    public loginEmail: string;
    public loginPassword: string;
    public errorMessage: string;
    public emailErrorMessage: string;
    public passwordErrorMessage: string;
    public emailValid: boolean = true;
    public passwordValid: boolean = true;
    public allowSignup: boolean = true;

    /* google login variables */
    private googleUserObject:any;
    private gapi_auth2:any;
    //public displayGoogleLogin: boolean = false;

    /* clever login variables */
    public displayCleverLogin: boolean = true;

    /* sign up variables */
    public signupFullName: string;
    public signupEmail: string;
    public signupPassword: string;
    public signupVerifyPassword: string;
    public signupDescription: string;
    public termsAndConditionsLink: string;

    /* reset password variable */
    public resetPasswordEmail: string;
    public resetPasswordErrorMessage: string;
    public resetPasswordStatus: string;

    /* activation code variables */
    public activationCodeInput: string = "";
    public activationCodeInstruction: string;
    //public agreedToTermsOfService: boolean;
    public activateCodeScreenBackLink:number = 1;
    public forceActivate: boolean = false;

    private _user: User;
    private _product: ProductInfo;

    public LOGIN: number = 0;
    public SIGNUP: number = 1;
    public RESET: number = 2;
    public RESET_SENT: number = 3;
    public ACTIVATE: number = 4;

    private headerTitles:string[] = ['Login', 'Sign Up' , 'Reset Password'];

    public state: number = this.LOGIN; 
    public title: string = this.headerTitles[this.state];

    private _model:UberApplication;
    private _autoSignIn:boolean = false;
    private _autoLoginHandler:Function;
    private _existingUserActivationCode:boolean = false;    

    public showLoading:boolean = false;
    public loginLogo:string = "";
    public successCallback: () => void;
    public fromGuestLogin: boolean;

    public TYPESY:number = AppSettings.TYPESY;

    public currentProduct:number;

    constructor(
        private ar: UberDataAccessRemoteService,
        public dialogRef?: MatDialogRef<LoginDialog2>,
        @Inject(MAT_DIALOG_DATA) data?: any,
        private heapService?:HeapService,
        private urlLoaderService?:UrlLoaderService
        
    ) {
        super(dialogRef);
        DevUtils.LogFunction("LoginDialog2", "constructor", [{"Inject data": data, "AppSettings.schoolBuild": AppSettings.schoolBuild}]);

        this._model = UberApplication.GetInstance();
        this.currentProduct = BuildSettings.productId;

        this.allowSignup = true;
        this.displayCleverLogin = false;

        if(data) {
            this.changeState(<number>data.state);

            if (data.successCallback != null) {
                this.successCallback = data.successCallback;                
            }
            this.fromGuestLogin = data.fromGuestLogin;
            this.forceActivate = data.forceActivate;
        }           

        this.emailErrorMessage = this._model.GetUiTextByKey("ERR_LOGIN_NO_EMAIL_MESSAGE");
        this.passwordErrorMessage = this._model.GetUiTextByKey("ERR_LOGIN_NO_PASSWORD_MESSAGE");
        this.activationCodeInstruction = this._model.GetUiTextByKey('CREATE_USER_ACTIVATION_CODE_INSTRUCTION').replace("{0}", AppSettings.ProductName).replace('&[nl]',"\n");

        let sso = this.getQueryParameter('sso');
        let sig = this.getQueryParameter('sig');
        console.log('AppComponent AppComponent AppComponent ! ! ', sso, sig);
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
    }

    private getQueryParameter(key: string): string {
        const parameters = new URLSearchParams(window.location.search);
        return parameters.get(key);
    }

    public changeState(state:number): void {
        this.state = state;
        this.title = this.headerTitles[state];

        this.focusInputElement();
    }

    ngOnInit() {
        switch(BuildSettings.productId) {
            case AppSettings.TYPESY:
                this.loginLogo = "assets/icon/typesy-login-logo.svg";
                this.signupDescription = "Sign up and learn how to type. ";
                this.termsAndConditionsLink = "http://www.ereflect.com/terms-and-conditions.html";
                break;
        }
    }

    ngAfterViewInit():void {
        this.focusInputElement();
    }

    focusInputElement(): void {
      setTimeout(() => {
          if(this.state == this.LOGIN) {
            if (this.loginEmailElement) this.loginEmailElement.inputEl.nativeElement.focus();
          }
          else if(this.state == this.RESET) {
            this.resetEmailElement.inputEl.nativeElement.focus();
          }
          else {
            //create user control handles the focus for itself
          }
        }, 0);
    }

    /**  LOGIN  */
    public signInButton_clickHandler():void
    {
        let passCheck:string = this.dummyPass == "" ? this.loginPassword : this.dummyPass;

        this.emailValid = StringUtils.TrimString(this.loginEmail).length > 0;
        this.passwordValid = StringUtils.TrimString(passCheck).length > 0;

        if(StringUtils.TrimString(this.loginEmail).length > 0 && StringUtils.TrimString(passCheck).length > 0)
        {
            this.errorMessage = "";
            this.validateUser();
        }				
        else
        {            
            this.errorMessage = "";
        }
    }

    private validateUser(typeOfUser:string = this.EMAIL_USER):void 
    {      
        this.userType = typeOfUser;
        this.showLoading = true;
        let userData:UserIdentificationData = new UserIdentificationData();
        
        switch(this.userType) {
            case this.PREAUTHENTICATED_USER:
                userData.SetPreAuthenticatedData(DataStorageManager.GetInstance().GetDefaultAuthenticationID(), DataStorageManager.GetInstance().GetDefaultAthenticationToken());
                break;
            default:
                this._hashedPass = this.dummyPass == "" ? UberReaderMd5.hashStr(this.loginPassword) : this.dummyPass;
                this.emailToStore = this.loginEmail;
                this.hashedPassToStore = this._hashedPass;
                userData.SetEmailLoginUserData(this.loginEmail, this._hashedPass);
        }    
        DevUtils.LogFunction("LoginDialog2", "validateUser", [typeOfUser, userData]);
        this.CallValidateUser(userData);
        
    }
    private CallValidateUser(userData: UserIdentificationData) {
        if (this.forceActivate) {
            this.showLoading = false;
            this.activateCodeScreenBackLink = this.LOGIN;
            this._existingUserActivationCode = true;
            this.changeState(this.ACTIVATE);
            return;
        }

        this._model.ValidateUser(userData, AppSettings.CurrentProductId, this.validateUserResponse, this.validateUserError);  
    }

    private validateUserResponse = (event:UserAuthenticatedEvent):void => {
        if (event && event.target) {
            event.target.removeEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, this.validateUserResponse);
            event.target.removeEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, this.validateUserError);
        }        
        DevUtils.LogFunction("LoginDialog2", "validateUserResponse", [event]);
        
        //workaround for Login with Google issue
        let loginCont = document.getElementById("loginContainer");
        if (loginCont) loginCont.click();
        if (this.loginEmailElement) this.loginEmailElement.inputEl.nativeElement.focus();

        this._user = event.user;
        this._product = UberApplication.GetInstance().GetProductInfo();
        /* if (this._user.Is_trial && this._model.GetDeviceInfo().platform == 'ios') {
            this._model.showMdlAlertDialog("Trial Login is currently NOT yet supported in iPad. You may login using the web or desktop application of Typesy.", "Oops!", true);
            this.showLoading = false;
            return;
        } */

        switch(this.userType) {
            default:
                DataStorageManager.GetInstance().UpdateDefaultLogin(this.emailToStore, this.hashedPassToStore);
        }

        /** DO NOT REMOVE!
         *  this is a fix for the issue in Firefox where it keeps asking the user on every new page to remember the password 
         */
        this.loginEmail = null;
        this.loginPassword = null;
        /** END OF FIX */         
        
        this.updaterClosed();  
        // redirect to admin if the user is admin
        if(UberApplication.GetInstance().CurrentUser.Is_admin && this.urlLoaderService != null) {
            this.urlLoaderService.loginAdmin = true;
            this.urlLoaderService.OpenAdminInterface();   
        }             
    }

    validateUserError = (event:UserAuthenticatedEvent):void =>
    {
        event.target.removeEventListener(UserAuthenticatedEvent.USER_AUTHENTICATED, this.validateUserResponse);
        event.target.removeEventListener(UserAuthenticatedEvent.USER_AUTHENTICATION_FAILED, this.validateUserError);        
        DevUtils.DisplayError(event, "LoginDialog2 : validateUserError");
        
        this.showLoading = false;
        this.autoSignInError();
                
        if(this._autoSignIn) {
            return;
        }
        
        if (event.ErrorMessage == "User does not exist") {
            this.errorMessage = "Email/ Username not found - please check and try again.";
        }
        else if (event.ErrorMessage == "User does not have access to this software")
        {
            this._model.showMdlAlertDialog(event.ErrorMessage, "Oops!", true);
        }
        else if (event.ErrorMessage == "Subscription expired.") {
            this._existingUserActivationCode = true;
            this.activateCodeScreenBackLink = this.LOGIN;
            this.changeState(this.ACTIVATE);
        }
        else
        {
            this._model.showMdlAlertDialog(event.ErrorMessage, this._model.GetUiTextByKey("ERR_VALIDATE_USER_TITLE"), true);
        }
    }

    /** RESET PASSWORD */
    public ResetPassword(): void {
        let email:string = StringUtils.TrimString(this.resetPasswordEmail);
        if (email.length == 0)
        {
            this.resetPasswordErrorMessage = this._model.GetUiTextByKey("RESET_PASSWORD_ERROR_MESSAGE");
        }
        else if(!this.IsValidEmailAddress(email))
        {   
            this.resetPasswordErrorMessage = this._model.GetUiTextByKey("ERR_INVALID_EMAIL_MESSAGE");
        }
        else
        {            
            this.showLoading = true;
            this._model.ResetPassword(email, this.passwordReset, this.passwordResetError);
        }
    }

    passwordReset = (event:MessageEvent) =>
    {
        event.target.removeEventListener(MessageEvent.PASSWORD_RESET, this.passwordReset);
        event.target.removeEventListener(MessageEvent.PASSWORD_RESET_ERROR, this.passwordResetError);
        
        this.showLoading = false;
        this.autoSignInError();
        
        this.changeState(this.RESET_SENT);
        this.resetPasswordErrorMessage = "";
        this.resetPasswordStatus = "An email has been sent containing your temporary password to: " + event.Message;
    }
    passwordResetError = (event:MessageEvent) =>
    {
        event.target.removeEventListener(MessageEvent.PASSWORD_RESET, this.passwordReset);
        event.target.removeEventListener(MessageEvent.PASSWORD_RESET_ERROR, this.passwordResetError);
        
        this.showLoading = false;
        this.autoSignInError();

        if(event.Message == "User does not exist")
        {
            this.resetPasswordErrorMessage = "Email/ Username not found - please check and try again.";
        }
        else
        {
            this.resetPasswordErrorMessage = event.Message;
        }
        //AlertDialog.show(event.Message, this._model.GetUiTextByKey("RESET_PASSWORD_ERROR_TITLE"), true);
    }

    public IsValidEmailAddress(sEmail:string):boolean
    {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !(sEmail == "" || sEmail.length <= 5 || !EMAIL_REGEXP.test(sEmail));
    }

    /** GENERAL */
    public AutoSignIn(handler: (event:StartupAuthenticationEvent) => void):void {
      let defaultUserType:string = DataStorageManager.GetInstance().GetDefaultUserType();
      this._autoSignIn = true;
      this._autoLoginHandler = handler;

      DevUtils.LogFunction("LoginDialog2", "AutoSignIn", [{"defaultUserType": defaultUserType}]);

      switch (defaultUserType)
      {
        case this.EMAIL_USER:
        default:
          this.emailToStore = DataStorageManager.GetInstance().GetDefaultUser();
          this.hashedPassToStore = DataStorageManager.GetInstance().GetDefaultPassword();
                
          let userData:UserIdentificationData = new UserIdentificationData();
          userData.SetEmailLoginUserData(this.emailToStore, this.hashedPassToStore);                          
          this.CallValidateUser(userData);
          break;
      }
    }

    private autoSignInError():void
    {
        this.dispatchEvent(new UberApplicationEvent("AutoLogInFailed"));
    }

    private updaterClosed(): void {
        console.log('updaterClosed updaterClosed updaterClosed: ', this._autoSignIn);
        let userGrp = this._model.CurrentUserGroup;        
        if(userGrp == null || userGrp.length == 0) {
            this._model.storeUserGroup(this._model.getRandomUserGroup());
        }
        else {
            this._model.storeUserGroup(this._model.CurrentUserGroup);
        }
        //UberReaderLoadingMessage.GetInstance().Hide();
        this.showLoading = false;
        let startUpEvent:StartupAuthenticationEvent = new StartupAuthenticationEvent(StartupAuthenticationEvent.AUTHENTICATED, this._user, this._product);
        if(this._autoSignIn)
        {
            this._autoLoginHandler(startUpEvent);
        }
        else 
        {    
            //workaround for Login with Google issue
            let loginCont = document.getElementById("loginContainer");
            if (loginCont) loginCont.click();
            if (this.loginEmailElement) this.loginEmailElement.inputEl.nativeElement.focus();
            setTimeout(() => {
                document.body.click();
            }, 0);
            this.closeDialog(startUpEvent);
        }

        if (this.successCallback != null) {
            this.successCallback();   
        }

        let school_trial_info: School_Trial_Info = this._model.GetSchoolTrialInfo();
        if (school_trial_info) {
            this._model.showMdlAlertDialog("This is the full version, and all features are available. Your access expires on " + 
                DateFormatter.formatDate(school_trial_info.Expiry_date) + ".<br /><br />" +
                "For more help, please contact your account manager: <br />Rick Mesias <br />rick@ereflect.com", "You're Test Driving Typesy");
        }
    }

    public dispose(): void {
        this.gapi_auth2 = null;        
        //this.closeDialog();
        this.successCallback = null;
    }

    ngOnDestroy() {
        this.dispose();
    }
}