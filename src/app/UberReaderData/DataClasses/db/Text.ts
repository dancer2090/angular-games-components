import { Sentence } from '../other/Sentence';
import { StringUtils } from '../../Utils/StringUtils';
import { ISO8601Util } from '../../Utils/ISO8601Util';
import { TextUtil } from '../../Utils/TextUtil';
import { AppSettings } from '../../AppSettings';

export class Text
{
    private _text_id:number;
    public get Text_id():number
    {
        if (this._wordlist_id != null) {
            return this._wordlist_id;
        }
        else {
            return this._text_id;
        }
    }
    public set Text_id(value:number)
    {
        this._text_id = value;
    }

    private _wordlist_id:number;
    public get Wordlist_id():number
    {
        return this._wordlist_id;
    }
    public set Wordlist_id(value:number)
    {
        this._wordlist_id = value;
    }
    
    private _title:string;
    public get Title():string
    {
        return this._title;
    }
    public set Title(value:string)
    {
        this._title = value;
    }
    
    private _author:string;
    public get Author():string
    {
        return this._author;
    }
    public set Author(value:string)
    {
        this._author = value;
    }
    
    private _date:Date;
    public get _Date():Date
    {
        return this._date;
    }
    public set _Date(value:Date)
    {
        this._date = value;
    }
    
    private _content:string;
    public get Content():string
    {
        return this._content;
    }
    public set Content(value:string)
    {
        this._content = value;
        if (this._textSections != null)
        {
            this._textSections = this.UpdateTextSections();
        }
    }

    private _voice_letters: boolean;
    public get Voice_letters(): boolean {
        return this._voice_letters;
    }

    public set Voice_letters(value: boolean) {
        this._voice_letters = value;
    }

    private isVocabText: boolean;
    public get IsVocabText(): boolean {
        return this.isVocabText;
    }

    public set IsVocabText(value: boolean) {
        this.isVocabText = value;
    }
    
    private _textSectionSize:number;
    private _textSections:string[];
    public get TextSections():string[]
    {
        //var sectionSize:number = UberReaderAccessor.GetUberReader().GetSectionSizeValue();
        var sectionSize:number = 1000;
        if (this._textSections == null || this._textSectionSize != sectionSize)
        {
            this._textSections = this.UpdateTextSections();
        }
        return this._textSections;
    }
    
    public UpdateTextSections():string[]
    {
        //var sectionSize:number = UberReaderAccessor.GetUberReader().GetSectionSizeValue();
        var sectionSize:number = 1000;
        this._textSectionSize = sectionSize;
        var textToProcess:string = this.Content;
        var sectionSentence:string = "";		
        
        var regEx:RegExp = new RegExp("[^.!?]+([.!?\"”]+|$)", "gim");
        var arrString:any[] = textToProcess.match(regEx);
        
        var sections:string[] = [];
        for (var i = 0; i < arrString.length; i++)
        {
            var sentence:string = arrString[i];
            if (sectionSentence.length + sentence.length < sectionSize)
            {
                sectionSentence += sentence;
            }
            else
            {
                // check if exceeds max size then end at ned of word instead of end of sentence
                if (sectionSentence.length + sentence.length > sectionSize * 1.2)
                {
                    var numCharsToTake:number = Math.max(0, sectionSize * 1.2 - sectionSentence.length);
                    var startSectionRegEx:RegExp = new RegExp("^.{0," + numCharsToTake + "}[^\\s]+", "s");
                    var startSectionsArray:any[] = sentence.match(startSectionRegEx);
                    
                    if (startSectionsArray != null && startSectionsArray.length > 0)
                    {
                        var startSection:string = startSectionsArray[0];							
                        if (startSection.length > sectionSentence.length + sectionSize * 1.3)
                        {
                            startSection = startSection.substr(0, sectionSize * 1.3 - sectionSentence.length);
                        }
                        if (startSection.length > sectionSentence.length + sectionSize * 1.3)
                        {
                            startSection = startSection.substr(0, sectionSize * 1.3 - sectionSentence.length);
                        }
                        sectionSentence += startSection;
                        
                        var restOfSentence:string = sentence.substr(startSection.length);
                        sections.push(sectionSentence);
                        //sectionSentence = restOfSentence;
                        sectionSentence = "";
                        arrString[i] = restOfSentence;
                        i--;
                    }
                    else
                    {
                        sectionSentence += sentence;
                        sections.push(sectionSentence);
                        sectionSentence = "";
                    }
                }
                else
                {
                    sectionSentence += sentence;
                    var endSentence:boolean = true;
                    if (i + 1 < arrString.length)
                    {
                        var nextSentence:string = <string>arrString[i + 1] ;
                        if (StringUtils.RemoveAllSpaces(nextSentence.charAt(0)).length > 0)
                        {
                            endSentence = false;
                        }
                        
                        if (endSentence)
                        {								
                            var lastWordRegEx:RegExp = new RegExp("\\s[a-z]+\.$", "gi");
                            var lastWordArray:any[] = sentence.match(lastWordRegEx);
                            if (lastWordArray.length > 0)
                            {
                                var lastWord:string = lastWordArray[0];
                                lastWord = lastWord.substr(0, lastWord.length -1).substr(1);
                                if (lastWord.length == 1 || AppSettings.abbreviationsList.indexOf(lastWord.toLowerCase()) >= 0)
                                {
                                    endSentence = false;
                                }
                            }
                        }
                    }
                    if (endSentence)
                    {
                        sections.push(sectionSentence);
                        sectionSentence = "";
                    }
                }
            }
        }
        
        if(sectionSentence.length > 0) //insert last section if only it is not empty  
        {
            sections.push(sectionSentence);
        }
        
        return sections;
    }
    
