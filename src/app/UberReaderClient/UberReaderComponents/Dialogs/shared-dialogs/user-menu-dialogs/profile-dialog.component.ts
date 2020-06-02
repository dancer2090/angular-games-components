import { UberReader } from '../../../../UberReader';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReaderLoadingMessage } from '../../UberReaderLoadingMessage';
import { UserProfilePicUpdateEvent } from '../../../../../UberReaderData/Events/UserProfilePicUpdateEvent';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { User } from '../../../../../UberReaderData/DataClasses/db/User';
import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';
import { UberReaderMd5 } from '../../../../../UberReaderData/Utils/UberReaderMd5';
import { UserAuthenticatedEvent } from '../../../../../UberReaderData/Events/UserAuthenticatedEvent';
import { DataStorageManager } from '../../../../DataStorageManager';
import { MdlDialogService } from '@angular-mdl/core';
import { CreateUserControl } from '../../../Controls/CreateUserControl';
import { UserAppBgImgUpdateEvent } from '../../../../../UberReaderData/Events/UserAppBgImgUpdateEvent';
import { ExternalResourceLoaderService } from '../../../SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { ChangeBackgroundDialog } from './change-background-dialog.component';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { BuildSettings } from 'app/UberReaderClient/BuildSettings';
import { UrlLoaderService } from '../../../SharedModules/shared-components-module/services/UrlLoader.service';
import { ParentDialog } from '../../ParentDialog';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
    selector: 'profile-dialog',
    styleUrls: ['./profile-dialog.component.css'],
    templateUrl: './profile-dialog.component.html'
})
export class TypesyProfileDialog extends ParentDialog implements OnInit, OnDestroy {
    @ViewChild('profilePicSelector', { static: true }) profilePicSelector: any;    
    @ViewChild('bgImageSelector', { static: true }) bgImageSelector: any;

    private model: UberApplication;
    public user: User;
    private _pass: string;
    private defaultBackgroundImg: string = AppSettings.GetAssetLocation() + "assets/icon/default-bg.svg";
    public defaultProfilePic: string = AppSettings.GetAssetLocation() + "assets/icon/square-default-pic.svg";
    private avatarUploadSubscriber: any;

    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public userName: string = "";
    public password: string = "";
    public verifyPassword: string = "";
    public displayNameSelected: any = {};
    public displayNames: any[] = [];
    public profilePic: string;
    public appBackgroundImg: string = AppSettings.GetAssetLocation() + "assets/icon/default-bg.svg";
    public displayChangeProfPicButton: boolean = true;
    public isDetailsEditable: boolean = true;
    public isUsernameEditable: boolean = true;
    public allowedProfilePic: string = "";
    public disablePasswordChange: boolean = false;
    public allowPublicProfileAccess: boolean = true;
    public publicProfileLink: string = '';
    private profilePicChangeState: string = null;

    public firstNameValid: boolean = true;
    public lastNameValid: boolean = true;
    public userNameValid: boolean = true;
    public passwordValid: boolean = true;
    public emailValid: boolean = true;
    public usernameErrorMsg: string = "";
    public password1ErrorMsg: string = "";
    public password2ErrorMsg: string = "";
    public emailErrorMsg: string = "";
    
    //to do! values should come from server
    public typesyBgImages: any[] = [
        {displayName: 'Typesy Clouds Blue', fileName: 'default-bg.svg'},
        {displayName: 'Typesy Clouds Green', fileName: 'typesy_clouds_green.svg'},
        {displayName: 'Typesy Icon', fileName: 'typesy_icon.svg'},
        {displayName: 'Browse', fileName: ''}
    ];

    constructor(public dialogRef: MatDialogRef<TypesyProfileDialog>, private matDialog: MatDialog, private mdlDialogService:MdlDialogService,
                private externalResourceLoader: ExternalResourceLoaderService,
                private imagePicker: ImagePicker, private urlLoaderService:UrlLoaderService) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();

