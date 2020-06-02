import { DictionaryString } from '../../../UberReaderData/Utils/Dictionary';
import { Component, OnDestroy } from '@angular/core';
import { GenericControl } from './generic-control';

@Component({
    selector: 'text-control',
    template: `
        <div></div>
    `
})
export class TextControl extends GenericControl implements OnDestroy {
    private values:DictionaryString<any> = {};

    //Function names used in server
    private FuncBgColor:string = "setApplicationFontHighlightColor";
    private FuncTypingFont:string = "setTypingFontName";
    private FuncTypingFontSize:string = "setTypingFontSize";
    private FuncTypingFontColor:string = "setTypingFontNormalColorAngular";//"setTypingFontNormalColor";
    private FuncAllowBackspace:string = "allowBackspace";
    private FuncBeepOnError:string = "beepOnError";
    private FuncUseKeyboard:string = "useKeyboard";

    constructor(){
        super();
    }

    protected SetValue(functionName:string, value:any):void {
        /*if (functionName == this.FunctionName || functionName == this.FuncTypingFont) {
            //textBox1.text = value;
            this.tempVal = value;
        }*/
        if(value.toLowerCase() == "true") value = true;
        else if(value.toLowerCase() == "false") value = false;

        //Not all function names sent by the server are used in the client, some are renamed for readability
        //e.g. SERVER: setApplicationFontHighlightColor, CLIENT: setBackgroundColor
        switch(functionName){
            case this.FuncAllowBackspace: 
                    this.values['enableBackspace'] = value;
                    break; 
            case this.FuncBeepOnError:
                    this.values['useBeepOnError'] = value;
                    break;
            case this.FuncTypingFont:
                    this.values[this.FuncTypingFont] = value;
                    break;
            case this.FuncTypingFontSize:
                    this.values[this.FuncTypingFontSize] = value;
                    break;        
            case this.FuncTypingFontColor: 
                    this.values['setTypingFontDefaultColor'] = value;
                    break;
            case this.FuncBgColor:
                    this.values['setBackgroundColor'] = value;
                    break;
            case this.FuncUseKeyboard:
                    this.values['displayKeyboard'] = value;
                    break;
            default:
                    if(this.FunctionName != null && this.FunctionName == functionName)
                        this.values[this.FunctionName] = value;
        }
    }
    
    public GetValues():DictionaryString<any> {
        return this.values;
    }
    
    ngOnDestroy() {
       this.values = {};
    }

    /*TO DO
    public set Label(value:String):void {
        super.Label = value;
        label1.text = value;
    }
    
    public GroupSettingLocked():void {
        super.GroupSettingLocked();
        textBox1.enabled =  false;
    }
    */
}