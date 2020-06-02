import { Input } from '@angular/core';
import { EventDispatcher } from '../../UberReaderData/Events/EventDispatcher';
import { AppSettings } from '../../UberReaderData/AppSettings';

export abstract class VisualComponent extends EventDispatcher
{
    //public useDistributionFolder:boolean = AppSettings.useDistributionFolder;
    constructor()
    {
        super();
    }

    //abstract dispose():void;

    //@Input() visible:boolean = true;
}