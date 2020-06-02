import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { ActivityService } from '../../../../../UberReaderActivities/activity.service';
import { Setting } from '../../../../../UberReaderData/DataClasses/db/Setting';
import { AControl } from '../../../../../UberReaderData/DataClasses/db/AControl';
import { AControlUtil } from '../../../ActivityControls/activity-control-util';
import { MatDialogRef } from '@angular/material';
import { ParentDialog } from '../../ParentDialog';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { UberReader } from '../../../../UberReader';

@Component({
    selector: 'preferences-dialog',
    styleUrls: ['./preferences-dialog.component.css'],
    templateUrl: './preferences-dialog.component.html'
})
export class PreferencesDialog extends ParentDialog implements OnInit{
    private model:UberApplication;
    private FuncBgColor:any = { functionName:"setApplicationFontHighlightColor" };
    private FuncTypingFont:any = { functionName:"setTypingFontName" };
    private FuncTypingFontSize:any = { functionName:"setTypingFontSize" };
    private FuncTypingFontColor:any = { functionName:"setTypingFontNormalColorAngular" };
    private FuncAllowBackspace:any = { functionName:"allowBackspace" };
    private FuncBeepOnError:any = { functionName:"beepOnError" };
    private FuncUseKeyboard:any = { functionName:"useKeyboard" };
    private FuncKeyboardLayout:any = { functionName:"setKeyboardLayout" };

    private initialValueForAllowBackspace: boolean;

    public _allowBackspace:boolean;
    public _beepOnError:boolean;
    public textColor:string="#000000"; //"#666666";
    public bgColor:string="#FFFFFF";
    public fontSelected:string = "Courier New";
    public fontSizeSelected:number = 56;
    public fonts:string[] = [];
    public fontSizes:number[] = [];
    public showTrainingHelp:boolean;
    public enableClosedCaptions: boolean;
    public hideSchoolsButton:boolean;
    public isDarkAppearance:boolean;
    public isHighVidQuality:boolean;
    public _useKeyboard:boolean;
    public keyboardLayoutSelected:string="";
    public keyboardLayouts:string[] = [];
    public lock_useKeyboard:boolean = false;
    public lock_beepOnError:boolean = false;
    public lock_allowBackspace:boolean = false;
    public lock_fontSettings:boolean = false;
    public userDisplayName: string;
    public enableVoiceover:boolean = false;
    public useGameSounds: boolean = true;
    public selectedTheme: string = "Light";

    constructor(public dialogRef: MatDialogRef<PreferencesDialog>, private activityService:ActivityService) {
        super();
        this.model = UberApplication.GetInstance();
    }

    ngOnInit() {
        this.userDisplayName = this.model.CurrentUserData.DisplayNamePosessive;
        
        let combinedSettings:Setting[] = this.model.getDefaultSettings();
        let userSettings:Setting[] = this.model.getSettingsForUser();
        let groupSettings:Setting[] = this.model.getSettingsForGroup();
        combinedSettings = AControlUtil.CombineSettings(combinedSettings, userSettings, groupSettings);				
        
        let userControls:AControl[] = this.model.getUserAControls();        
        for (let aControl of userControls) {
            this.applySettings(combinedSettings, aControl);
            for (let groupSetting of groupSettings) {
                let controlCombinedKey: string = aControl.Control_ref + ":" + aControl.Function_name;
                //console.log(controlCombinedKey, "---", groupSetting);
                if(controlCombinedKey == groupSetting.CombinedKey && groupSetting.Force_setting) {
                    if(groupSetting.Function_name == this.FuncBgColor.functionName) {
                        this.lock_fontSettings = true;
                    }
                    else {
                        this["lock_" + groupSetting.Function_name] = true;
                    }
                    break;
                }
            }
        }

        //GENERAL SETTINGS 
        this.showTrainingHelp = this.model.GetUserPref("always_show_description").toLowerCase() == "true" || this.model.GetUserPref("always_show_description") == "";
        this.enableClosedCaptions = this.model.GetUserPref("enable_closed_captions").toLowerCase() == "true";
        this.isDarkAppearance = this.model.GetUserPref("default_style") == "Dark style" ? true : false;
        this.selectedTheme = this.model.GetUserPref("default_theme") == "" ? 'Light' : this.model.GetUserPref("default_theme");
        this.isHighVidQuality = this.model.GetUserPref("video_quality") == "high" ? true : false;
        this.hideSchoolsButton = this.model.GetUserPref("hide_shchools_button").toLowerCase() == "true" ? true : false;
        this.enableVoiceover = this.model.GetUserPref("enable_voiceover").toLowerCase() == "true";
        this._allowBackspace = this.enableVoiceover ? false : this._allowBackspace;
        this.useGameSounds = this.model.GetUserPref("use_game_sounds") == "true";

        //FONT SETTINGS
        //create font menu items
        let product_fonts_used:string = this.model.CurrentProduct.Fonts_used;
        if (product_fonts_used == null) {
            console.log("get system fonts");
        }
        else {
            let tempFonts: string[] = product_fonts_used.split(',');
            for(let font of tempFonts) {
                if( font != "CP Mono" && font != "Luxi Mono" && font.toLowerCase().indexOf("cp mono") == -1 && font.toLowerCase().indexOf("luxi mono") == -1 )
                    this.fonts.push(font);
            }
            this.fonts.push("Fira Mono");
            //this.fonts.push("Open Dyslexic Font");
        }

        //create font size menu items
        for (let i:number = 8; i <= 74; i += (i < 12 ? 1 : (i < 24 ? 2 : (i < 44 ? 4 : 6)))) {
            this.fontSizes.push(i);
        }
    }

