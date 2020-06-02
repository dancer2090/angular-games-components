//import DateFormatter = mx.formatters.DateFormatter;
import { StringUtils } from './StringUtils';

export class TextUtil
{
    // private static dateFormatter:DateFormatter = new DateFormatter();
    
    // public static formatDate(date:Date):string
    // {
    //     TextUtil.dateFormatter.formatString = "DD/MM/YYYY HH:NN:SS";
    //     return TextUtil.dateFormatter.format(date);
    // }
    
    public static CalculateReadability(content:string):number
    {
        content = content.replace(/[\n]/g, ' ');
        var _sentenceCount:number = 0;
        var _totalWordCount:number = 0;
        var _complexWordCount:number = 0;
        var _fogIndex:number = 0.0;
        var paragraphs:string[] = new Array<string>();
        
        //not sure what to split on
        var lines:any[] = content.split(/[\n\r]/g).filter(StringUtils.emptyString);
        //paragraphs = text.sp
        //StringReader sr;
        var aLine:string;
        /*var lineNum:int = 0;
        while (lineNum < lines.length)*/
        for (var lineNum; lineNum < lines.length; lineNum++)
        {
            aLine = lines[lineNum];
            //aLine = sr.ReadLine();
            // need to know line separator as \n has been replaced
            if (aLine == null)
            {
                break;
            }
            
            aLine = aLine.trim();
            
            if (aLine.length == 0)
            {
                continue;
            }
            
            if (!isNaN(Number(aLine.charAt(0))))
            {
                continue;
            }
            
            paragraphs.push(aLine);
            
            if (paragraphs.length == 2)
            {
                break;
            }
        }
        
        var passage:string = "";
        
        for (var para of paragraphs)
        {
            passage += para;
        }
        
        var sentences:any[] = content.split(/[.;:?]/g).filter(StringUtils.emptyString);
        
        var words:any[] = content.split(/[. ,'"';:?]/g).filter(StringUtils.emptyString);
        
        var avgSentenceLength:number = 0.0;
        if (sentences.length != 0)
        {
            avgSentenceLength = words.length / sentences.length;
        }
        
        var syllables:number;
        var lastWasVowel:boolean = false;
        
        for (var word of words)
        {
            syllables = 0;
            lastWasVowel = false;
            
            var thisWord:string = word.toUpperCase();
            // for each char
            for (var i = 0; i < thisWord.length; i++)
            {
                var char:string = thisWord.charAt(i);
                if (!isNaN(Number(char)))
                {
                    syllables = 0;
                    break;
                }
                
                if ("AEIOUY".indexOf(thisWord.charAt(i)) >= 0)
                {
                    if (!lastWasVowel)
                    {
                        syllables++;
                        lastWasVowel = true;
                    }
                }
                else
                {
                    lastWasVowel = false;
                }
            } // end for each char
            
            if (StringUtils.endsWith(thisWord, "R") || 
                StringUtils.endsWith(thisWord, "RED") || 
                StringUtils.endsWith(thisWord, "ZED") || 
                StringUtils.endsWith(thisWord, "VED") || 
                StringUtils.endsWith(thisWord, "CED") || 
                StringUtils.endsWith(thisWord, "MED") || 
                StringUtils.endsWith(thisWord, "ING")) 
            {
                syllables--;
            }
            if (syllables > 2)
            {
                _complexWordCount++;
            }
        } // end for words
        
        _totalWordCount = words.length;
        _sentenceCount = sentences.length;
            
        // Gunning Fog Index
        _fogIndex = 0.0;
        
        if (_totalWordCount != 0)
        {
            _fogIndex = (100.0 * _complexWordCount / _totalWordCount);
            
            _fogIndex += avgSentenceLength;
            
            _fogIndex *= 0.4;
            
            _fogIndex = Math.round(_fogIndex * 10) / 10;
        }
        
        return _fogIndex;
        
    }
    
    public static FogIndexToReadingLevel(fogIndex:number):string
    {
        var fogIndexInt:number = Math.floor(fogIndex);
        if (fogIndexInt <= 12)
        {
            return "Grade " + fogIndexInt;
        }
        else if (fogIndexInt > 12 && fogIndexInt <= 16)
        {
            return "College/Adult";
        }
        else if (fogIndexInt > 16)
        {
            return "Advanced";
        }
        else
        {
            return "Unknown";
        }
    }
}