import { ProxySchool } from './ProxySchool';

export class School extends ProxySchool { 
    private _total_lessons_completed: number;
    private _total_tests_completed: number;

    constructor(jsonObject) {
        super(jsonObject);
        this.Total_lessons_completed = jsonObject.Total_lessons_completed;
        this.Total_tests_completed = jsonObject.Total_tests_completed;
    }

    public get Total_lessons_completed(): number {
        return this._total_lessons_completed;
    }

    public set Total_lessons_completed(value: number) {
        this._total_lessons_completed = value;
    }

    public get Total_tests_completed(): number {
        return this._total_tests_completed;
    }

    public set Total_tests_completed(value: number) {
        this._total_tests_completed = value;
    }
}