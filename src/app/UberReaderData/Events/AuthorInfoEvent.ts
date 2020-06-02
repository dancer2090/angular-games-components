import { UberApplicationEvent } from './UberApplicationEvent';
import { Author } from '../DataClasses/db/Author';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class AuthorInfoEvent extends UberApplicationEvent
{
    public static AUTHOR_INFO_RECEIVED:string = "authorInfoReceived";
	public static AUTHOR_INFO_FAILED:string = "authorInfoFailed";
    
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
    
    public constructor(type:string, author:Author, proxyCourses:ProxyCourse[], errMsg:string="")
    {
        super(type);
        this._author = author;
        this._proxyCourses = proxyCourses;
        this._errMsg = errMsg;
    }
}