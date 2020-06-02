export class LeaderboardItem {
    private name: string;
    private school: string;
    private country: string;
    private points: number;

    public get Name(): string {
        return this.name;
    }

    public get School(): string {
        return this.school;
    }

    public get Country(): string {
        return this.country;
    }

    public get Points(): number {
        return this.points;
    }

    public static fromJson(jsonObject:any): LeaderboardItem {
        let retVal:LeaderboardItem = new LeaderboardItem();

        if(jsonObject.Student_name != null) {
            retVal.name = jsonObject.Student_name;
        }
        else if(jsonObject.Group_name != null) {
            retVal.name = jsonObject.Group_name
        }
        else {
            retVal.name = jsonObject.Name;
        }
        
        retVal.school = jsonObject.School_name;
        retVal.country = jsonObject.Country != null ? jsonObject.Country : "";
        retVal.points = jsonObject.Points;
        return retVal;
    }
}