    private applySettings(settings:Setting[], aControl:AControl):void {				
        for (let setting of settings) {					
            if (setting.Control_ref == aControl.Control_ref) {
                let functionName = aControl.Function_name == null ? setting.Function_name : aControl.Function_name;
                try {
                    if(functionName.toLowerCase().indexOf('keyboardlayout') != -1) {
                        this.keyboardLayouts = aControl.Ddl_values.split(",");
                    }
                    this[functionName](setting.Value, aControl.Control_ref);
                }
                catch(Error){
                    console.log('error calling ' + functionName);
                }
            }
        }
    }

    //function name in server for setting background color
    private setApplicationFontHighlightColor(bgColor:string, controlRef:string):void {
        if(bgColor.length <= 7) {
            this.bgColor = bgColor;
            this.FuncBgColor.controlRef = controlRef;
            this.activityService.preferencesChangedSubject.next({type: 'bgColor', value: this.bgColor});
            console.log("setApplicationFontHighlightColor : BG COLOR: " + this.bgColor);
        }
    }

    public bgColorChanged(color:string=""):void {
        if(color) this.bgColor = color;
        console.log("bgColorChanged : BG COLOR: " + this.bgColor);
        this.activityService.preferencesChangedSubject.next({type: 'bgColor', value: this.bgColor});
    }

    //function name in server for setting typing font
    public setTypingFontName(fontName:string, controlRef:string=""):void {
        console.log("setTypingFontName : FONT NAME: " + fontName);
        this.fontSelected = fontName == "Luxi Mono" ? "Fira Mono" : fontName;
        this.activityService.preferencesChangedSubject.next({type: 'fontName', value: fontName});
        
        if(controlRef != "") {
            this.FuncTypingFont.controlRef = controlRef;            
        }        
    }

    public getFontStyle(font: string): string {
        let fontStyle = "";
        
        if (font.indexOf("Andale") != -1) {
            fontStyle = "andaleMonoFont"; //"andaleMono";
        }
        else if (font.indexOf("Aurulent") != -1) {
            fontStyle = "aurulentSansMonoFont"; //"aurulentSansMono";
        }
        else if (font.indexOf("Bitstream") != -1) {
            fontStyle = "bitstreamVeraSansMonoFont"; //"bitstreamVeraSansMono";
        }
        else if (font.indexOf("Courier") != -1) {
            fontStyle = "courierNewFont"; //"courierNew";
        }
        else if (font.indexOf("DejaVu") != -1) {
            fontStyle = "dejavuSansMonoFont"; //"dejavuSansMono";
        }
        else if (font.indexOf("Envy") != -1) {
            fontStyle = "envyCodeRFont"; //"envyCodeR";
        }
        else if (font.indexOf("Inconsolata") != -1) {
            fontStyle = "inconsolataFont"; //"inconsolata";
        }
        else if (font.indexOf("Liberation") != -1) {
            fontStyle = "liberationMonoFont"; //"liberationMono";
        }
        else if (font.indexOf("Oxygen") != -1) {
            fontStyle = "oxygenMonoFont"; //"oxygenMono";
        }
        else if (font.indexOf("PT Mono") != -1) {
            fontStyle = "ptMonoFont"; //"ptMono";
        }
        else if (font.indexOf("saxMono") != -1) {
            fontStyle = "saxMonoFont"; //"saxMono";
        }
        else if (font.indexOf("Ubuntu") != -1) {
            fontStyle = "ubuntuMonoFont"; //"ubuntuMono";
        }
        else if (font.indexOf("CP") != -1 || font.indexOf("Luxi") != -1 || font.indexOf("Fira") != -1) {
            fontStyle = "firaMonoFont"; //"firaMono";
        }
        else if (font.indexOf("Dyslexic") != -1) {
            fontStyle = "openDyslexicFont";
        }

        return fontStyle;
    }

