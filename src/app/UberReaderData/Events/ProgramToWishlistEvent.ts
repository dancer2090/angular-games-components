import { UberApplicationEvent } from './UberApplicationEvent';
import { Prep_Program } from '../DataClasses/db/Prep_Program';

export class ProgramToWishlistEvent extends UberApplicationEvent
	{
		public static PROGRAM_ADDED:string = "addedToWishlist";
		public static PROGRAM_NOT_ADDED:string = "notAddedToWishlist";
		
		public static PROGRAM_REMOVED:string = "removedfromWishlist";
		public static PROGRAM_NOT_REMOVED:string = "notRemovedFromWishlist";
		
		private _program:Prep_Program;
		public get course():Prep_Program
		{
			return this._program;
		}
		
		private _errorMessage:string;
		public get ErrorMessage():string
		{
			return this._errorMessage;
		}
		
		public constructor(type:string, program:Prep_Program, errMsg:string="")
		{
			super(type);
			this._program = program;
			this._errorMessage = errMsg;
		}
		
		public clone():UberApplicationEvent
		{
			return new ProgramToWishlistEvent(this.type, this._program, this._errorMessage);
		}
	}