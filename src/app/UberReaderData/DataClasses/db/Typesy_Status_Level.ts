export class TypesyStatusLevel {
    private statusLevelID: number;
    private productID: number;
    private name: string;
    private requiredStatusPoints: number;
    private requiredTypingCompetency: number;
    private availableActivityIDs: string[];
    private availableBackgrounds: string[];
    private availableAvatarFeatures: string[];

    public get StatusLevelID(): number {
        return this.statusLevelID;
    }

    public set StatusLevelID(value: number) {
        this.statusLevelID = value;
    }

    public get ProductID(): number {
        return this.productID;
    }

    public set ProductID(value: number) {
        this.productID = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    public get RequiredStatusPoints(): number {
        return this.requiredStatusPoints;
    }

    public set RequiredStatusPoints(value: number) {
        this.requiredStatusPoints = value;
    }

    public get RequiredTypingCompetency(): number {
        return this.requiredTypingCompetency;
    }

    public set RequiredTypingCompetency(value: number) {
        this.requiredTypingCompetency = value;
    }

    public get AvailableActivityIDs(): string[] {
        return this.availableActivityIDs;
    }

    public set AvailableActivityIDs(value: string[]) {
        this.availableActivityIDs = value;
    }

    public get AvailableBackgrounds(): string[] {
        return this.availableBackgrounds;
    }

    public set AvailableBackgrounds(value: string[]) {
        this.availableBackgrounds = value;
    }

    public get AvailableAvatarFeatures(): string[] {
        return this.availableAvatarFeatures;
    }

    public set AvailableAvatarFeatures(value: string[]) {
        this.availableAvatarFeatures = value;
    }

    

    public static fromJson(jsonObject: any): TypesyStatusLevel {
        let retVal: TypesyStatusLevel = new TypesyStatusLevel();
        retVal.StatusLevelID = jsonObject.Status_level_id;
        retVal.ProductID = jsonObject.Product_id;
        retVal.Name = jsonObject.Name;
        retVal.RequiredStatusPoints = jsonObject.Required_status_points;
        retVal.RequiredTypingCompetency = jsonObject.Required_typing_competency;
        retVal.AvailableActivityIDs = jsonObject.Available_activity_ids.split(",");
        retVal.AvailableBackgrounds = jsonObject.Available_backgrounds.split(",");
        retVal.AvailableAvatarFeatures = jsonObject.Available_avatar_features.split(",");
        return retVal;
    }
}