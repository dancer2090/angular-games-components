import { ProductInfo } from '../DataClasses/db/ProductInfo';
import { User } from '../DataClasses/db/User';

import { UberApplicationEvent } from './UberApplicationEvent';

export class StartupAuthenticationEvent extends UberApplicationEvent
{
    public static AUTHENTICATED:string = "authenticated";
    public static AUTHENTICATION_FAILED:string = "authenticationFailed";
    
    private _user:User;
    public get user():User
    {
        return this._user;
    }
    
    private _product:ProductInfo;
    public get product():ProductInfo
    {
        return this._product;
    }
    
    constructor(type:string, user:User, product:ProductInfo)
    {
        super(type);
        this._user = user;
        this._product = product;
    }
}