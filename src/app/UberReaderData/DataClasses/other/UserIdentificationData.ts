import { User } from '../db/User';
import { StringUtils } from '../../Utils/StringUtils';

export class UserIdentificationData
{
    private static EMAIL_NEW_USER_DATA:number = 0;
    private static EMAIL_LOGIN_USER_DATA:number = 1;
    private static FACEBOOK_USER_DATA:number = 2;
    private static GOOGLE_USER_DATA:number = 3;
    private static CLEVER_USER_DATA: number = 4; 
    private static PREAUTHENTICATED_DATA: number = 5;
    private static CLASSLINK_USER_DATA: number = 6;
    
    private _userType:number = -1;
    
    private _user:User;
    private _displayName:string;
    
    private _userString:string;
    private _hashedPassword:string;
    
    private _facebookUserId:string;
    private _facebookAccessToken:string;
    
    private _googleUserId:string;
    private _googleAccessToken:string;
    
    private _cleverCode:string; //holds the clever code attached to our url
    private _classlinkCode:string; //holds the clever code attached to our url
    private _redirect_uri:string; 
    private _client_id:string;
    private _authentication_user_id:number;
    private _authentication_token:string;

    public SetEmailNewUserData(user:User, displayName:string):void
    {
        this._userType = UserIdentificationData.EMAIL_NEW_USER_DATA;
        this._user = user;
        this._displayName = displayName;
    }
    
    public SetEmailLoginUserData(userString:string, hashedPassword:string):void
    {
        this._userType = UserIdentificationData.EMAIL_LOGIN_USER_DATA;
        this._userString = userString;
        this._hashedPassword = hashedPassword;
    }
    
    public SetFacebookUserData(facebookUserId:string, facebookAccessToken:string):void
    {
        this._userType = UserIdentificationData.FACEBOOK_USER_DATA;
        this._facebookUserId = facebookUserId;
        this._facebookAccessToken = facebookAccessToken;
    }
    
    public SetGoogleUserData(googleUserId:string, googleAccessToken:string):void
    {
        this._userType = UserIdentificationData.GOOGLE_USER_DATA;
        this._googleUserId = googleUserId;
        this._googleAccessToken = googleAccessToken;
    }

    public SetCleverUserData(cleverCode:string, redirectURI:string, clientID:string):void
    {
        this._userType = UserIdentificationData.CLEVER_USER_DATA;
        this._cleverCode = cleverCode;
        this._redirect_uri = redirectURI;
        this._client_id = clientID;
    }

    public SetClasslinkUserData(classlinkCode:string, redirectURI:string, clientID:string):void
    {
        this._userType = UserIdentificationData.CLASSLINK_USER_DATA;
        this._classlinkCode = classlinkCode;
        this._redirect_uri = redirectURI;
        this._client_id = clientID;
    }
    
    public SetPreAuthenticatedData(userID: number, authenticationToken: string): void 
    {
        this._userType = UserIdentificationData.PREAUTHENTICATED_DATA;
        this._authentication_user_id = userID;
        this._authentication_token = authenticationToken;
    }

    public toJson():any
    {
        var retVal:any;
        switch (this._userType)
        {
            case UserIdentificationData.EMAIL_NEW_USER_DATA:
                retVal =
                {
                    user_data_type: "EmailNew",
                    user_data: this._user.toJson(),
                    display_name: this._displayName
                };
                break;
            case UserIdentificationData.EMAIL_LOGIN_USER_DATA:
                retVal =
                {
                    user_data_type: "EmailLogin",
                    user_string: this._userString,
                    password: this._hashedPassword
                };
                break;
            case UserIdentificationData.FACEBOOK_USER_DATA:
                retVal =
                {
                    user_data_type: "Facebook",
                    facebook_user_id: this._facebookUserId,
                    facebook_access_token: this._facebookAccessToken
                };
                break;
            case UserIdentificationData.GOOGLE_USER_DATA:
                retVal =
                {
                    user_data_type: "Google",
                    google_user_id: this._googleUserId,
                    google_access_token: this._googleAccessToken
                };
                break;
            case UserIdentificationData.CLEVER_USER_DATA:
                retVal =
                {
                    user_data_type: "Clever",
                    clever_code: this._cleverCode,
                    redirect_uri: StringUtils.EncodeToJSONUri(this._redirect_uri),
                    client_id: this._client_id
                };
                break;
            case UserIdentificationData.CLASSLINK_USER_DATA:
                retVal =
                {
                    user_data_type: "Classlink",
                    classlink_code: this._classlinkCode,
                    redirect_uri: StringUtils.EncodeToJSONUri(this._redirect_uri),
                    client_id: this._client_id
                };
                break;
            case UserIdentificationData.PREAUTHENTICATED_DATA:
                retVal =
                {
                    user_data_type: "PreAuthenticated",
                    user_id: this._authentication_user_id,
                    authentication_code: this._authentication_token
                };
                break;
            default:
                throw new Error("Invalid User Data");
        }
        return retVal;
    }
}