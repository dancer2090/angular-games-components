import { UberApplicationEvent } from './UberApplicationEvent';
import { LeaderboardItem } from '../DataClasses/other/LeaderboardItem';
import { Leaderboard } from '../DataClasses/other/Leaderboard';
import { DictionaryString } from '../Utils/Dictionary';

export class LeaderboardEvent extends UberApplicationEvent {
    public static LEADERBOARDS_RECEIVED: string = "leaderboardsReceived";
    public static LEADERBOARDS_ERROR: string = "leaderboardsError";
    
    private _leaderboards:DictionaryString<Leaderboard> = {};
    
    public get Leaderboards():DictionaryString<Leaderboard> {
        return this._leaderboards;
    }

    constructor(type:string, leaderboards:any)
    {
        super(type);
        
        for(let board in leaderboards) {
            this._leaderboards[board] = Leaderboard.Init(leaderboards[board]);
        }
    }
    
    public clone():UberApplicationEvent {
        return new LeaderboardEvent(this.type, this._leaderboards);
    }
}