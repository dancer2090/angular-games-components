import { TestData } from '../DataClasses/other/TestData';

import { UberApplicationEvent } from './UberApplicationEvent';

export class TestDataEvent extends UberApplicationEvent
{
    public static TEST_DATA_RECEIVED:string = "testDataReceived";
    public static TEST_DATA_ERROR:string = "testDataError";
    public static TEST_SELECTED:string = "testSelected";
    
    private _testData:TestData;
    public get testData():TestData
    {
        return this._testData;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, testData:TestData, errorMessage:string=null)
    {
        super(type);
        this._testData = testData;
        this._errorMessage = errorMessage;
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new TestDataEvent(this.type, this._testData, this._errorMessage);
    }
}