import { Injectable, Inject } from '@angular/core';

declare var heap:any;

@Injectable()
export class HeapService
{
    public static STN_PREVIEW_FROM_FIND: string = 'preview_from_find';

    constructor() {}

    trackEvent(name:string, properties:any)
    {
        try
        {
            heap.track(name, properties);
            var test = "asd";
        }
        catch (e)
        {

        }
    }
}