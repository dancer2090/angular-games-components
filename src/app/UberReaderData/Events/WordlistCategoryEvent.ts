import { UberApplicationEvent } from './UberApplicationEvent';
import { Wordlist_Category } from '../DataClasses/db/Wordlist_Category';

export class WordlistCategoryEvent extends UberApplicationEvent {
    public static WORDLIST_CATEGORIES_RECEIVED: string = "wordlistDataReceived";
    public static WORDLIST_CATEGORIES_ERROR: string = "wordlistDataError";

    private wordlistCategories: Wordlist_Category[];
    public get WordlistCategories(): Wordlist_Category[] {
        return this.wordlistCategories;
    }

    private errorMessage: string;
    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, wordlistCategories: Wordlist_Category[], errorMessage: string = null) {
        super(type);
        this.wordlistCategories = wordlistCategories;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new WordlistCategoryEvent(this.type, this.wordlistCategories, this.errorMessage);
    }
}