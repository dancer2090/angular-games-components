import { UberApplicationEvent } from './UberApplicationEvent';
import { AdminGroupReportData } from '../DataClasses/other/AdminGroupReportData';

export class GroupReportDataEvent extends UberApplicationEvent
{
    public static GROUP_REPORT_DATA_RECEIVED:string = "groupReportDataReceived";
    public static GROUP_REPORT_DATA_ERROR:string = "groupReportDataError";


    private _groupReportData:AdminGroupReportData[];
    public get GroupReportData():AdminGroupReportData[]
    {
        return this._groupReportData;
    }

    private _groupReportColumns:string[];
    public get GroupReportColumns():string[]
    {
        return this._groupReportColumns;
    }

    private _groupEnabledCurriculums:string[];
    public get GroupEnabledCurriculums():string[]
    {
        return this._groupEnabledCurriculums;
    }
    
    private _errorMessage:string;
    public get ErrorMessage():string
    {
        return this._errorMessage;
    }
    
    constructor(type:string, groupReportData:AdminGroupReportData[], groupReportColumns:string[], groupEnabledCurriculums: string[], errorMessage:string=null)
    {
        super(type);
        this._groupReportData = groupReportData;
        this._groupReportColumns = groupReportColumns;
        this._groupEnabledCurriculums = groupEnabledCurriculums;
        this._errorMessage = errorMessage;
    }
}