    //function name in server for setting typing font size
    public setTypingFontSize(size:number, controlRef:string=""):void {
        console.log("setTypingFontSize : TEXT SIZE: " + size);
        if(typeof size == 'string') size = parseInt(size);
        this.fontSizeSelected = size;
        this.activityService.preferencesChangedSubject.next({type: 'fontSize', value: size});

        if(controlRef != "") {
            this.FuncTypingFontSize.controlRef = controlRef;            
        }
    }

    //function name in server for setting typing color - FLEX
    /*private setTypingFontNormalColor(color:string, controlRef:string):void {
        this.textColor = color;
        this.FuncTypingFontColor.controlRef = controlRef; 
    }*/

    //function name in server for setting typing color - ANGULAR
    private setTypingFontNormalColorAngular(color:string, controlRef:string):void {
        this.textColor = color;
        this.FuncTypingFontColor.controlRef = controlRef;
        this.activityService.preferencesChangedSubject.next({type: 'textColor', value: this.textColor}); 
        console.log("setTypingFontNormalColorAngular : TEXT COLOR: " + this.textColor);
    }

    public textColorChanged(color:string=""):void {
        if(color) this.textColor = color;
        console.log("textColorChanged : TEXT COLOR: " + this.textColor);
        this.activityService.preferencesChangedSubject.next({type: 'textColor', value: this.textColor});
    }

    //function name in server for setting allowbackspace
    private allowBackspace(allow:string, controlRef:string):void {
        this._allowBackspace = allow.toLowerCase() == "true";
        this.initialValueForAllowBackspace = this._allowBackspace;
        this.FuncAllowBackspace.controlRef = controlRef;
        this.activityService.preferencesChangedSubject.next({type: 'allowBackspace', value: this._allowBackspace});        
        console.log("ALLOW BACKSPACE: " + this._allowBackspace);
    }

    public toggleAllowBackspace():void {
        this.activityService.preferencesChangedSubject.next({type: 'allowBackspace', value: this._allowBackspace});        
        console.log("toggleAllowBackspace : ALLOW BACKSPACE: " + this._allowBackspace);
    }

    //function name in server for setting beepOnError
    private beepOnError(beep:string, controlRef:string):void {
        this._beepOnError = beep.toLowerCase() == "true";
        this.FuncBeepOnError.controlRef = controlRef; 
        this.model.UpdateUserPref("use_game_sounds", this._beepOnError.toString(), true);
        //this.activityService.preferencesChangedSubject.next({type: 'beepOnError', value: this._beepOnError});   
        this.activityService.preferencesChangedSubject.next({type: 'useGameSounds', value: this._beepOnError});     
        console.log("USE GAME SOUNDS: " + this._beepOnError);
    }

    public toggleBeepOnError():void {
        this.activityService.preferencesChangedSubject.next({type: 'useGameSounds', value: this._beepOnError});
        this.model.UpdateUserPref("use_game_sounds", this._beepOnError.toString(), true);
        //this.activityService.preferencesChangedSubject.next({type: 'beepOnError', value: this._beepOnError});        
        console.log("USE GAME SOUNDS: " + this._beepOnError);
    }
    
    public toggleTrainingHelp():void {
        console.log("SHOW TRAINING HELP: " + this.showTrainingHelp);
        this.model.UpdateUserPref("always_show_description", this.showTrainingHelp.toString(), true);
    }

    public toggleClosedCaptions():void {        
        this.model.UpdateUserPref("enable_closed_captions", this.enableClosedCaptions.toString(), true);
    }

    public toggleHideSchoolsButton():void {
        console.log("HIDE SCHOOLS BUTTON: " + this.hideSchoolsButton);
        this.model.UpdateUserPref("hide_shchools_button", this.hideSchoolsButton.toString(), true);
    }

    public toggleVoiceover(): void {
        if (!this.enableVoiceover && this.lock_allowBackspace) {
            this._allowBackspace = this.initialValueForAllowBackspace;
        }
        else {
            this._allowBackspace = !this.enableVoiceover;
        }
        this.model.UpdateUserPref("enable_voiceover", this.enableVoiceover.toString(), true);
    }

