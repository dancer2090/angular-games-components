import { ISO8601Util } from '../../Utils/ISO8601Util';

export class Admin_Live_User_Data {
    private _user_id: number;
    private _product_id: number;
    private _goal_1_value: number;
    private _goal_2_value: number;
    private _goal_1_target: number;
    private _goal_2_target: number;
    private _last_accessed:Date;
    private _working_on: string;
    private _status_points: number;
    private _grade: string;
    private _adjusted_speed: number;
    private _typing_competency: number;
    private _can_touch_type: boolean;

    public get User_id(): number {
        return this._user_id;
    }
    public set User_id(value: number) {
        this._user_id = value;
    }

    public get Status_points(): number {
        return this._status_points;
    }
    public set Status_points(value: number) {
        this._status_points = value;
    }

    public get Product_id(): number {
        return this._product_id;
    }
    public set Product_id(value: number) {
        this._product_id = value;
    }

    public get Goal_1_value(): number {
        return this._goal_1_value;
    }
    public set Goal_1_value(value: number) {
        this._goal_1_value = value;
    }

    public get Goal_2_value(): number {
        return this._goal_2_value;
    }
    public set Goal_2_value(value: number) {
        this._goal_2_value = value;
    }

    public get Goal_1_target(): number {
        return this._goal_1_target;
    }
    public set Goal_1_target(value: number) {
        this._goal_1_target = value;
    }

    public get Goal_2_target(): number {
        return this._goal_2_target;
    }
    public set Goal_2_target(value: number) {
        this._goal_2_target = value;
    }

    public get Last_accessed(): Date {
        return this._last_accessed;
    }
    public set Last_accessed(val: Date) {
        this._last_accessed = val;
    }
    
    public get Working_on(): string {
        return this._working_on;
    }
    public set Working_on(val: string) {
        this._working_on = val;
    }

    public get AdjustedSpeed(): number {
        return this._adjusted_speed;
    }

    public set AdjustedSpeed(value: number) {
        this._adjusted_speed = value;
    }

    public get TypingCompetency(): number {
        return this._typing_competency;
    }
    
    public set TypingCompetency(value: number) {
        this._typing_competency = value;
    }

    public get Grade(): string {
        return this._grade;
    }

    public set Grade(val: string) {
        this._grade = val;
    }

    public get CanTouchType(): boolean {
        return this._can_touch_type;
    }

    public set CanTouchType(value: boolean) {
        this._can_touch_type = value;
    }

    public static fromJson(jsonObject: any): Admin_Live_User_Data {
        let retVal: Admin_Live_User_Data = new Admin_Live_User_Data();
        retVal.User_id = jsonObject.User_id;
        retVal.Product_id = jsonObject.Product_id;
        retVal.Goal_1_value = jsonObject.Goal_1_value;
        retVal.Goal_2_value = jsonObject.Goal_2_value;
        retVal.Goal_1_target = jsonObject.Goal_1_target;
        retVal.Goal_2_target = jsonObject.Goal_2_target;
        retVal.Working_on = jsonObject.Working_on;
        retVal.AdjustedSpeed = jsonObject.Adjusted_goal_value;
        retVal.TypingCompetency = jsonObject.Typing_competency;
        retVal.Last_accessed = ISO8601Util.parseDateTimeString(jsonObject.Last_accessed);
        retVal.Status_points = jsonObject.Status_points;
        retVal.CanTouchType = jsonObject.Can_touch_type;
        return retVal;
    }
}