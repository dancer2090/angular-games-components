export class Topic {
    private topicID: number;
    private parentTopicID: number;
    private name: string;
    private sequence: number;
    private icon: string;

    public get TopicID(): number {
        return this.topicID;
    }

    public set TopicID(value: number) {
        this.topicID = value;
    }

    public get ParentTopicID(): number {
        return this.parentTopicID;
    }

    public set ParentTopicID(value: number) {
        this.parentTopicID = value;
    }

    public get Name(): string {
        return this.name;
    }

    public set Name(value: string) {
        this.name = value;
    }

    public get Sequence(): number {
        return this.sequence;
    }

    public set Sequence(value: number) {
        this.sequence = value;
    }

    public get Icon(): string {
        return this.icon;
    }

    public set Icon(value: string) {
        this.icon = value;
    }

    public static fromJson(jsonObject: any): Topic {
        let retVal: Topic = new Topic();
        retVal.TopicID = jsonObject.Topic_id;
        retVal.ParentTopicID = jsonObject.Parent_topic_id;
        retVal.Name = jsonObject.Name;
        retVal.Sequence = jsonObject.Sequence;
        retVal.Icon = jsonObject.Icon;
        return retVal;
    }
}