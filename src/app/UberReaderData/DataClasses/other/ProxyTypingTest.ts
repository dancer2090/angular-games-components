/** 
 * Author: Jomelyn Aldave
 * Date Created: May 22, 2018
 * Description: Represents the typing test that teachers or admin users make from the Tests tab of the Admin Class View
 **/

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class ProxyTypingTest {
    private typingTestId: number;
    private groupId: number;
    private title: string;
    private description: string;
    private lastUpdated: Date;
    private allowBackspace: boolean;

    /** Make this test active immediately, otherwise, the user can turn it on later.*/
    private active: boolean;

    /** The number of times students are allowed to redo the test. Only their most recent result is recorded.*/
    private allowedAttempts: number;

    /** If true, the students will not be able to do anything else in Typesy until they complete the test.*/
    private forceStart: boolean;

    public get TypingTestId(): number {
        return this.typingTestId;
    }

    public set TypingTestId(value: number) {
        this.typingTestId = value
    }

    public get GroupId(): number {
        return this.groupId;
    }

    public set GroupId(value: number) {
        this.groupId = value
    }

    public get Title(): string {
        return this.title;
    }

    public set Title(value: string) {
        this.title = value
    }

    public get Description(): string {
        return this.description;
    }

    public set Description(value: string) {
        this.description = value
    }

    public get Active(): boolean {
        return this.active;
    }

    public set Active(value: boolean) {
        this.active = value
    }

    public get AllowedAttempts(): number {
        return this.allowedAttempts;
    }

    public set AllowedAttempts(value: number) {
        this.allowedAttempts = value
    }

    public get AllowBackspace(): boolean {
        return this.allowBackspace;
    }

    public set AllowBackspace(value: boolean) {
        this.allowBackspace = value
    }

    public get ForceStart(): boolean {
        return this.forceStart;
    }

    public set ForceStart(value: boolean) {
        this.forceStart = value
    }

    public get LastUpdated(): Date {
        return this.lastUpdated;
    }

    public set LastUpdated(value: Date) {
        this.lastUpdated = value
    }

    public static fromJson(jsonObject: any): ProxyTypingTest {
        let retVal: ProxyTypingTest = new ProxyTypingTest();
        retVal.TypingTestId = jsonObject.Typing_test_id;
        retVal.GroupId = jsonObject.Group_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Description = StringUtils.DecodeFromJSONUri(jsonObject.Description);
        retVal.Active = jsonObject.Active;
        retVal.AllowedAttempts = jsonObject.Allowed_attempts;
        retVal.AllowBackspace = jsonObject.Allow_backspace;
        retVal.ForceStart = jsonObject.Force_start;
        retVal.LastUpdated = ISO8601Util.parseDateTimeString(jsonObject.Date);
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            //Typing_test_id: this.TypingTestId,
            Group_id: this.GroupId,
            Title: StringUtils.EncodeToJSONUri(this.Title),
            Description: StringUtils.EncodeToJSONUri(this.Description),
            Active: this.Active,
            Allowed_attempts: this.AllowedAttempts,
            Allow_backspace: this.AllowBackspace,
            Force_start: this.ForceStart
            //Last_updated: ISO8601Util.formatExtendedDateTime(this.LastUpdated),
        };
        return jsonObject;
    }
}