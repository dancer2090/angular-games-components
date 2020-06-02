export class UserTypingCompetency {
    private userID: number;
    private competency: number;

    public get UserID(): number {
        return this.userID;
    }

    public set UserID(value: number) {
        this.userID = value;
    }

    public get Competency(): number {
        return this.competency;
    }

    public set Competency(value: number) {
        this.competency = value;
    }

    public static fromJson(jsonObject: any): UserTypingCompetency {
        let retVal: UserTypingCompetency = new UserTypingCompetency();
        retVal.UserID = jsonObject.User_id;
        retVal.Competency = jsonObject.Competency;
        return retVal;
    }
}