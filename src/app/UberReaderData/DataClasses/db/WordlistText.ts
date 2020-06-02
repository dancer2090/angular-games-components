import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';

export class WordlistText {
    private wordlistID: number;
    private wordlistCategoryID: number;
    private textID: number;
    private title: string;
    private author: string;
    private date: Date;
    private content: string;
    private readingLevel: string;
    private genre: string;
    private productID: number;
    private complexText: boolean;
    private contentLength: number;
    private userID: number;
    private canEdit: boolean;
    private topicID: number;
    private voiceLetters: boolean;

    public get WordlistID(): number {
        return this.wordlistID;
    }

    public set WordlistID(value: number) {
        this.wordlistID = value;
    }

    public get WordlistCategoryID(): number {
        return this.wordlistCategoryID;
    }

    public set WordlistCategoryID(value: number) {
        this.wordlistCategoryID = value;
    }

    public get TextID(): number {
        return this.textID;
    }

    public set TextID(value: number) {
        this.textID = value;
    }

    public get Title(): string {
        return this.title;
    }

    public set Title(value: string) {
        this.title = value;
    }

    public get Author(): string {
        return this.author;
    }

    public set Author(value: string) {
        this.author = value;
    }

    public get _Date(): Date {
        return this.date;
    }

    public set _Date(value: Date) {
        this.date = value;
    }

    public get Content(): string {
        return this.content;
    }

    public set Content(value: string) {
        this.content = value;
    }

    public get ReadingLevel(): string {
        return this.readingLevel;
    }

    public set ReadingLevel(value: string) {
        this.readingLevel = value;
    }

    public get Genre(): string {
        return this.genre;
    }

    public set Genre(value: string) {
        this.genre = value;
    }

    public get ProductID(): number {
        return this.productID;
    }

    public set ProductID(value: number) {
        this.productID = value;
    }

    public get ComplexText(): boolean {
        return this.complexText;
    }

    public set ComplexText(value: boolean) {
        this.complexText = value;
    }

    public get ContentLength(): number {
        return this.contentLength;
    }

    public set ContentLength(value: number) {
        this.contentLength = value;
    }

    public get UserID(): number {
        return this.userID;
    }

    public set UserID(value: number) {
        this.userID = value;
    }

    public get CanEdit(): boolean {
        return this.canEdit;
    }

    public set CanEdit(value: boolean) {
        this.canEdit = value;
    }

    public get TopicID(): number {
        return this.topicID;
    }

    public set TopicID(value: number) {
        this.topicID = value;
    }

    public get VoiceLetters(): boolean {
        return this.voiceLetters;
    }

    public set VoiceLetters(value: boolean) {
        this.voiceLetters = value;
    }

    public static fromJson(jsonObject: any): WordlistText {
        var retVal: WordlistText = new WordlistText();
        retVal.WordlistID = jsonObject.Wordlist_id;
        retVal.WordlistCategoryID = jsonObject.Wordlist_Category_id;
        retVal.TextID = jsonObject.Text_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal._Date = ISO8601Util.parseDateTimeString(jsonObject.Date);
        retVal.Content = StringUtils.DecodeFromJSONUri(jsonObject.Content);
        retVal.ReadingLevel = jsonObject.Reading_level;
        retVal.Genre = StringUtils.DecodeFromJSONUri(jsonObject.Genre);
        retVal.ProductID = jsonObject.Product_id;
        retVal.ComplexText = jsonObject.ComplexText;
        retVal.ContentLength = jsonObject.Content_length;
        retVal.UserID = jsonObject.User_id;
        retVal.CanEdit = jsonObject.Can_edit;
        retVal.TopicID = jsonObject.Topic_id;
        retVal.VoiceLetters = jsonObject.Voice_letters;
        return retVal;
    }

    public toJson(): any {
        var jsonObject:any = 
        {
            Wordlist_id: this.WordlistID,
            Wordlist_Category_id: this.WordlistCategoryID,
            Text_id: this.TextID, 
            Title: StringUtils.EncodeToJSONUri(this.Title),
            Author: StringUtils.EncodeToJSONUri(this.Author),
            Date: ISO8601Util.formatExtendedDateTime(this._Date),
            Content: StringUtils.EncodeToJSONUri(this.Content),
            Reading_level: this.ReadingLevel,
            Genre: StringUtils.EncodeToJSONUri(this.Genre),
            Product_id: this.ProductID,            
            ComplexText: this.ComplexText,
            Content_length: this.ContentLength,
            User_id: this.UserID,
            Can_edit: this.CanEdit,
            Topic_id: this.TopicID,
            Voice_letters: this.VoiceLetters
        };
        return jsonObject;
    }
}