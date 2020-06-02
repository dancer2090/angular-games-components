export class ProxySchool {
    private _customerId: number;
    private _school_name: string;    
    private _num_students: number;
    private _num_teachers: number;
    private _mins_used: number;
    private _average_typing_competency: number;
    private _organization_logo: string;

    constructor(jsonObject: any) {
        this.CustomerId = jsonObject.CustomerId;
        this.School_name = jsonObject.School_name;
        this.Num_students = jsonObject.Num_students;
        this.Num_teachers = jsonObject.Num_teachers;
        this.Mins_used = jsonObject.Mins_used;
        this.Average_typing_competency = jsonObject.Average_typing_competency;
        this.Organization_logo = jsonObject.Organization_logo;
    }

    public get CustomerId(): number {
        return this._customerId;
    }

    public set CustomerId(value: number) {
        this._customerId = value;
    }

    public get School_name(): string {
        return this._school_name;
    }

    public set School_name(value: string) {
        this._school_name = value ? value : "";
    }

    public get Num_students(): number {
        return this._num_students;
    }

    public set Num_students(value: number) {
        this._num_students = value;
    }

    public get Num_teachers(): number {
        return this._num_teachers;
    }

    public set Num_teachers(value: number) {
        this._num_teachers = value;
    }

    public get Mins_used(): number {
        return this._mins_used;
    }

    public set Mins_used(value: number) {
        this._mins_used = value;
    }

    public get Average_typing_competency(): number {
        return this._average_typing_competency;
    }

    public set Average_typing_competency(value: number) {
        this._average_typing_competency = value;
    }

    public get Organization_logo(): string {
        return this._organization_logo;
    }

    public set Organization_logo(value: string) {
        this._organization_logo = value;
    }
}