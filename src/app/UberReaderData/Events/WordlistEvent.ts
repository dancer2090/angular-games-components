import { Wordlist } from '../DataClasses/db/Wordlist';

import { UberApplicationEvent } from './UberApplicationEvent';
import { WordlistText } from '../DataClasses/db/WordlistText';

export class WordlistEvent extends UberApplicationEvent {
    public static WORDLIST_SELECTED: string = "wordlistSelected";
    public static WORDLIST_DATA_RECEIVED: string = "wordlistDataReceived";
    public static WORDLIST_DATA_ERROR: string = "wordlistDataError";
    public static WORDLIST_CREATED: string = "wordlistCreated";
    public static WORDLIST_CREATION_ERROR: string = "wordlistCreationError";

    private wordlist: Wordlist;
    public get Wordlist(): Wordlist {
        return this.wordlist;
    }

    private wordlistText: WordlistText
    public get WordlistText(): WordlistText {
        return this.wordlistText;
    }

    private _numOfNewWordsAdded: number;
    public get NumOfNewWordsAdded(): number {
        return this._numOfNewWordsAdded;
    }

    private _errorMessage: string;
    public get ErrorMessage(): string {
        return this._errorMessage;
    }

    constructor(type: string, wordlist: Wordlist, wordlistText: WordlistText = null, errorMessage: string = null, numOfNewWordsAdded: number = 0) {
        super(type);
        this.wordlist = wordlist;
        this.wordlistText = wordlistText;
        this._numOfNewWordsAdded = numOfNewWordsAdded;
        this._errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new WordlistEvent(this.type, this.wordlist, this.wordlistText, this._errorMessage, this._numOfNewWordsAdded);
    }
}