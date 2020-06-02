import { Text } from '../DataClasses/db/Text';

import { UberApplicationEvent } from './UberApplicationEvent';

export class TextSyncEvent extends UberApplicationEvent
{
    public static TEXT_DATA_SYNC:string = "textDataSync";
    
    private _updatedCurrentText:Text;
    public get UpdatedCurrentText():Text
    {
        return this._updatedCurrentText;
    }
    
    private _resetText:boolean;
    public get ResetText():boolean
    {
        return this._resetText;
    }
    
    public set ResetText(value:boolean)
    {
        this._resetText = value;
    }
    
    constructor(type:string, updatedCurrentText:Text, resetText:boolean)
    {
        super(type);
        this._resetText = resetText;
        this._updatedCurrentText = updatedCurrentText;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new TextSyncEvent(this.type, this._updatedCurrentText, this._resetText);
    }
}