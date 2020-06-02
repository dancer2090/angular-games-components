import { Group } from '../DataClasses/db/Group';
import { Group_Shared_Object } from '../DataClasses/other/Group_Shared_Object';
import { User_Shared_Object } from '../DataClasses/other/User_Shared_Object';

import { UberApplicationEvent } from './UberApplicationEvent';

export class WordlistShareSettingsEvent extends UberApplicationEvent
{
    public static WORDLIST_SHARE_SETTINGS_SUCCESS:string = "wordlistShareSettingsReceived";
    public static WORDLIST_SHARE_SETTINGS_ERROR:string = "wordlistShareSettingsError";
    
    public static WORDLIST_SHARE_SUCCESS:string = "wordlistShareSuccess";
    public static WORDLIST_SHARE_ERROR:string = "wordlistShareError";
    
    private _wordlist_id:number;
    public get Wordlist_id():number
    {
        return this._wordlist_id;
    }
    
    private _usersShared:User_Shared_Object[];
    public get Users_shared():User_Shared_Object[]
    {
        return this._usersShared;
    }
    
    private _groupsShared:Group_Shared_Object[];
    public get Groups_shared():Group_Shared_Object[]
    {
        return this._groupsShared;
    }
    
    private _groupsCanShareWith:Group[];
    public get Groups_can_share_with():Group[]
    {
        return this._groupsCanShareWith;
    }
    
    private _userShareErrors:string[];
    public get User_share_errors():string[]
    {
        return this._userShareErrors;
    }
    
    // private _groupShareErrors:Dictionary;
    // public get Group_share_errors():Dictionary
    // {
    //     return this._groupShareErrors;
    // }
    
    private _errorMessage:string;
    public get Error_message():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, wordlistId:number,
                                                usersShared:User_Shared_Object[],
                                                groupsShared:Group_Shared_Object[],
                                                groupsCanShareWith:Group[],
                                                errorMessage:string = null,
                                                userShareErrors:string[] = null)
                                                //groupShareErrors:Dictionary=null)
    {
        super(type);
        this._wordlist_id = wordlistId;
        this._errorMessage = errorMessage;
        this._usersShared = usersShared;
        this._groupsShared = groupsShared;
        this._groupsCanShareWith = groupsCanShareWith;
        this._userShareErrors = userShareErrors;
        //this._groupShareErrors = groupShareErrors;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordlistShareSettingsEvent(this.type, this._wordlist_id, this._usersShared, this._groupsShared, this._groupsCanShareWith, this._errorMessage, this._userShareErrors/*, this._groupShareErrors*/);
    }
}