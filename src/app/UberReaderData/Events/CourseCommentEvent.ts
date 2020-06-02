import { UberApplicationEvent } from './UberApplicationEvent';

import { User_Comment } from '../DataClasses/db/User_Comment';

export class CourseCommentEvent extends UberApplicationEvent
{
    public static COMMENTS_LOADED:string = "commentsLoaded";
    public static COMMENTS_FAILED:string = "commentsFailed";
    
    private _errMsg:string = "";
    public get ErrorMessage():string
    {
        return this._errMsg;
    }
    
    private _numOfPages:number = 0;
    public get NumberOfPages():number
    {
        return this._numOfPages;
    }
    
    private _comments:User_Comment[];
    public get Comments():User_Comment[]
    {
        return this._comments;
    }
    
    constructor(type:string, comments:User_Comment[], numOfPages:number, errMsg:string="")
    {
        super(type);
        this._errMsg = errMsg;
        this._numOfPages = numOfPages;
        this._comments = comments;
    }
    
    public clone():UberApplicationEvent
    {
        return new CourseCommentEvent(this.type, this._comments, this._numOfPages, this._errMsg);
    }
}