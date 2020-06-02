import { UberApplicationEvent } from './UberApplicationEvent';
import { ProxyCourse } from '../DataClasses/other/ProxyCourse';

export class CourseToWishlistEvent extends UberApplicationEvent
	{
		public static COURSE_ADDED:string = "addedToWishlist";
		public static COURSE_NOT_ADDED:string = "notAddedToWishlist";
		
		public static COURSE_REMOVED:string = "removedfromWishlist";
		public static COURSE_NOT_REMOVED:string = "notRemovedFromWishlist";
		
		private _course:ProxyCourse;
		public get course():ProxyCourse
		{
			return this._course;
		}
		
		private _errorMessage:string;
		public get ErrorMessage():string
		{
			return this._errorMessage;
		}
		
		public constructor(type:string, course:ProxyCourse, errMsg:string="")
		{
			super(type);
			this._course = course;
			this._errorMessage = errMsg;
		}
		
		public clone():UberApplicationEvent
		{
			return new CourseToWishlistEvent(this.type, this._course, this._errorMessage);
		}
	}