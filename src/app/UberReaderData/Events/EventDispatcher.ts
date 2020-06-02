import { UberApplicationEvent } from './UberApplicationEvent';

export interface IEventDispatcher
{
    // maintain a list of listeners
    addEventListener(type:string, listener:(event:UberApplicationEvent) => void):void;

    // remove a listener
    removeEventListener(type:string, listener:(event:UberApplicationEvent) => void):void;

    // remove all listeners
    removeAllListeners();

    // send event to a handler
    dispatchEvent(event:UberApplicationEvent);
}

export class EventDispatcher// implements IEventDispatcher
{
    private _eventHandlers = {};
    private _target:EventDispatcher;
    
    constructor(target:EventDispatcher = null)
    {
        if (target == null)
        {
            this._target = this;
        }
        else
        {
            this._target = target;
        }
    }
    
    // maintain a list of listeners
    public addEventListener(type:string, listener:(event:UberApplicationEvent) => void):void
    {
        let theHandlers:Function[] = this._eventHandlers[type] || [];
        if (theHandlers.indexOf(listener) == -1)
        {
            theHandlers.push(listener);
            this._eventHandlers[type] = theHandlers;
        }
    }

    // remove a listener
    removeEventListener(type:string, listener:(event:UberApplicationEvent) => void)
    {
        let theHandlers:Function[] = this._eventHandlers[type];
        if (theHandlers)
        {
            let listenerIndex:number = theHandlers.indexOf(listener);
            if (listenerIndex >= 0)
            {
                theHandlers.splice(listenerIndex, 1);
                this._eventHandlers[type] = theHandlers;
            }
        }
    }

    // remove all listeners
    removeAllListeners()
    {
        this._eventHandlers = {};
    }
    
    dispatchEvent(event:UberApplicationEvent)
    {
        event.target = this._target;
        let theHandlers = this._eventHandlers[event.type];       
        let functionsToCall:Function[] = [];
        if (theHandlers)
        {
            for(let i = 0; i < theHandlers.length; i += 1)
            {
                functionsToCall.push(theHandlers[i]);
            }

            while(functionsToCall.length > 0)
            {
                functionsToCall.pop()(event);
            }
        }
    }

    redispatchEvent = (event:UberApplicationEvent) =>
    {
        this.dispatchEvent(event);
    }
}