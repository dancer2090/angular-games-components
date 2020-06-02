import { Word } from '../../../UberReaderData/DataClasses/db/Word';
import { Word_Sense } from '../../../UberReaderData/DataClasses/db/Word_Sense';
import { Word_User } from '../../../UberReaderData/DataClasses/db/Word_User';
import { Word_PartOfSpeech } from '../../../UberReaderData/DataClasses/db/Word_PartOfSpeech';

import { UberApplication } from '../../../UberReaderData/UberApplication';

export class WordToHtml
{
	/*
    private DEFINITION_SIZE:number = 14;
	private EXAMPLE_SIZE:number = 14;
	private POS_SIZE:number = 16;
	private FONT:string = "Arial";
	*/
    public generateHtml(word:Word, wu:Word_User):string
	{
		let wordHtml:string = "";
        let posInOrder:Word_PartOfSpeech[] = word.GetPosInOrder(wu);
		let first:boolean = true;
		for (let pos of posInOrder)
		{
		    wordHtml += this.generatePos(pos, word.GetPos(pos), word, first);
			first = false;
		}

	    return wordHtml;
	}
		
	private generatePos(pos:Word_PartOfSpeech, senses:Word_Sense[], word:Word, first:boolean):string
	{
	    var posText:string = "";
			
		if (senses.length > 0)
		{
		    posText = pos.Type;
			posText = (first ? "" : this.getLineBreak()) + this.makeItalicBold(posText) + this.getLineBreak();
		}
			
		let senseNumber:number = 1;
		let sensesInOrder:Word_Sense[] = this.shiftDefaultSenseToTop(senses, word);
		for (let sense of senses)
		{
		    posText += this.generateSense(sense, senseNumber++);				
		}

		//if (senses.length > 0) posText += this.getLineBreak();
			
		return posText;
	}
		
	public shiftDefaultSenseToTop(inSenses:Word_Sense[], word:Word):Word_Sense[]
	{
	    let defaultSense:Word_Sense = UberApplication.GetInstance().GetDefaultSense(word.Word_id);
			
		if (defaultSense != null)
		{
			//find current position of default in list
            let positionOfDefault:number = 0;
            for (let i:number = 0; i < inSenses.length; i++)
            {
                if (inSenses[i].Word_sense_id == defaultSense.Word_sense_id)
                {
                    positionOfDefault = i;
                }
            }
                
            while (positionOfDefault > 0)
            {
                //swap default with the one before it
                let temp:Word_Sense = inSenses[positionOfDefault - 1];
                inSenses[positionOfDefault - 1] = inSenses[positionOfDefault];
                inSenses[positionOfDefault] = temp;
                positionOfDefault--;
            }
		}
		return inSenses;
	}
		
	private generateSense(sense:Word_Sense, senseNumber:number):string
	{
		var frequency:string = "";
		var DISPLAY_FREQ:boolean = false;
		
		if (DISPLAY_FREQ)
		{
			frequency = " [" + sense.Frequency + "]";
		}

		let senseText:string = this.getLineBreak() + "<b>" + senseNumber + ". " + "</b> " + sense.Definition + frequency + this.getLineBreak();// + " " + getSynAnt("syn", sense.SynonymList) + " " + getSynAnt("ant", sense.AntonymList);
		senseText = this.wrapInStyle(senseText);
		senseText += "\n";
		
		//senseText = this.wrapInTag(senseText, "p");
		return senseText;
	}
		
	private getSynAnt(prefix:string, items:string[]):string
	{
		var centerText:string = "";
		if (items != null && items.length > 0)
		{
			centerText += "[" + prefix + ": ";
			var synArr:string[] = this.preProcessItems(items);
			for (let syn in synArr)
			{
				centerText += syn + ", ";
			}
			
			//remove last comma/space
			centerText = centerText.substring(0, centerText.length - 2);
			centerText += "]";
		}
		
		return centerText;
	}
		
	private getExampleList(sense:Word_Sense):string
	{
		let exampleText:string = "";
		if (sense.Examples.length > 0)
		{
			exampleText += this.getLineBreak();
			for (var example of sense.Examples)
			{
				exampleText += this.getLineBreak() + "\"" + example + "\"";
			}
		}			return exampleText;
	}
		
	public wrapInStyle(text:string):string
	{
		if (text != null && text.length > 0)
		{
			//return "<font size=\"" + fontSize + "\" face=\"" + fontFamily + "\">" + text + "</font>";
			return "<span>" + text + "</span>";
		}
		else
		{
			return "";
		}
	}
		
	public makeItalicBold(text:string):string
	{
		return "<i><b><span class='defPOS'>" + text + "</span></b></i>";
	}
	
	private wrapInTag(text:string, tag:string):string
	{
			return "<" + tag + ">" + text + "</" + tag + ">";
	}
		
	private getLineBreak():string
	{
		return "<br />\n";
	}
		
	private preProcessItems(items:string[]):string[]
	{
		var bracketsRemoved:string[] = [];
		for (let item of items)
		{
			var indexOfLastOpenBracket:number = item.lastIndexOf("(");
			if (indexOfLastOpenBracket > 0)
			{
				var newItem:string = item.substring(0, indexOfLastOpenBracket);
				bracketsRemoved.push(newItem);
			}
			else
			{
				bracketsRemoved.push(item);
			}
		}
		
		//Remove dupliccates
		var duplicatedRemoved:string[] = [];
		
		for (let item2 of bracketsRemoved)
		{
			if (duplicatedRemoved.indexOf(item2) < 0)
			{
				duplicatedRemoved.push(item2);
			}
		}
		return duplicatedRemoved;
	}
}

