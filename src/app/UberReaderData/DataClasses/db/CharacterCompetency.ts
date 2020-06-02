
export class CharacterCompetency {
    private character: string;
    private total_competency : number;

    public get Character(): string {
        return this.character;
    }

    public set Character(value: string) {
        this.character = value
    }

    public get Total_competency(): number {
        return this.total_competency;
    }

    public set Total_competency(value: number) {
        this.total_competency = value
    }

    public static fromJson(jsonObject: any): CharacterCompetency {        
        let retVal: CharacterCompetency = new CharacterCompetency();
        retVal.Character = jsonObject.Character;
        retVal.Total_competency = jsonObject.Total_competency;
        return retVal;
    }
}