import { UberApplicationEvent } from './UberApplicationEvent';
import { User } from '../DataClasses/db/User';
import { ProxyWordlist } from '../DataClasses/other/ProxyWordlist';
import { Author } from '../DataClasses/db/Author';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class UserInfoEvent extends UberApplicationEvent
{
    public static USER_INFO_RECEIVED:string = "userInfoReceived";
	public static USER_INFO_FAILED:string = "userInfoFailed";
    
    public static USER:number = 1;
    public static AUTHOR:number = 2;

    private _userType:number;
    public get User_type():number
    {
        return this._userType;
    }
    
    private _user:User;
    public get user():User
    {
        return this._user;
    }

    private _wordlists:ProxyWordlist[];
    public get Wordlists():ProxyWordlist[]
    {
        return this._wordlists;
    }

    private _author:Author;
    public get author():Author
    {
        return this._author;
    }

    private _proxyCourses:ProxyCourse[];
    public get Proxy_courses():ProxyCourse[]
    {
        return this._proxyCourses;
    }
    
    private _errMsg:string;
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    public constructor(type:string, user:User, wordlists:ProxyWordlist[], author:Author, proxyCourses:ProxyCourse[], errMsg:string="")
    {
        super(type);
        if (user != null)
        {
            this._user = user;
            this._wordlists = wordlists;
            this._userType = UserInfoEvent.USER;
        }
        else if (author != null)
        {
            this._author = author;
            this._proxyCourses = proxyCourses;
            this._userType = UserInfoEvent.AUTHOR;
        }
        
        this._errMsg = errMsg;
    }
}