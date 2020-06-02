/** 
 * Author: Jomelyn Aldave
 * Date Created: January 22, 2018
 * Description: Represents a typing test or a typing assignment that teachers or admins make from the Tests and Assignments tab of the Admin Class View
 * Version: February 2019 Release
 **/

import { ISO8601Util } from '../../Utils/ISO8601Util';
import { StringUtils } from '../../Utils/StringUtils';

export class TypingTask {
    private typingTaskId: number;
    private groupId: number;
    private title: string;
    private description: string;
    private timeAllowed: number;
    private allowedAttempts: number;
    private allowBackspace: boolean;
    private forceStart: boolean;
    private lastUpdated: Date;
    private endDate: Date;
    private startDate: Date;
    private dateCreated: Date;
    private active: boolean;
    private activityID: number;
    private taskType: string;
    private gradingtemplateID: number;
    private text: string;
    private exerciseTitle: string;
    private assignmentTypeID: number;

    public get TypingTaskId(): number {
        return this.typingTaskId;
    }

    public set TypingTaskId(value: number) {
        this.typingTaskId = value
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

    public get ExerciseTitle(): string {
        return this.exerciseTitle;
    }

    public set ExerciseTitle(value: string) {
        this.exerciseTitle = value
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

    public get TimeAllowed(): number {
        return this.timeAllowed;
    }

    public set TimeAllowed(value: number) {
        this.timeAllowed = value
    }

    public get DateCreated() {
        return this.dateCreated;
    }

    public set DateCreated(value: Date) {
        this.dateCreated = value
    }

    public get StartDate() {
        return this.startDate;
    }

    public set StartDate(value: Date) {
        this.startDate = value
    }

    public get EndDate() {
        return this.endDate;
    }

    public set EndDate(value: Date) {
        this.endDate = value
    }

    public get TaskType() {
        return this.taskType;
    }

    public set TaskType(value: string) {
        this.taskType = value
    }

    public get ActivityID() {
        return this.activityID;
    }

    public set ActivityID(value: number) {
        this.activityID = value
    }

    public get GradingTemplateID() {
        return this.gradingtemplateID;
    }

    public set GradingTemplateID(value: number) {
        this.gradingtemplateID = value
    }

    public get AssignmentTypeID() {
        return this.assignmentTypeID;
    }

    public set AssignmentTypeID(value: number) {
        this.assignmentTypeID = value
    }

    public static fromJson(jsonObject: any): TypingTask {        
        let retVal: TypingTask = new TypingTask();
        retVal.TypingTaskId = jsonObject.Typing_test_id;
        retVal.GroupId = jsonObject.Group_id;
        retVal.Title = StringUtils.DecodeFromJSONUri(jsonObject.Title);
        retVal.Description = StringUtils.DecodeFromJSONUri(jsonObject.Description);
        retVal.TimeAllowed = jsonObject.Time_allowed;
        retVal.AllowedAttempts = jsonObject.Allowed_attempts;
        retVal.AllowBackspace = jsonObject.Allow_backspace;
        retVal.ForceStart = jsonObject.Force_start;
        retVal.LastUpdated = jsonObject.Last_updated;
        retVal.DateCreated = ISO8601Util.parseDateTimeString(jsonObject.Date_created);
        retVal.StartDate = ISO8601Util.parseDateTimeString(jsonObject.Start_date);
        retVal.EndDate = ISO8601Util.parseDateTimeString(jsonObject.End_date);
        retVal.Active = jsonObject.Active;
        retVal.ActivityID = jsonObject.Activity_id;
        retVal.TaskType = jsonObject.Task_type;
        retVal.ExerciseTitle = StringUtils.DecodeFromJSONUri(jsonObject.Exercise_title);
        retVal.Content = StringUtils.DecodeFromJSONUri(jsonObject.Text);
        retVal.GradingTemplateID = jsonObject.Grading_template_id;
        retVal.AssignmentTypeID = jsonObject.Assignment_type_id;
        return retVal;
    }

    public toJson(): any {
        let jsonObject: any = {
            Typing_test_id: this.TypingTaskId,
            Group_id: this.GroupId,
            Title: StringUtils.EncodeToJSONUri(this.Title),
            Description: StringUtils.EncodeToJSONUri(this.Description),
            Time_allowed: this.TimeAllowed,
            Allowed_attempts: this.AllowedAttempts,
            Allow_backspace: this.AllowBackspace,
            Force_start: this.ForceStart,
            //Last_updated: ISO8601Util.formatExtendedDateTime(this.LastUpdated),
            Active: this.Active,
            Activity_id: this.ActivityID,
            Task_type: this.TaskType,
            Grading_template_id: this.GradingTemplateID,
            Text: StringUtils.EncodeToJSONUri(this.Content),
            Exercise_title: StringUtils.EncodeToJSONUri(this.ExerciseTitle),
            Start_date: this.StartDate != null ? ISO8601Util.formatExtendedDateTime(this.StartDate) : null,
            End_date: this.EndDate != null ? ISO8601Util.formatExtendedDateTime(this.EndDate) : null,
            Assignment_type_id: this.AssignmentTypeID
        };
        
        return jsonObject;
    }
}