import { UberApplicationEvent } from './UberApplicationEvent';

export class WordSenseEvent extends UberApplicationEvent
{
    public static WORD_SENSE_INSERTED:string = "wordSenseInserted";
    public static WORD_SENSE_INSERT_ERROR:string = "wordSenseInsertError";
    public static WORD_SENSE_UPDATED:string = "wordSenseUpdated";
    public static WORD_SENSE_UPDATE_ERROR:string = "wordSenseUpdateError";
    
    public static WORD_SENSE_VALIDATION_ERROR:string = "wordSenseValidationError";
    
    private _errorMessage:string
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    private _errorData:any;
    public get ErrorData():any
    {
        return this._errorData;
    }
    
    constructor(type:string, errorMessage:string=null, errorData:any=null)
    {
        super(type);
        this._errorMessage = errorMessage;
        this._errorData = errorData;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new WordSenseEvent(this.type, this._errorMessage, this._errorData);
    }
}