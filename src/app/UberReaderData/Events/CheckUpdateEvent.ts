import { UberApplicationEvent } from './UberApplicationEvent';

export class CheckUpdateEvent extends UberApplicationEvent
{
    
    public static UPDATE_DATA_RECEIVED:string = "updateDataReceived";
    public static UPDATE_DATA_ERROR:string = "updateDataError";
    
    private _version_number:string;
    public get Version_number():string
    {
        return this._version_number;
    }
    
    private _version_label:string;
    public get Version_label():string
    {
        return this._version_label;
    }
    
    private _update_url:string;
    public get Update_url():string
    {
        return this._update_url;
    }
    
    private _update_description:string;
    public get Update_description():string
    {
        return this._update_description;
    }
    
    constructor(type:string, versionNumber:string, versionLabel:string, updateUrl:string, updateDescription:string)
    {
        super(type);
        this._version_number = versionNumber;
        this._version_label = versionLabel;
        this._update_url = updateUrl;
        this._update_description = updateDescription;
    }
}