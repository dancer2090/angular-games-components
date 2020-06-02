
import { UberApplicationEvent } from '../../Events/UberApplicationEvent';
import { TypesyCourseActivity } from './TypesyCourseActivity';

export class TypesyCourseActivityEvent extends UberApplicationEvent {
    public static TYPESY_COURSE_ACTIVITY_RECEIVED: string = "typesyCourseActivityReceived";
    public static TYPESY_COURSE_ACTIVITY_ERROR: string = "typesyCourseActivityError";

    private typesyCourseActivity: TypesyCourseActivity;
    private errorMessage: string;

    public get TypesyCourseActivity(): TypesyCourseActivity {
        return this.typesyCourseActivity;
    }

    public get ErrorMessage(): string {
        return this.errorMessage;
    }

    constructor(type: string, typesyCourseActivity: TypesyCourseActivity, errorMessage: string = null) {
        super(type);
        this.typesyCourseActivity = typesyCourseActivity;
        this.errorMessage = errorMessage;
    }

    public clone(): UberApplicationEvent {
        return new TypesyCourseActivityEvent(this.type, this.typesyCourseActivity, this.errorMessage);
    }
}