        this.allowPublicProfileAccess = this.model.GetUserPref("allow-access-public-profile") == 'true';
        let fullname = this.model.CurrentUser.First_name + (this.model.CurrentUser.Last_name ? '-' + this.model.CurrentUser.Last_name : '');
        if (BuildSettings.isLocalBuild) {
            this.publicProfileLink = 'localhost:3000/users/' + this.model.CurrentUser.User_id + '/' + fullname.toLowerCase();
        }
        else if (BuildSettings.isDevBuild) {            
            this.publicProfileLink = 'https://typesy.com/apps/test2/users/' + this.model.CurrentUser.User_id + '/' + fullname.toLowerCase();
        }
        else {
            this.publicProfileLink = 'https://typesy.com/type/users/' + this.model.CurrentUser.User_id + '/' + fullname.toLowerCase();
        }
    }

    ngOnInit() {
        
        this.allowedProfilePic = this.model.GetUserPref("allowed_profile_picture") != "" ? this.model.GetUserPref("allowed_profile_picture") : "Avatar or Photo";
        this.disablePasswordChange = this.model.GetUserPref("disable_password_change") == "True";
        console.log('this.disablePasswordChange::: ', this.disablePasswordChange);

        this.profilePic = this.model.CurrentUserData.ProfilePictureUrl != null ? this.model.CurrentUserData.ProfilePictureUrl : this.defaultProfilePic;
        this.appBackgroundImg = this.model.GetUserPref("background_image") != "" ? this.model.GetUserPref("background_image") : this.defaultBackgroundImg;
        
        let user: User = this.model.CurrentUser;
        this.setUser(user);

        let displayNameUserPref: string = this.model.GetUserPref("display_name") != "" ? this.model.GetUserPref("display_name") : "[First Name] [Last Name]";
        let displayNames: string[] = ["[First Name] [Last Name]", "[Last Name] [First Name]", "[First Name]", "[Last Name]", "[Username]"];
        let text: string;
        for (let displayString of displayNames) {
            text = displayString;
            if (user.First_name != null && user.First_name.length > 0) {
                text = text.replace("[First Name]", user.First_name);
            }
            if (user.Last_name != null && user.Last_name.length > 0) {
                text = text.replace("[Last Name]", user.Last_name);
            }
            if (user.Username != null && user.Username.length > 0) {
                text = text.replace("[Username]", user.Username);
            }

            let displayNameSelection: any = { value: displayString, text: text };
            this.displayNames.push(displayNameSelection);
            if (displayNameUserPref == displayString) {
                this.displayNameSelected = displayNameSelection;
            }
        }
    }

    private setUser(userToEdit: User): void {
        this.user = userToEdit.Clone();
        if(this.user.FacebookUser || this.user.GoogleUser || this.user.CleverUser || this.user.CleverUser) {
            this.isDetailsEditable = false;
            if (this.user.FacebookUser || this.user.GoogleUser)
                this.displayChangeProfPicButton = false;
            else if (this.user.CleverUser || this.user.CleverUser)
                this.isUsernameEditable = false;
        }
        this._pass = "tempPassword";
        if (userToEdit.hasPassword) {
            this.password = "      ";
            this.verifyPassword = "      ";
        }
        this.email = userToEdit.Email;
        this.userName = userToEdit.Username;
        this.firstName = userToEdit.First_name;
        this.lastName = userToEdit.Last_name;
    }

    public publicProfileAccess_clickHandler() {
        console.log('allowPublicProfileAccess: ', this.allowPublicProfileAccess);
        this.model.UpdateUserPref("allow-access-public-profile", this.allowPublicProfileAccess.toString(), true);
    }

    /* FUNCTIONS FOR USER PROFILE PIC */
    public changeProfilePicButton_clickHandler(event: MouseEvent): void {
        console.log('changeProfilePicButton_clickHandler: ', this.model.GetDeviceInfo().platform);
        if (this.model.GetDeviceInfo().platform == 'ios' || this.model.GetDeviceInfo().platform == 'android') {
            this.iOSPickProfileImage();
        }
        else {
            this.profilePicSelector.nativeElement.click();
        }
    }

    private iOSPickProfileImage() {
        let pickerOptions = {
            maximumImagesCount: 1,
            quality: 100,
            width: 200,
            height: 200,
            outputType: 1
        }
        this.imagePicker.getPictures(pickerOptions).then((results) => {
            console.log('imagePicker uri:: ', results);
            let uri = results[0];
            let dataURL = uri;
            let idx = dataURL.indexOf("base64,");
            if (idx != -1) {
                dataURL = dataURL.substr(idx + 7);
            }
            console.log('dataURL: ', dataURL);
            UberReaderLoadingMessage.GetInstance().Show("Loading.");
            this.profilePicChangeState = "Profile image uploaded";
            UberApplication.GetInstance().UpdateUserProfilePic(dataURL, this.profilePicUploaded, this.profilePicUploadError);
        }, err => console.log('errrrr: ', err));
    }

    public profilePicSelected(): void {
        var uploadSuccessFunction = this.profilePicUploaded;
        var uploadFailedFunction = this.profilePicUploadError;

        if (this.profilePicSelector.nativeElement.files && this.profilePicSelector.nativeElement.files[0]) {
            if (this.profilePicSelector.nativeElement.files[0].type.substr(0, 5) != "image") {
                setTimeout(() => {
                    this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_INVALID_IMAGE_MESSAGE"), this.model.GetUiTextByKey("ERR_INVALID_IMAGE_TITLE"), true);
                }, 0);
                return;
            }
            else {
                let reader = new FileReader();
                reader.onload = function (event) {
                    let target: any = event.target;

                    let img = document.createElement("img");
                    img.onload = function (e) {
                        if (img.height < AppSettings.profilePictureSize || img.width < AppSettings.profilePictureSize) {
                            UberApplication.GetInstance().showMdlAlertDialog(UberApplication.GetInstance().GetUiTextByKey("ERR_INVALID_IMAGE_SIZE_MESSAGE").replace(new RegExp("\\{0\\}", "g"), AppSettings.profilePictureSize.toString()), UberApplication.GetInstance().GetUiTextByKey("ERR_INVALID_IMAGE_SIZE_TITLE"), true);
                            return;
                        }
                        else {
                            let canvas = document.createElement("canvas");
                            let ctx = canvas.getContext("2d");
                            let dataURL;
                            canvas.width = 200;
                            canvas.height = 200;
                            if (img.width == img.height) {
                                ctx.drawImage(img, 0, 0, 200, 200);
                            }
                            else if (img.width < img.height) {
                                var offset = (img.height - img.width) / 2;

                                ctx.drawImage(img, 0, offset, img.width, img.width, 0, 0, 200, 200);
                            }
                            else {
                                var offset = (img.width - img.height) / 2;

                                ctx.drawImage(img, offset, 0, img.height, img.height, 0, 0, 200, 200);
                            }

                            dataURL = canvas.toDataURL('image/jpeg');
                            dataURL = dataURL.substr(dataURL.indexOf("base64,") + 7);
                            UberReaderLoadingMessage.GetInstance().Show("Loading.");
                            UberApplication.GetInstance().UpdateUserProfilePic(dataURL, uploadSuccessFunction, uploadFailedFunction);
                        }
                    }
                    img.src = target.result;
                }
                this.profilePicChangeState = "Profile image uploaded";
                reader.readAsDataURL(this.profilePicSelector.nativeElement.files[0]);
            }
        }
    }

    private profilePicUploaded = (event: UserProfilePicUpdateEvent) => {
        event.target.removeEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATED, this.profilePicUploaded);
        event.target.removeEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATE_ERROR, this.profilePicUploadError);       
        
        let profilePicUrl: string = event.ProfilePicUrl;
        this.model.CurrentUser.Profile_pic = profilePicUrl;

        this.model.CurrentUserData.RefreshProfilePic();
        UberReader.GetInstance().UserProfileUpdated();
        if (this.model.CurrentUserData.ProfilePictureUrl != null) {
            this.profilePic = this.model.CurrentUserData.ProfilePictureUrl;
        }
        else {
            this.profilePic = this.defaultProfilePic;
        }
        //this.model.addEventListener(UberApplicationEventTypes.PROFILE_PIC_LOADED, this.UpdateProfilePic);        
    }
    
    private profilePicUploadError = (event: UserProfilePicUpdateEvent) => {
        event.target.removeEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATED, this.profilePicUploaded);
        event.target.removeEventListener(UserProfilePicUpdateEvent.PROFILE_PIC_UPDATE_ERROR, this.profilePicUploadError);

        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"), true);
    }

    public UpdateProfilePic = (event: UberApplicationEvent = null) => {
        this.model.removeEventListener(UberApplicationEventTypes.PROFILE_PIC_LOADED, this.UpdateProfilePic);
        if (this.model.CurrentUserData.ProfilePictureUrl != null) {
            this.profilePic = this.model.CurrentUserData.ProfilePictureUrl;
        }
    }
    /* END LINE FOR FUNCTIONS FOR USER PROFILE PIC */

    /* FUNCTIONS FOR USER BACKGROUND IMAGE */
    public changeBgImage(event: MouseEvent): void {
        this.bgImageSelector.nativeElement.click();
    }

    public bgImageSelected(): void {
        var uploadSuccessFunction = this.bgImageUploaded;
        var uploadFailedFunction = this.bgImageUploadError;
        if (this.bgImageSelector.nativeElement.files && this.bgImageSelector.nativeElement.files[0]) {
            if (this.bgImageSelector.nativeElement.files[0].type.substr(0, 5) != "image") {
                setTimeout(() => {
                    this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_INVALID_IMAGE_MESSAGE"), this.model.GetUiTextByKey("ERR_INVALID_IMAGE_TITLE"), true);
                }, 0);
                return;
            }
            else {
                let fileName = this.bgImageSelector.nativeElement.files[0].name;
                let reader = new FileReader();
                reader.onload = function (event) {
                    let target: any = event.target;                    
                    let dataURL:string = target.result;
                    dataURL = dataURL.substr(dataURL.indexOf("base64,") + 7);
                    UberReaderLoadingMessage.GetInstance().Show("Loading.");
                    UberApplication.GetInstance().UpdateUserAppBackgroundImg(dataURL, fileName, uploadSuccessFunction, uploadFailedFunction);
                }
                reader.readAsDataURL(this.bgImageSelector.nativeElement.files[0]);
            }
        }
    }

    private bgImageUploaded = (event: UserAppBgImgUpdateEvent) => {
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, this.bgImageUploaded);
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, this.bgImageUploadError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.appBackgroundImg = event.BgImageUrl;
        this.model.UpdateUserPref(event.BgImageUserPref.Key, event.BgImageUrl, true);
        UberReader.GetInstance().UpdateAppBackground();
    }
    
    private bgImageUploadError = (event: UserAppBgImgUpdateEvent) => {
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATED, this.bgImageUploaded);
        event.target.removeEventListener(UserAppBgImgUpdateEvent.BG_IMG_UPDATE_ERROR, this.bgImageUploadError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"), true);
    }

    public bgImageSelectedFromDefaults(imageURL: string): void {
        if(imageURL == '') {
            this.changeBgImage(null);
            return;
        }
        this.appBackgroundImg = AppSettings.GetAssetLocation() + "assets/icon/" + imageURL;
        this.model.UpdateUserPref("background_image", this.appBackgroundImg, true);
        UberReader.GetInstance().UpdateAppBackground();
    }

    public openChangeBgDialog(): void {
        /* let changeBGDialog = this.mdlDialogService.showCustomDialog({
            component: ChangeBackgroundDialog,
            isModal: true,
            clickOutsideToClose: false,
            styles: {'width': '480px'}
        }); */

        const changeBGDialog = this.matDialog.open(ChangeBackgroundDialog, {
            disableClose: true,
            width: '520px'
        });

        changeBGDialog.afterClosed().subscribe((selectedBG) => {
            if(selectedBG) this.appBackgroundImg = selectedBG;
        });

        /* changeBGDialog.subscribe((dialogRef) => {
            dialogRef.onHide().subscribe((selectedBG) => {
                if(selectedBG) this.appBackgroundImg = selectedBG;
            });
        }); */
    }
    /* END LINE FOR FUNCTIONS FOR USER BACKGROUND IMAGE */

    public setDisplayName(name: any): void {
        this.displayNameSelected = name;
    }

    public save(): void {
        if (this.checkIfValidAndAssignValues())
        {
            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_UPDATING_USER"));
            this.model.UpdateUserDetails(this.user, this.userUpdated, this.userUpdateError);
            this.model.UpdateUserPref("display_name", this.displayNameSelected.value, false);
        }
    }

    private userUpdated = (event: UserAuthenticatedEvent) => {
        event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATED, this.userUpdated);
        event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATE_FAILED, this.userUpdateError);

        UberReaderLoadingMessage.GetInstance().Hide();
        DataStorageManager.GetInstance().RemoveDefaultLogin(false);

        let user: User = event.user;
        if (user.User_id == this.model.CurrentUser.User_id) {
            if(this.model.CurrentUser.FacebookUser || this.model.CurrentUser.GoogleUser || this.model.CurrentUser.CleverUser || this.model.CurrentUser.ClasslinkUser) {
                user.FacebookUser = this.model.CurrentUser.FacebookUser;
                user.GoogleUser = this.model.CurrentUser.GoogleUser;
                user.CleverUser = this.model.CurrentUser.CleverUser;
                user.ClasslinkUser = this.model.CurrentUser.ClasslinkUser;
                user.First_name = this.model.CurrentUser.First_name;
                user.Last_name = this.model.CurrentUser.Last_name;
            }
            this.model.CurrentUser = user;
        }
        this.closeDialog();
    }

    private userUpdateError = (event: UserAuthenticatedEvent) => {
        event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATED, this.userUpdated);
        event.target.removeEventListener(UserAuthenticatedEvent.USER_UPDATE_FAILED, this.userUpdateError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(event.ErrorMessage, this.model.GetUiTextByKey("ERR_UPDATE_EDIT_USER_TITLE"), true);
    }

    public checkIfValidAndAssignValues(): boolean {
        this.emailValid = true;
        this.userNameValid = true;
        this.passwordValid = true;
        this.firstNameValid = true;
        this.lastNameValid = true;
        
        if (!this.user.FacebookUser && !this.user.GoogleUser && !this.user.CleverUser && !this.user.ClasslinkUser) {
            this.firstName = StringUtils.TrimString(this.firstName);
            this.firstNameValid = this.firstName.length > 0;
            
            this.lastName = StringUtils.TrimString(this.lastName);
            this.lastNameValid = this.lastName.length > 0;


            if (!UberApplication.GetInstance().CurrentProduct.DisplayQuestion) {
                this.email = StringUtils.TrimString(this.email);
                this.userName = StringUtils.TrimString(this.userName);
                if (this.email.length > 0) {
                    if (!CreateUserControl.IsValidEmailAddress(this.email)) {
                        this.emailErrorMsg = "Invalid email";
                        this.emailValid = false;
                    }
                }
                else if (this.userName.length == 0)
                {
                    this.emailErrorMsg = this.usernameErrorMsg = "User must have a username or email";
                    this.emailValid = this.userNameValid = false;
                }

                if (this.userName.indexOf(" ") != -1 || this.userName.indexOf("@") != -1) {
                    this.usernameErrorMsg = "Username cannot contain space or '@'";
                    this.userNameValid = false;
                }
            }

            if(this._pass == "") { //if user changed the password/verify password field
                if (this.password.length == 0) {
                    this.password1ErrorMsg = "User must have a password";
                    this.password2ErrorMsg = "";
                    this.passwordValid = false;
                }
                else if (this.password != this.verifyPassword) {
                    this.password1ErrorMsg = this.password2ErrorMsg = "Passwords don't match";
                    this.passwordValid = false;
                } 
                else if (StringUtils.hasSpaces(this.password)) {
                    this.password1ErrorMsg = this.model.GetUiTextByKey("ERR_PASSWORD_HAS_SPACES_MESSAGE");
                    this.password2ErrorMsg = "";
                    this.passwordValid = false;
                }
                else if (this.password.length < AppSettings.PasswordMinLength) {
                    this.password1ErrorMsg = this.model.GetUiTextByKey("ERR_PASSWORD_TOO_SHORT_MESSAGE");
                    this.password2ErrorMsg = "";
                    this.passwordValid = false;
                }
                else if (this.password.length > AppSettings.PasswordMaxLength) {
                    this.password1ErrorMsg = this.model.GetUiTextByKey("ERR_PASSWORD_TOO_LONG_MESSAGE");
                    this.password2ErrorMsg = "";
                    this.passwordValid = false;
                }
            }
        }
        else
        {
            if (!this.model.CurrentProduct.DisplayQuestion && !this.user.CleverUser && !this.user.ClasslinkUser) {
                if (this.userName.indexOf(" ") != -1 || this.userName.indexOf("@") != -1) {
                    this.usernameErrorMsg = "Username cannot contain space or '@'";
                    this.userNameValid = false;
                }
            }
            this.user.Password = "";
        }

        let isValid = this.firstNameValid && this.lastNameValid && this.emailValid && this.userNameValid && this.passwordValid;
        if (isValid) {
            //_user.Email = textBoxCreateEmail.text;
            this.user.First_name = this.firstName;
            this.user.Last_name = this.lastName;
            this.user.Email = this.email;
            this.user.Username = this.userName;
            this.user.Password = this._pass == "" ? UberReaderMd5.hashStr(this.password) : "";
        }

        return isValid;
    }

    public textBox_TextChanged(): void {
        for (let selection of this.displayNames) {
            let text: string = selection.value;
            if (this.firstName && this.firstName.length > 0) {
                text = text.replace("[First Name]", this.firstName);
            }
            if (this.lastName && this.lastName.length > 0) {
                text = text.replace("[Last Name]", this.lastName);
            }
            if (this.userName && this.userName.length > 0) {
                text = text.replace("[Username]", this.userName);
            }
            selection.text = text;
        }
    }

    public passwordChanged(field:string): void {
        if (this._pass != "") {
            this._pass = "";
            if(field == "verify") {
                this.password = "";
            }
            else {
                this.verifyPassword = "";
            }
        }
    }

    public onFocusPassword(field:string): void {
        if (this._pass != "") {
            if(field == "verify") {
                this.verifyPassword = "";
            }
            else {
                this.password = "";
            }
        }
    }

    public onBlurPassword(field:string): void {
        if (this._pass != "") {
            if(field == "verify") {
                this.verifyPassword = "      ";
            }
            else {
                this.password = "      ";
            }
        }
    }

    public openAvatarBuilder(event: MouseEvent): void {
        
    }

    public deleteProfilePic(): void {
        this.profilePicChangeState = "Profile image deleted";
        this.model.UpdateUserProfilePic(null, this.profilePicUploaded, this.profilePicUploadError);
    }

    public viewPublicProfile_clickHandler() {        
        this.urlLoaderService.OpenUrlNewWindow(this.publicProfileLink);
    }

    public dispose(): void { }

    ngOnDestroy() {
        if(this.avatarUploadSubscriber) this.avatarUploadSubscriber.unsubscribe();
    }
}