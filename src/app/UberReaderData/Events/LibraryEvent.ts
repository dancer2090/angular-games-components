import { UberApplicationEvent } from './UberApplicationEvent';

export class LibraryEvent extends UberApplicationEvent
{
    public static READ:string = "readText";
    public static DELETE:string = "deleteText";
    public static LOCATION:string = "locationText";
    public static PREVIEW:string = "previewText";
    public static EDIT:string = "editText";
    public static SHARE:string = "shareText";	
    public static UPGRADE:string = "upgradeApp";
    public static REMOVE:string = "removeText";
    
    constructor(type:string)
    {
        super(type);
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new LibraryEvent(this.type);
    }
    
}