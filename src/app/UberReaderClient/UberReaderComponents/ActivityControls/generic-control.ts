import { OnInit } from '@angular/core';
import { StringUtils } from '../../../UberReaderData/Utils/StringUtils';
import { Setting } from '../../../UberReaderData/DataClasses/db/Setting';
import { DictionaryString } from '../../../UberReaderData/Utils/Dictionary';


export abstract class GenericControl implements OnInit{
    private description:string;
    private name:string;
    private functionName:string;
    private controlRef:string;
    private minValue:number;
    private maxValue:number;
    private required_restart:boolean = false;
    private label:string;
    private groupName:string;
    protected hasColor:boolean = false;

    ngOnInit() {
        /* TO DO 
        if(description != null && description.length > 0)
        {
            callout = new HelpCalloutButton();
            callout.text = description;
            addElement(callout);
        }*/
    }
    
    protected descriptionButton_clickHandler(event:MouseEvent):void {
        event.preventDefault();
    }    
    
    public set Description(val:string) {
        this.description = StringUtils.TrimString(val);
    }

    public get Description():string {
        return this.description;
    }
    
    public UsesFunctionName(functionName:string):boolean {
        return functionName == this.FunctionName;
    }    
    
    public get Name():string {
        return name;
    }

    public set Name(value:string) {
        this.name = value;
    }    
    
    public get FunctionName():string {
        return this.functionName;
    }

    public set FunctionName(value:string) {
        this.functionName = value;
    }    
    
    public get ControlRef():string {
        return this.controlRef;
    }

    public set ControlRef(value:string) {
        this.controlRef = value;
    }
        
    public get MinValue():number {
        return this.minValue;
    }

    public set MinValue(value:number) {
        this.minValue = value;
    }    
    
    public get MaxValue():number {
        return this.maxValue;
    }

    public set MaxValue(value:number) {
        this.maxValue = value;
    }    
    
    public set Required_restart(val:boolean) {
        this.required_restart = val;
    }
    
    public get Required_restart():boolean {
        return this.required_restart;
    }
    
    protected abstract SetValue(functionName:string, value:string):void;
    
    public ApplySettings(settings:Setting[]):void {				
        for (let setting of settings) {					
            if (setting.Control_ref == this.ControlRef) {
                this.SetValue(setting.Function_name, setting.Value);
            }
        }
    }			
    
    public FireAllControlsChanged(saveSettings:boolean):void {
        let controlValues:DictionaryString<any> = this.GetValues();
        for (let key in controlValues) {
            //TO DO dispatchEvent(new AControlEvent(AControlEvent.ACONTROL_CHANGED, key, ControlRef, controlValues[key], saveSettings, required_restart));
        }
    }
    
    protected FireControlChanged(functionName:string, value:string, saveSettings:boolean):void {
        //TO DO dispatchEvent(new AControlEvent(AControlEvent.ACONTROL_CHANGED, functionName, ControlRef, value, saveSettings, required_restart));
    }    
    
    public get Label():string {
        return this.label;
    }

    public set Label(value:string) {
        this.label = value;
    }
        
    public get Group_name():string {
        return this.groupName;
    }

    public set Group_name(value:string) {
        this.groupName = value;
    }
    
    public abstract GetValues():DictionaryString<any>;
    
    public dispose():void {
        /*if(callout)
            callout = null;*/
    }    
    
    public get HasColorElement():boolean {
        return this.hasColor;
    }
    
    public OverrideValue(value:string):void {
        //to override
    }
    
    public GroupSettingLocked():void {
        /* TO DO 
        if(!callout) {
            callout = new HelpCalloutButton();	
        }
        callout.text = "This setting has been set by an administrator.";
        
        if(!this.containsElement(callout))
            addElement(callout);*/
    }
}