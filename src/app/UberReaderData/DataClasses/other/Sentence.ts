export class Sentence
{
    public text:string;
    public endDelimiter:string;
    
    
    public get EntireSentence():string
    {
        return this.text + this.endDelimiter;
    }
}