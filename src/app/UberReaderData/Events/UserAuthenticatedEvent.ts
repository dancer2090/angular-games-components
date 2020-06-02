import { User } from '../DataClasses/db/User';

import { UberApplicationEvent } from './UberApplicationEvent';

export class UserAuthenticatedEvent extends UberApplicationEvent
{
    public static USER_AUTHENTICATED:string = "userAuthenticated";
    public static USER_AUTHENTICATION_FAILED:string = "userAuthenticationFailed";
    public static FACEBOOK_USER_AUTHENTICATED:string = "facebookUserAuthenticated";
    public static FACEBOOK_USER_AUTHENTICATION_FAILED:string = "facebookUserAuthenticationFailed";
    public static GOOGLE_USER_AUTHENTICATED:string = "googleUserAuthenticated";
    public static GOOGLE_USER_AUTHENTICATION_FAILED:string = "googleUserAuthenticationFailed";
    public static USER_UPDATED:string = "userUpdated";
    public static USER_UPDATE_FAILED:string = "userUpdateFailed";
    public static USER_DETAILS_AVAILABLE:string = "userDetailsAvailable";
    public static USER_DETAILS_UNAVAILABLE:string = "userDetailsUnavailable";
    public static USER_CREATED:string = "userCreated";
    public static USER_CREATION_FAILED:string = "userCreationFailed";
    public static FACEBOOK_USER_CREATED:string = "facebookUserCreated";
    public static FACEBOOK_USER_CREATION_FAILED:string = "facebookUserCreationFailed";
    public static GOOGLE_USER_CREATED:string = "googleUserCreated";
    public static GOOGLE_USER_CREATION_FAILED:string = "googleUserCreationFailed";
    public static ACTIVATION_CODE_USED:string = "activationCodeUsed";
    public static ACTIVATION_CODE_ERROR:string = "activationCodeError";
    
    public static VALID_USER:string = "userInfoValid";
    public static INVALID_USER:string = "userInfoInvalid";
    
    public static SIGN_OUT:string = "userSignOut";

    private _user:User;
    public get user():User
    {
        return this._user;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _link:string;
    public get Link():string
    {
        return this._link;
    }
    
    constructor(type:string, user:User, errorMessage:string=null, link:any=null)
    {
        super(type);
        this._user = user;
        this._errorMessage = errorMessage;
        
        if(link)
        {
            this._link = link.toString();
        }			
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new UserAuthenticatedEvent(this.type, this._user, this._errorMessage, this._link);
    }
}