import { UberApplicationEvent } from './UberApplicationEvent';

export class BulletClickEvent extends UberApplicationEvent
{
    public static BULLET_ITEM_CLICK:string = "homeViewBulletEvent";
    
    private _id:string;
    public get Id():string
    {
        return this._id;
    }
    
    constructor(type:string, id:string)
    {
        super(type);
        this._id = id;
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new BulletClickEvent(this.type, this._id);
    }
}