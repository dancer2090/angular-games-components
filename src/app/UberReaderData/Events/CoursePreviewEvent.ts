import { UberApplicationEvent } from './UberApplicationEvent';
import { Course } from '../DataClasses/db/Course';

export class CoursePreviewEvent extends UberApplicationEvent
	{
		public static PREVIEW_LOADED:string = "previewLoaded";
		public static PREVIEW_ERROR:string = "previewFailed";
		public static PREVIEW_COURSE:string = "previewCourse";
		public static PREVIEW_COURSE_START:string = "previewStartCourse";
		
		private _course:Course;
		public get PreviewCourse():Course
		{
			return this._course;
		}
		
		private _errMsg:string;
		public get ErrorMessage():string
		{
			return this._errMsg;
		}
        
		constructor(type:string, course:Course, errMsg:string = "")
		{
			super(type);
			this._course = course;
			this._errMsg = errMsg;
		}
		
		public clone():UberApplicationEvent
		{
			return new CoursePreviewEvent(this.type, this._course, this._errMsg); 
		}
	}