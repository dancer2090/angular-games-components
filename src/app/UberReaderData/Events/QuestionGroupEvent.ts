import { UberApplicationEvent } from './UberApplicationEvent';
import { Question_Group } from '../DataClasses/db/Question_Group';

export class QuestionGroupEvent extends UberApplicationEvent
{
    public static QUESTION_GROUP_CREATED:string = "questionGroupCreated";
    public static QUESTION_GROUP_SAVED:string = "questionGroupSaved";
    public static QUESTION_GROUP_CREATION_ERROR:string = "questionGroupCreationError";
    public static QUESTION_GROUP_SAVE_ERROR:string = "questionGroupSaveError";
    
    private _questionGroup:Question_Group;
    public get Question_Group():Question_Group
    {
        return this._questionGroup;
    }
    
    constructor(type:string, questionGroup:Question_Group)
    {
        super(type);
        this._questionGroup = questionGroup;
    }
}