import { UberApplicationEvent } from './UberApplicationEvent';
import { Text } from '../DataClasses/db/Text';

export class NextRecommendedTextEvent extends UberApplicationEvent {
    public static NEXT_RECOMMENDED_TEXT_RECEIVED: string = "nextRecommendedTextReceived";
    public static NEXT_RECOMMENDED_TEXT_ERROR: string = "nextRecommendedTextError";

    private _errMsg: string;
    private _nextRecommendedText: Text;

    public get ErrorMessage(): string {
        return this._errMsg;
    }
    
    public get NextRecommendedText(): Text {
        return this._nextRecommendedText;
    }

    constructor(type: string, nextRecommendedText: Text, errMsg: string = "") {
        super(type);
        this._nextRecommendedText = nextRecommendedText;
        this._errMsg = errMsg;
    }

    public clone(): UberApplicationEvent {
        return new NextRecommendedTextEvent(this.type, this._nextRecommendedText, this._errMsg);
    }
}