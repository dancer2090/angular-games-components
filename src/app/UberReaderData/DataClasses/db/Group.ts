import { StringUtils } from '../../Utils/StringUtils';
import { User_Group } from './User_Group';

export class Group {
    private _group_id: number;
    public get Group_id(): number {
        return this._group_id;
    }
    public set Group_id(value: number) {
        this._group_id = value;
    }

    private _group_name: string;
    public get Group_name(): string {
        return this._group_name;
    }
    public set Group_name(value: string) {
        this._group_name = value;
    }

    private _group_description: string;
    public get Group_description(): string {
        return this._group_description;
    }
    public set Group_description(value: string) {
        this._group_description = value;
    }

    private _user_groups: User_Group[];
    public get User_Groups(): User_Group[] {
        return this._user_groups;
    }
    public set User_Groups(value: User_Group[]) {
        this._user_groups = value;
    }

    private _purchase_id: number;
    public get Purchase_id(): number {
        return this._purchase_id;
    }
    public set Purchase_id(value: number) {
        this._purchase_id = value;
    }

    private _customer_id: number;
    public get Customer_id(): number {
        return this._customer_id;
    }
    public set Customer_id(value: number) {
        this._customer_id = value;
    }

    private is_clever_group: boolean;
    public get Is_clever_group(): boolean {
        return this.is_clever_group;
    }
    public set Is_clever_group(value: boolean) {
        this.is_clever_group = value;
    }

    private is_classlink_group: boolean;
    public get Is_classlink_group(): boolean {
        return this.is_classlink_group;
    }
    public set Is_classlink_group(value: boolean) {
        this.is_classlink_group = value;
    }

    private _grade: string;
    public get Grade(): string {
        return this._grade;
    }

    public set Grade(value: string) {
        this._grade = value;
    }

    private _group_grading_template_id: number;
    public get Group_grading_template_id(): number {
        return this._group_grading_template_id;
    }
    public set Group_grading_template_id(value: number) {
        this._group_grading_template_id = value;
    }

    public Clone(): Group {
        var retVal = new Group();
        retVal.Group_description = this.Group_description;
        retVal.Group_id = this.Group_id;
        retVal.Group_name = this.Group_name;
        retVal.Purchase_id = this.Purchase_id;
        retVal.Customer_id = this.Customer_id;
        retVal.Is_clever_group = this.Is_clever_group;
        retVal.Is_classlink_group = this.Is_classlink_group;
        retVal.Grade = this.Grade;
        retVal.Group_grading_template_id = this.Group_grading_template_id;
        return retVal;
    }

    public static fromJson(jsonObject: any): Group {
        var retVal: Group = new Group();
        retVal.Group_id = jsonObject.Group_id;
        retVal.Group_name = StringUtils.DecodeFromJSONUri(jsonObject.Group_name);
        retVal.Group_description = StringUtils.DecodeFromJSONUri(jsonObject.Group_description);
        retVal.Purchase_id = jsonObject.Purchase_id;
        retVal.Customer_id = jsonObject.Customer_id;
        retVal.Is_clever_group = jsonObject.Is_clever_group;
        retVal.Is_classlink_group = jsonObject.Is_classlink_group;
        retVal.Grade = jsonObject.Grade;
        retVal.Group_grading_template_id = jsonObject.Grading_template_id;

        retVal.User_Groups = [];
        if (jsonObject.User_Groups != null) {
            for (var userGroupObject of jsonObject.User_Groups) {
                var userGroup: User_Group = User_Group.fromJson(userGroupObject);
                retVal.User_Groups.push(userGroup);
            }
        }

        return retVal;
    }

    public toJson(): any {
        var jsonObject: any =
        {
            Group_id: this.Group_id,
            Group_Name: StringUtils.EncodeToJSONUri(this.Group_name),
            Group_description: StringUtils.EncodeToJSONUri(this.Group_description),
            Purchase_id: this.Purchase_id,
            Customer_id: this.Customer_id,
            Is_clever_group: this.Is_clever_group,
            Is_classlink_group: this.Is_classlink_group,
            Grade: this.Grade,
            Grading_template_id: this.Group_grading_template_id
        };
        return jsonObject;
    }
}