import { LeaderboardItem } from './LeaderboardItem';

export class Leaderboard {
    private leaderboard: LeaderboardItem[] = [];
    
    public get Data(): LeaderboardItem[] {
        return this.leaderboard;
    }

    public static Init(leaderboard:any): Leaderboard {
        let retVal: Leaderboard = new Leaderboard();
        let data: LeaderboardItem[] = [];

        for(let item of leaderboard) {
            data.push(LeaderboardItem.fromJson(item));
        }

        retVal.leaderboard = data;
        return retVal;
    }
}