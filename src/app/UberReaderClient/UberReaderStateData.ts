import { EventDispatcher } from '../UberReaderData/Events/EventDispatcher';
import { AppSettings } from '../UberReaderData/AppSettings';
import { UberApplication } from '../UberReaderData/UberApplication';
import { StringUtils } from '../UberReaderData/Utils/StringUtils';
import { DictionaryString } from '../UberReaderData/Utils/Dictionary';

/**
 * This singleton class will be used to save the session variables
 */

export class UberReaderStateData
{
    //public courseInfoReturnScreenState:number = null; //what screen state to return when in course info

    public currentUberReaderScreenState:number = null;
    //public currentCourseWebUrl:string = null;
    public currentCourseInfoCourseId:number = -1;
    public currentCourseInfoCourseStep:number = -1;
    public currentPrepProgramId:number = -1;
    public previousUberReaderScreenState:number = null;

    private static _instance:UberReaderStateData;
    public static GetInstance():UberReaderStateData
    {
        if (UberReaderStateData._instance == null)
        {
            UberReaderStateData._instance = new UberReaderStateData();
        }
        return UberReaderStateData._instance;
    }

    constructor()
    {

    }

    public Restart():void
    {
        this.currentUberReaderScreenState = null;
        this.previousUberReaderScreenState = null;
        //this.currentCourseWebUrl = null
        this.currentCourseInfoCourseId = -1;
        this.currentCourseInfoCourseStep = -1;
    }
}