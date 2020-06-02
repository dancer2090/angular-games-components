import { AControl } from '../../../UberReaderData/DataClasses/db/AControl';
import { GenericControl } from './generic-control';
import { TextControl } from './text-control.component';

export class AControlFactory {
    public static GetAControl(ctrl:AControl, typeName:String):GenericControl {
        let retVal:GenericControl;
        switch (typeName) {
            case "font":
                //retVal = new FontControl();
                //(retVal as FontControl).init();
                //break;
            case "inc_dec":
                //retVal = new IncDecControl2();
                //(retVal as IncDecControl2).init();
                //break;
            case "auto_speed_inc":
                //retVal = new PushControl();
                //break;
            case "color":
                //retVal = new ColorControl();
                //break;
            case "drop_down":
                //retVal = new DropDownControl();
                //(retVal as DropDownControl).initCombo(ctrl.Ddl_values);
                //break;
            case "checkbox":
                //retVal = new CheckBoxControl();
                //break;
            case "text":
                //retVal = new TextControl();
                //break;
            case "font_activity":
                //retVal = new ActivityFontControl();
                //(retVal as ActivityFontControl).init();
                //break;
            case "font_typing":
                //retVal = new TypingFontControl();
                //(retVal as TypingFontControl).init();
                //break;
            default:
                retVal = new TextControl();
                //var str:String = UberApplication.GetExistingInstance().GetUiTextByKey("ERR_ACONTROL_NOT_FOUND_MESSAGE").replace("{0}",typeName); 
                //throw new Error(str);
        }
        if(retVal == null) return null;
        retVal.Required_restart = ctrl.Requires_restart;
        retVal.ControlRef = ctrl.Control_ref;
        retVal.Name = ctrl.Label;
        retVal.FunctionName = ctrl.Function_name;
        retVal.MinValue = ctrl.Min_value;
        retVal.MaxValue = ctrl.Max_value;
        retVal.Label = ctrl.Label;
        return retVal;
    }
}