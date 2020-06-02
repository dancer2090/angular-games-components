import { Word_User } from '../DataClasses/db/Word_User';

import { UberApplicationEvent } from './UberApplicationEvent';

export class WordUserChangedEvent extends UberApplicationEvent
{
    private _wordUser:Word_User;
    public get _Word_User():Word_User
    {
        return this._wordUser;
    }
    
    public static WORD_USER_CHANGED:string = "wordUserChanged";
    
    constructor(type:string, wordUser:Word_User)
    {
        super(type);
        this._wordUser = wordUser;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordUserChangedEvent(this.type, this._wordUser);
    }
}