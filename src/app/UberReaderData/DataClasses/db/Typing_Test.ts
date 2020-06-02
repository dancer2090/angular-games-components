/** 
 * Author: Jomelyn Aldave
 * Date Created: May 10, 2018
 * Description: Represents the typing test that teachers or admin users make from the Tests tab of the Admin Class View
 **/

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class TypingTest {
    private typingTestId: number;
    private groupId: number;
    private title: string;
    private description: string;
    private text: string;
    private lastUpdated: Date;
    private allowBackspace: boolean;
    private time_allowed: number;
    private start_date: Date;
    private end_date: Date;

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

    public get Content(): string {
        return this.text;
    }

    public set Content(value: string) {
        this.text = value
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

    public get Time_allowed(): number {
        return this.time_allowed;
    }

    public set Time_allowed(value: number) {
        this.time_allowed = value
    }

    public get Start_date() {
        return this.start_date;
    }

    public set Start_date(value: Date) {
        this.start_date = value
    }

    public get End_date() {
        return this.end_date;
    }

    public set End_date(value: Date) {
        this.end_date = value
    }

    public static fromJson(jsonObject: any): TypingTest {
        let retVal: TypingTest = new TypingTest();
        retVal.TypingTestId = jsonObject.Typing_test_id;
        retVal.GroupId = jsonObject.Group_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Description = StringUtils.DecodeFromJSONUri(jsonObject.Description);
        retVal.Content = StringUtils.DecodeFromJSONUri(jsonObject.Text);
        retVal.Active = jsonObject.Active;
        retVal.AllowedAttempts = jsonObject.Allowed_attempts;
        retVal.AllowBackspace = jsonObject.Allow_backspace;
        retVal.ForceStart = jsonObject.Force_start;
        retVal.LastUpdated = ISO8601Util.parseDateTimeString(jsonObject.Date);
        retVal.Time_allowed = jsonObject.Time_allowed;
        retVal.Start_date = ISO8601Util.parseDateTimeString(jsonObject.Start_date);
        retVal.End_date = ISO8601Util.parseDateTimeString(jsonObject.End_date);
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            Typing_test_id: this.TypingTestId,
            Group_id: this.GroupId,
            Title: StringUtils.EncodeToJSONUri(this.Title),
            Description: StringUtils.EncodeToJSONUri(this.Description),
            Text: StringUtils.EncodeToJSONUri(this.Content),
            Active: this.Active,
            Allowed_attempts: this.AllowedAttempts,
            Allow_backspace: this.AllowBackspace,
            Force_start: this.ForceStart,
            Time_allowed: this.Time_allowed
            //Last_updated: ISO8601Util.formatExtendedDateTime(this.LastUpdated),
        };

        if (this.Start_date != null) {
            jsonObject.Start_date = ISO8601Util.formatExtendedDateTime(this.start_date);
        }

        if (this.End_date != null) {
            jsonObject.End_date = ISO8601Util.formatExtendedDateTime(this.End_date);
        }
        
        return jsonObject;
    }
}