    private _reading_level:string;
    public get Reading_level():string
    {
        return this._reading_level;
    }
    public set Reading_level(value:string)
    {
        this._reading_level = value;
    }
    
    private _genre:string;
    public get Genre():string
    {
        return this._genre;
    }
    public set Genre(value:string)
    {
        this._genre = value;
    }
    
    private _product_id:number;
    public get Product_id():number
    {
        return this._product_id;
    }
    public set Product_id(value:number)
    {
        this._product_id = value;
    }
    
    private _complexText:boolean;
    public get ComplexText():boolean
    {
        return this._complexText;
    }
    public set ComplexText(value:boolean)
    {
        this._complexText = value;
    }
    
    private _user_id:number ;
    public get User_id():number
    {
        return this._user_id;
    }
    public set User_id(value:number)
    {
        this._user_id = value;
    }
    
    private _content_length:number ;
    public get Content_length():number
    {
        return this._content_length;
    }
    public set Content_length(value:number)
    {
        this._content_length = value;
    }
    
    private _shared_object_id:number;
    public get Shared_object_id():number
    {
        return this._shared_object_id;
    }
    public set Shared_object_id(value:number)
    {
        this._shared_object_id = value;
    }
    
    private _owner:string;
    public get Owner():string
    {
        return this._owner;
    }
    public set Owner(value:string)
    {
        this._owner = value;
    }
    
    private _can_edit:boolean;
    public get Can_edit():boolean
    {
        return this._can_edit;
    }
    public set Can_edit(value:boolean)
    {
        this._can_edit = value;
    }
    
    private _deleted:boolean;
    public get Deleted():boolean
    {
        return this._deleted;
    }
    public set Deleted(value:boolean)
    {
        this._deleted = value;
    }
    
    private _topic_id:number ;
    public get Topic_id():number
    {
        return this._topic_id;
    }
    public set Topic_id(value:number)
    {
        this._topic_id = value;
    }

    public GetSentences():Sentence[]
    {
        var sentences:Sentence[] = [];
        
        var rawText:string = this._content.trim();
        
        var currentIndex:number = 0;
        var currentSentenceText:string = "";
        
        while (currentIndex < rawText.length)
        {
            var currentChar:string = rawText.charAt(currentIndex);
            
            if (currentChar != '.' && currentChar != '?' && currentChar != '!')
            {
                currentSentenceText += currentChar;
                if (currentIndex + 1 == rawText.length)
                {
                    rawText += ".";
                }
            }
            else
            {
                var previousSentence:Sentence = new Sentence();
                previousSentence.text = currentSentenceText;
                previousSentence.endDelimiter = currentChar;
                sentences.push(previousSentence);
                currentSentenceText = "";
            }
            currentIndex++;
        }
        return sentences;
    }
    
    public CalculateReadability():void
    {
        var sentences:Sentence[] = this.GetSentences();
        
        //Calculate readability on up to the first 10 sentences
        
        var count:number = 0;
        
        var textToCheck:string = "";
        
        while (count < 10 && count < sentences.length)
        {
            textToCheck += sentences[count].EntireSentence;
            count++;
        }
        this.Reading_level = TextUtil.FogIndexToReadingLevel( TextUtil.CalculateReadability(textToCheck));			
    }
    
    public static fromJson(jsonObject:any):Text
    {
        var retVal:Text = new Text();
        retVal.Text_id = jsonObject.Text_id;
        retVal.Wordlist_id = jsonObject.Wordlist_id;
        retVal._Date = ISO8601Util.parseDateTimeString(jsonObject.Date);
        retVal.Author = StringUtils.DecodeFromJSONUri(jsonObject.Author);
        retVal.ComplexText = jsonObject.ComplexText;
        retVal.Content = StringUtils.DecodeFromJSONUri(jsonObject.Content);
        retVal.Genre = StringUtils.DecodeFromJSONUri(jsonObject.Genre);
        retVal.Product_id = jsonObject.Product_id;
        retVal.Reading_level = jsonObject.Reading_level;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Owner = StringUtils.DecodeFromJSONUri(jsonObject.Owner);
        retVal.Shared_object_id = jsonObject.Shared_object_id;
        retVal.Can_edit = jsonObject.Can_edit;
        retVal.Deleted = jsonObject.Deleted;
        retVal.Voice_letters = jsonObject.Voice_letters;

        if(jsonObject.Content_length != null)
        {
            retVal.Content_length = jsonObject.Content_length;
        }
        
        if (jsonObject.User_id != null)
        {
            retVal.User_id = jsonObject.User_id;
        }
        
        if (jsonObject.Topic_id != null)
        {
            retVal.Topic_id = jsonObject.Topic_id;
        }
        
        return retVal;
    }
    
    public toJson():any
    {
        var jsonObject:any = 
        {
            Text_id: this.Text_id, 
            Wordlist_id: this.Wordlist_id,
            Date: ISO8601Util.formatExtendedDateTime(this._Date),
            Author: StringUtils.EncodeToJSONUri(this.Author),
            ComplexText: this.ComplexText,
            Content: StringUtils.EncodeToJSONUri(this.Content),
            Genre: StringUtils.EncodeToJSONUri(this.Genre),
            Product_id: this.Product_id,
            Reading_level: this.Reading_level,
            Title: StringUtils.EncodeToJSONUri(this.Title),
            User_id: (this.User_id != null ? this.User_id : null),
            Owner: StringUtils.EncodeToJSONUri(this.Owner),
            Shared_object_id: this.Shared_object_id
        };
        return jsonObject;
    }
}