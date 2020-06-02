import { UberReaderLoadingMessage } from '../../UberReaderLoadingMessage';
import { Component, OnInit } from '@angular/core';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { Feedback } from '../../../../../UberReaderData/DataClasses/db/Feedback';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { Word_User } from '../../../../../UberReaderData/DataClasses/db/Word_User';
import { StringUtils } from '../../../../../UberReaderData/Utils/StringUtils';
import { UberApplicationEvent } from '../../../../../UberReaderData/Events/UberApplicationEvent';
import { UberApplicationEventTypes } from '../../../../../UberReaderData/Events/UberApplicationEventTypes';
import { Course_Activity } from '../../../../../UberReaderData/DataClasses/db/Course_Activity';
import { Course } from '../../../../../UberReaderData/DataClasses/db/Course';
import { Activity } from '../../../../../UberReaderData/DataClasses/db/Activity';
import { ParentDialog } from '../../ParentDialog';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'feedback-dialog',
    styleUrls: ['./feedback-dialog.component.css'],
    templateUrl: './feedback-dialog.component.html'
})
export class FeedbackDialog extends ParentDialog implements OnInit {
    private model: UberApplication;
    private feedback: Feedback;
    private activity: Activity;
    private course: Course;
    private courseActivity: Course_Activity;

    public feedbackTypes: string[] = [];
    public feedbackSources: string[] = [];
    public feedbackDescription: string = "";
    public feedbackType: string = "";
    public feedbackSource: string = "";
    public enableOkBtn:boolean;

