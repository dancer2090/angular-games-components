import { UberApplicationEvent } from './UberApplicationEvent';

export class DefaultViewEvent extends UberApplicationEvent
{
    public static GO_TO_COURSE:string = "goToCourse";
    public static GO_TO_LIBRARY:string = "goToLibrary";
    public static GO_TO_ACTIVITY:string = "goToActivity";
    public static SEND_FEEDBACK:string = "sendFeedback";
    public static SPREED:string = "spreed";		
    
    constructor(type:string)
    {
        super(type);
    }
    
    public /*override*/ clone():UberApplicationEvent
    {
        return new DefaultViewEvent(this.type);
    }
}