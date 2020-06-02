export class UserNotification {
    private notificationID: number;
    private dateCreated: Date;
    private notificationText: string;
    private buttonText: string;
    private link: string;

    public get NotificationID(): number {
        return this.notificationID;
    }

    public set NotificationID(value: number) {
        this.notificationID = value;
    }

    public get DateCreated(): Date {
        return this.dateCreated;
    }

    public set DateCreated(value: Date) {
        this.dateCreated = value;
    }

    public get NotificationText(): string {
        return this.notificationText;
    }

    public set NotificationText(value: string) {
        this.notificationText = value;
    }

    public get ButtonText(): string {
        return this.buttonText;
    }

    public set ButtonText(value: string) {
        this.buttonText = value;
    }

    public get Link(): string {
        return this.link;
    }

    public set Link(value: string) {
        this.link = value;
    }

    public Clone(): UserNotification {
        var retVal = new UserNotification();
        retVal.NotificationID = this.NotificationID;
        retVal.DateCreated = this.DateCreated;
        retVal.notificationText = this.NotificationText;
        retVal.ButtonText = this.ButtonText;
        retVal.Link = this.Link;
        return retVal;
    }

    public static fromJson(jsonObject: any): UserNotification {
        var retVal: UserNotification = new UserNotification();
        retVal.NotificationID = jsonObject.Notification_id;
        retVal.DateCreated = jsonObject.Date_created;
        retVal.notificationText = jsonObject.Notification_text;
        retVal.ButtonText = jsonObject.Button_text;
        retVal.Link = jsonObject.Link;
        return retVal;
    }
}