    constructor(public dialogRef: MatDialogRef<FeedbackDialog>) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
    }

    ngOnInit() {
        this.feedback = new Feedback();
        this.feedbackTypes = this.model.GetFeedbackTypes();

        let feedbackSources = this.model.GetFeedbackSources();
        for (let feedbackSource of feedbackSources) {
            if ((feedbackSource == "Text" && this.model.CurrentProduct.DisplayText == false) || (feedbackSource == "Wordlist" && this.model.CurrentProduct.DisplayVocab == false)) {
                continue;
            }

            /*if (feedbackSource == "Activity" && _activity != null) {
                radioButtonLabel = "Activity: " + _activity.Activity_name;
            }
            else if (feedbackSource == "Course" && _course != null) {
                radioButtonLabel = "Course: " + _course.Course_name;
            }*/
            this.feedbackSources.push(feedbackSource);
        }
    }

    public InitActivity(activity: Activity): void {
        this.activity = activity;
        this.feedback.Activity_id = activity.Activity_id;
    }

    public InitCourse(course: Course, courseActivity: Course_Activity): void {
        this.course = course;
        this.courseActivity = courseActivity;
        this.feedback.Course_id = course.Course_id;
        this.feedback.Course_activity_id = courseActivity.Course_activity_id;
    }

    public sendFeedback(): void {
        let errors: string[] = this.validateInput();
        if (errors.length == 0) {
            if (this.model.CurrentUser) {
                this.feedback.User_id = this.model.CurrentUser.User_id;
                this.feedback.Facebook_user = this.model.CurrentUser.FacebookUser;
                this.feedback.Google_user = this.model.CurrentUser.GoogleUser;
            }
            else {
                this.feedback.User_id = 0;
                this.feedback.Facebook_user = false;
                this.feedback.Google_user = false;
                this.feedback.addData("user", "null");
            }
            this.feedback.Product_id = AppSettings.CurrentProductId;
            if (this.model.CurrentProduct) {
                this.feedback.Product_data_version = this.model.CurrentProduct.Product_Data_Version;
                if (this.model.CurrentProduct.DisplayText && this.model.CurrentUserData.CurrentText) {
                    this.feedback.addData("current_text_id", this.model.CurrentUserData.CurrentText.Text_id.toString());
                    this.feedback.addData("current_text_sentence", this.model.CurrentUserData.CurrentTextSentence.toString());
                }
                else if (this.model.CurrentProduct.DisplayVocab && this.model.CurrentWordlist) {
                    this.feedback.addData("current_wordlist_id", this.model.CurrentWordlist.Wordlist_id.toString());
                    this.feedback.addData("current_word_id", this.model.CurrentWord.Word_id.toString());
                    let wordUser: Word_User = this.model.LookupWordUserRecord(this.model.CurrentWord.Word_id);
                    if (wordUser) {
                        this.feedback.addData("word_user_id", wordUser.Word_user_id.toString());
                        this.feedback.addData("word_user_notes", StringUtils.EncodeToJSONUri(wordUser.Notes));
                        if (wordUser.Default_sense_id != null) {
                            this.feedback.addData("default_sense_id", wordUser.Default_sense_id.toString());
                        }
                    }
                }
            }
            else {
                this.feedback.Product_data_version = null;
                this.feedback.addData("product", "null");
            }

            this.feedback.Client_OS = AppSettings.OsString;
            this.feedback.Client_type = AppSettings.GetClientTypeString();
            this.feedback.Feedback_type = this.feedbackType;
            this.feedback.Feedback_source = this.feedbackSource;
            this.feedback.User_notes = this.feedbackDescription;
            //this.feedback.addData("Client_OS", Capabilities.os);
            //this.feedback.addData("has_printing", Capabilities.hasPrinting.toString());
            //this.feedback.addData("capabilities_server_string", Capabilities.serverString);
            this.feedback.addData("school_build", AppSettings.schoolBuild.toString());
            this.feedback.addData("local_client_time", (new Date()).toString());
            this.feedback.addData("ui_language_id", this.model.GetUserPref("ui_language_id"));

            UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_SENDINGthis.feedback"));
            this.model.sendFeedback(this.feedback, this.feedbackSent, this.feedbackSendError);
        }
        else {
            let errorText: string = "";
            for (let errorString of errors) {
                if (errorText.length > 0) {
                    errorText += "<br>";
                }
                errorText += errorString;
            }
            this.model.showMdlAlertDialog(errorText, this.model.GetUiTextByKey("FEEDBACK_VALIDATION_ERROR_TITLE"), true);
        }
    }

    private feedbackSent = (event: UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.FEEDBACK_SENT, this.feedbackSent);
        event.target.removeEventListener(UberApplicationEventTypes.FEEDBACK_SEND_ERROR, this.feedbackSendError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("SEND_FEEDBACK_SUCCESS"), "", false, this.model.GetUiTextByKey("BTN_OK_LABEL"), () => this.closeDialog());
    }

    private feedbackSendError = (event: UberApplicationEvent) => {
        event.target.removeEventListener(UberApplicationEventTypes.FEEDBACK_SENT, this.feedbackSent);
        event.target.removeEventListener(UberApplicationEventTypes.FEEDBACK_SEND_ERROR, this.feedbackSendError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("HTTPSERVICE_FAULT2"), this.model.GetUiTextByKey("HTTPSERVICE_FAULT_TITLE"), true);
    }

    private validateInput(): string[] {
        let errors: string[] = [];

        if (this.feedbackType == null || this.feedbackType == "") {
            errors.push(this.model.GetUiTextByKey("FEEDBACK_ERROR_NO_TYPE_SELECTED"));
        }
        // if (this.feedbackSource == null || this.feedbackSource == "") {
        //     errors.push(this.model.GetUiTextByKey("FEEDBACK_ERROR_NO_SOURCE_SELECTED"));
        // }
        return errors;
    }

    public enableOkButton(): void {
      //  this.enableOkBtn = this.feedbackType != "" && this.feedbackSource != "" && StringUtils.TrimString(this.feedbackDescription).length > 0;
        this.enableOkBtn = this.feedbackType != "" && StringUtils.TrimString(this.feedbackDescription).length > 0;
    }

    public dispose(): void { }
}