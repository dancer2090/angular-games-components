import { Text } from '../DataClasses/db/Text';

import { UberApplicationEvent } from './UberApplicationEvent';

export class ImportTextDocumentEvent extends UberApplicationEvent
{
    public static TEXT_IMPORTED:string = "textImportedSuccessful";
    public static TEXT_IMPORT_FAILED:string = "textImportFailed";
    
    private _text:Text;
    public get _Text():Text
    {
        return this._text;
    }
    
    constructor(type:string, text:Text)
    {
        super(type);
        this._text = text;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new ImportTextDocumentEvent(this.type, this._text);
    }
    
}