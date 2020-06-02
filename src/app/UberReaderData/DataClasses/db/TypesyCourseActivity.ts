import { Course_Activity } from './Course_Activity';
import { Activity } from './Activity';
import { Text } from './Text';
import { AControl } from './AControl';
import { Setting } from './Setting';

export class TypesyCourseActivity {

    private course_name: string;
    private step_number: number;
    private course_activity: Course_Activity;
    private activity: Activity;
    private acontrols: AControl[];
    private text: Text;
    private settings: Setting[];

    public get Course_name(): string {
        return this.course_name;
    }

    public set Course_name(value: string) {
        this.course_name = value;
    }

    public get Step_number(): number {
        return this.step_number;
    }

    public set Step_number(value: number) {
        this.step_number = value;
    }

    public get Course_Activity(): Course_Activity {
        return this.course_activity;
    }

    public set Course_Activity(value: Course_Activity) {
        this.course_activity = value;
    }
    
    public get Activity(): Activity {
        return this.activity;
    }

    public set Activity(value: Activity) {
        this.activity = value;
    }

    public get AControls(): AControl[] {
        return this.acontrols;
    }

    public set AControls(value: AControl[]) {
        this.acontrols = value;
    }

    public get Text(): Text {
        return this.text;
    }

    public set Text(value: Text) {
        this.text = value;
    }

    public get Settings(): Setting[] {
        return this.settings;
    }

    public set Settings(value: Setting[]) {
        this.settings = value;
    }

    public static fromJson(jsonObject:any): TypesyCourseActivity {
        let retVal: TypesyCourseActivity = new TypesyCourseActivity();

        retVal.Course_name = jsonObject.Course_name;
        retVal.Step_number = jsonObject.Step_number;
        retVal.Course_Activity = Course_Activity.fromJson(jsonObject.Course_Activity);
        retVal.Activity = Activity.fromJson(jsonObject.Activity);
        if (jsonObject.Text != null) {
            retVal.Text = Text.fromJson(jsonObject.Text);
        }        

        retVal.AControls = [];
        for  (var aControlObject of jsonObject.AControls) {
            var aControl: AControl = AControl.fromJson(aControlObject);
            retVal.AControls.push(aControl);
        }

        retVal.Settings = [];
        for  (var settingObject of jsonObject.Settings) {
            var setting: Setting = Setting.fromJson(settingObject);
            retVal.Settings.push(setting);
        }

        return retVal;
    }
}