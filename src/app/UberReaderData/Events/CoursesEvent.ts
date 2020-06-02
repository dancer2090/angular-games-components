import { UberApplicationEvent } from './UberApplicationEvent';
import { Course } from '../DataClasses/db/Course';

export class CoursesEvent extends UberApplicationEvent
{
    public static COURSES_RECEIVED:string = "coursesReceived";
    public static GET_COURSES_ERROR:string = "getCoursesError";
    
    private _courses:Course[];
    public get Courses():Course[]
    {
        return this._courses;
    }
    
    constructor(type:string, courses:Course[])
    {
        super(type);
        this._courses = courses;
    }
}