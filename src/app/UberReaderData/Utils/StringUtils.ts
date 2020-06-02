export class StringUtils
{
    public static emptyString(item:any, index:number, array:any[]):boolean
    {
        return item != "";
    }
    
    public static endsWith(str:string, testString:string):boolean
    {
        var end:number = str.lastIndexOf(testString);
        if (end == -1)
        {
            return false;
        }
        return end == str.length-testString.length;
    }
    
    public static CData(value:string):string
    {
        return "<![CDATA[" + value + "]]>";
    }
    
    public static getHtmlColor(number:number):string
    {
        return "#" + StringUtils.numToString(number, 16, 6, "0");
    }
    
    public static getNumFromHtmlColor(str:string):number
    {
        if(str == null)
            return 0;
        else
            return parseInt(str.slice(1, str.length), 16);
    }
    
    public static numToString(numberToConvert:number, radix:number = 10, paddingLength:number = 0, paddingString:string = "0"):string
    {
        var retString:string = numberToConvert.toString(radix);
        while (retString.length < paddingLength)
        {
            retString = paddingString.charAt(0) + retString;
        }
        return retString;
    }
    
    public static IsNullOrEmpty(theString:string):boolean {
        
        if (theString == "") {
            return true;
        }
        
        if (theString == null) {
            return true;
        }
        
        return false;
    }
    
    public static EncodeToJSONUri(val:string):string {
        if( val == null ) 
            return val;
        else
            return encodeURIComponent(val);
    }
    
    public static DecodeFromJSONUri(val:string):string {
        if( val == null ) 
            return val;
        else
            return decodeURIComponent(val);
    }
    
    public static ToNameCase(str:string):string
    {
        if (str != null && str.length > 0)
        {
            return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
        }
        else
        {
            return str;
        }
    }

    public static hasSpaces(str:string):boolean
    {
        return /\s/.test(str);
    }
    
    public static TrimString(str:string):string
    {
        return str == null ? "" : str.trim();
    }
    
    public static RemoveAllSpaces(str:string):string
    {
        return str.replace(new RegExp("\\s+", "g"), "");
    }
    
    public static RemoveDuplicateSpaces(str:string):string
    {
        return str.replace(new RegExp("\\s+", "g"), " ");
    }
    
    public static ReplaceAll(str:string, p:string, repl:string):string
    {
        /*
        while (str.indexOf(p) >= 0)
        {
            str = str.replace(p, repl);
        }
        */
        return str.replace(new RegExp(p, "ig"), repl);
    }
    
    public static substitute(str:string, ... rest):string
    {
        if (str == null) return '';
        
        // Replace all of the parameters in the msg string.
        var len:number = rest.length;
        var args:any[];
        if (len == 1 && rest[0] instanceof Array)
        {
            args = rest[0];
            len = args.length;
        }
        else
        {
            args = rest;
        }
        
        for (var i = 0; i < len; i++)
        {
            str = str.replace(new RegExp("\\{"+i+"\\}", "g"), args[i]);
        }
        
        return str;
    }

    public static RemovePossessive(word:string):string
	{
	    word = StringUtils.TrimString(word);
		if (StringUtils.endsWith(word, "'s") || StringUtils.endsWith(word, "'S"))
	    {
		    word = word.substr(0, word.length - 3);
		}
		else if (StringUtils.endsWith(word, "'"))
		{
		    word = word.substr(0, word.length - 2);
		}
			
		return word;
    }
    
    public static IsValidEmailAddress(email:string):boolean
    {
        let tempEmail: string = StringUtils.TrimString(email);
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return !(tempEmail == "" || tempEmail.length <= 5 || !EMAIL_REGEXP.test(tempEmail));
       
    }
}