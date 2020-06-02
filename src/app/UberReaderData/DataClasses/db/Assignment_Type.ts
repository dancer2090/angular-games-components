export enum AssignmentTypes {
    Typing = 'Typing',
    Spelling = 'Spelling',
    Vocab = 'Vocab'
}

export class Assignment_Type {
    private assignmentTypeID: number;
    private productID: number;
    private name: string;
    private description: string;
    private type: string;
    private requiresVocab: boolean;
    private icon: string;
    private supportedActivities: string;
    private sequence: number;

    public get AssignmentTypeID(): number {
        return this.assignmentTypeID;
    }

    public set AssignmentTypeID(value: number) {
        this.assignmentTypeID = value;
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
    
    public get Description(): string {
        return this.description;
    }

    public set Description(value: string) {
        this.description = value;
    }

    public get Type(): string {
        return this.type;
    }

    public set Type(value: string) {
        this.type = value;
    }

    public get RequiresVocab(): boolean {
        return this.requiresVocab;
    }

    public set RequiresVocab(value: boolean) {
        this.requiresVocab = value;
    }

    public get Icon(): string {
        return this.icon;
    }

    public set Icon(value: string) {
        this.icon = value;
    }

    public get SupportedActivities(): string {
        return this.supportedActivities;
    }

    public set SupportedActivities(value: string) {
        this.supportedActivities = value;
    }

    public get Sequence(): number {
        return this.sequence;
    }

    public set Sequence(value: number) {
        this.sequence = value;
    }

    public static fromJson(jsonObject:any): Assignment_Type {
        let retVal:Assignment_Type = new Assignment_Type();
        retVal.AssignmentTypeID = jsonObject.Assignment_type_id;
        retVal.ProductID = jsonObject.Product_id;
        retVal.Name = jsonObject.Name;
        retVal.Description = jsonObject.Description;
        retVal.Type = jsonObject.Type;
        retVal.RequiresVocab = jsonObject.Requires_vocab;
        retVal.Icon = jsonObject.Icon;
        retVal.SupportedActivities = jsonObject.Supported_activity_ids;
        retVal.Sequence = jsonObject.Sequence;
        return retVal;
    }
}
