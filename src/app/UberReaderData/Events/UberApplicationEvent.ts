import { EventDispatcher } from './EventDispatcher';

export class UberApplicationEvent
{
    private _target:EventDispatcher;
    public get target():EventDispatcher
    {
        return this._target;
    }
    public set target(value:EventDispatcher)
    {
        this._target = value;
    }
    
    private _type:string;
    public get type():string
    {
        return this._type;
    }
    
    constructor(type:string)
    {
        this._type = type;
    }
}