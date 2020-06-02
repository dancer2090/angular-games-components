import { Question } from './Question';
import { StringUtils } from '../../Utils/StringUtils';

export class PlacementTestQuestion {
    private testID: number;
    private book: string;
    private testText: string;
    private questions: Question[] = [];

    public get TestID(): number {
        return this.testID;
    }

    public set TestID(value: number) {
        this.testID = value;
    }

    public get TestText(): string {
        return this.testText;
    }

    public set TestText(value: string) {
        this.testText = value;
    }

    public get Questions(): Question[] {
        return this.questions
    }

    public set Questions(value: Question[]) {
        this.questions = value;
    }

    public static fromJson(jsonObject: any): PlacementTestQuestion {
        var retVal: PlacementTestQuestion = new PlacementTestQuestion();
        retVal.TestID = jsonObject.Test_id;
        retVal.TestText = StringUtils.DecodeFromJSONUri(jsonObject.Test_text);
        for (let questionObject of jsonObject.Questions) {
            let question: Question = Question.fromJson(questionObject);
            retVal.Questions.push(question);
        }
        return retVal;
    }
}