    //function name in server for setting useKeyboard
    private useKeyboard(useKb:string, controlRef:string): void {
        this._useKeyboard = useKb.toLowerCase() == "true";
        this.FuncUseKeyboard.controlRef = controlRef;
        console.log("DISPLAY KB: " + this._useKeyboard + "--" + controlRef);   
        this.activityService.preferencesChangedSubject.next({type: 'useKeyboard', value: this._useKeyboard}); 
    }

    public toggleUseKeyboard(): void {
        this.activityService.preferencesChangedSubject.next({type: 'useKeyboard', value: this._useKeyboard});
        console.log("toggleUseKeyboard : DISPLAY KB: " + this._useKeyboard);
    }

    /*
    public toggleGameSounds(): void {
        console.log("toggleGameSounds : USE GAME SOUNDS: " + this.useGameSounds);
        this.activityService.preferencesChangedSubject.next({type: 'useGameSounds', value: this.useGameSounds});
        this.model.UpdateUserPref("use_game_sounds", this.useGameSounds.toString(), true);
    }*/

    public setKeyboardLayout(layout:string, controlRef:string=""): void {
        console.log("KB LAYOUT: " + layout);
        this.keyboardLayoutSelected = layout;
        this.activityService.preferencesChangedSubject.next({type: 'kblayout', value: layout});

        if(controlRef != "") {
            this.FuncKeyboardLayout.controlRef = controlRef;            
        }
    }

    public closeDialog(data?:any) {
        let settings = [{functionName: this.FuncBgColor.functionName, controlRef: this.FuncBgColor.controlRef, value: this.bgColor},
                        {functionName: this.FuncTypingFont.functionName, controlRef: this.FuncTypingFont.controlRef, value: this.fontSelected},
                        {functionName: this.FuncTypingFontSize.functionName, controlRef: this.FuncTypingFontSize.controlRef, value: this.fontSizeSelected.toString()},
                        {functionName: this.FuncTypingFontColor.functionName, controlRef: this.FuncTypingFontColor.controlRef, value: this.textColor},
                        {functionName: this.FuncAllowBackspace.functionName, controlRef: this.FuncAllowBackspace.controlRef, value: this._allowBackspace.toString()},
                        {functionName: this.FuncBeepOnError.functionName, controlRef: this.FuncBeepOnError.controlRef, value: this._beepOnError.toString()},
                        {functionName: this.FuncUseKeyboard.functionName, controlRef: this.FuncUseKeyboard.controlRef, value: this._useKeyboard.toString()},
                        {functionName: this.FuncKeyboardLayout.functionName, controlRef: this.FuncKeyboardLayout.controlRef, value: this.keyboardLayoutSelected}
                        ];
        this.model.SaveUserSettings(settings);
        this.dialogRef.close();
        super.closeDialog();
    }

    public appearanceChangeHandler(appearance:string):void {
        if(appearance == 'Dark style') {
            this.isDarkAppearance = true;
        }
        else {
            this.isDarkAppearance = false;
        }
        this.model.UpdateUserPref("default_style", appearance, false);
    }

    public videoQualityChangeHandler(quality:string):void {
        if(quality == 'high') {
            this.isHighVidQuality = true;
        }
        else {
            this.isHighVidQuality = false;
        }
        this.model.UpdateUserPref("video_quality", quality, false);
    }

    public restoreDefaults():void {
        let userAControls:AControl[] = this.model.getUserAControls();
        let userAControlRefs:string[] = [];
        let combinedSettings:Setting[] = this.model.getDefaultSettings();
        let userSettings:Setting[] = this.model.getSettingsForUser();
        let groupSettings:Setting[] = this.model.getSettingsForGroup();
                
        for (let actrl of userAControls) {
            userAControlRefs.push(actrl.Control_ref);
        }

        this.model.DeleteUserPreferences(userAControlRefs);        			
        combinedSettings = AControlUtil.CombineSettings(combinedSettings, userSettings, groupSettings);

        for (let aControl of userAControls) {
            this.applySettings(combinedSettings, aControl);
            for (let groupSetting of groupSettings) {
                let controlCombinedKey: string = aControl.Control_ref + ":" + aControl.Function_name;
                if(controlCombinedKey == groupSetting.CombinedKey && groupSetting.Force_setting) {
                    if(groupSetting.Function_name == this.FuncBgColor.functionName) {
                        this.lock_fontSettings = true;
                    }
                    else {
                        this["lock_" + groupSetting.Function_name] = true;
                    }
                    break;
                }
            }
        }
    }

    public changeTheme(theme: string): void {
        if (theme == this.selectedTheme) return;
        this.selectedTheme = theme;
        UberReader.GetInstance().SetAppTheme(theme);
    }

    public dispose():void {}
}