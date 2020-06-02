import { UberApplicationEvent } from './UberApplicationEvent';

export class RecommendedGoalSetEvent extends UberApplicationEvent
{
    public static GOAL_SET:string = "goalSet";
    
    constructor(type:string)
    {
        super(type);
    }
    
    /*override*/ public clone():UberApplicationEvent
    {
        return new RecommendedGoalSetEvent(this.type);
    }
    
}