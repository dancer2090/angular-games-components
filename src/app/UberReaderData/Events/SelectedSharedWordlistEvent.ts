import { SharedProxyWordlist } from '../DataClasses/other/SharedProxyWordlist';

import { UberApplicationEvent } from './UberApplicationEvent';

export class SelectedSharedWordlistEvent extends UberApplicationEvent
{
    public static LIST_CLICKED:string = "sharedListClicked";
    public static LIST_DOUBLE_CLICKED:string = "sharedListDoubleClicked";
    
    private _wordList:SharedProxyWordlist;
    public get WordList():SharedProxyWordlist
    {
        return this._wordList
    }
    
    constructor(type:string, wl:SharedProxyWordlist)
    {
        super(type);
        this._wordList = wl
    }
}