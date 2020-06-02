import { OnInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { ActivityService } from 'app/UberReaderActivities/activity.service';
import { GamesLibraryService } from 'app/UberReaderClient/UberReaderComponents/Controls/courses-train-view-controls/games-module/games-view.service';
import { UberApplicationEventTypes } from 'app/UberReaderData/Events/UberApplicationEventTypes';
import { ExercisesDialog } from 'app/UberReaderClient/UberReaderComponents/SharedModules/exercises-dialog-module/components/exercises-dialog.component';
import { UberApplicationEvent } from 'app/UberReaderData/Events/UberApplicationEvent';
import { NextRecommendedTextEvent } from 'app/UberReaderData/Events/NextRecommendedTextEvent';
import { Text } from 'app/UberReaderData/DataClasses/db/Text';
import { UberReaderLoadingMessage } from '../UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { ImportTextDocumentEvent } from 'app/UberReaderData/Events/ImportTextDocumentEvent';
import { ClosePopUpEvent } from 'app/UberReaderData/Events/ClosePopUpEvent';
import { CachedData } from 'app/UberReaderData/UberDataAccess/CachedData';
import { UberDataAccessRemoteService } from 'app/UberReaderData/UberDataAccess/uber-data-access-remote.service';
import { UserLessonPlan } from 'app/UberReaderData/DataClasses/db/User_Lesson_Plan';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GameExerciseService {
    private model: UberApplication;
    private currentTextExercise: Text;
    private previousExercises: Text[] = [];
    private hideNextButton: boolean = false;
    private hidePrevBtnTooltip: boolean = false;
    private hideNewExerciseTooltip: boolean = false;
    private disableTextCreation: boolean;
    private goToNextRecommendedExerciseSubscriber: any;
    private goToNextRecommendedExercise2Subscriber: any;
    private inputElement: HTMLInputElement;
    private addTextOptions: any[] = [
        { label: "Paste Text", data: "pasteText" },
        /*{ label: "Use URL", data: "useUrl" },
        {label: "Web Page", data: "webPage"},
        {label: "Document", data: "document"}*/
    ];

    constructor(
        private activityService: ActivityService,
        private gamesLibrary: GamesLibraryService,
        private matDialog: MatDialog,
        private cachedData: CachedData,
        private ar: UberDataAccessRemoteService
    ) {
        this.model = UberApplication.GetInstance();

        if (this.model.AllowImport) {
          this.addTextOptions.push({
              label: "Import Document",
              data: "document"
          });
        }

        this.gamesLibrary = GamesLibraryService.GetInstance();
        if (this.model.hasLoggedIn) {
            this.Init();
        }
        else {
            this.addNewUserEvent();
            // this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn); // * Default state
        }
    }

    private loggedIn = (event: UberApplicationEvent) => {
        this.model.removeEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
        this.Init();
    }

    public Init(): void {
        // if (this.model.AllowImport) {
        //     this.addTextOptions.push({
        //         label: "Document",
        //         data: "document"
        //     });
        // }

        this.model.addEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.currentTextUpdated);
        this.currentTextExercise = this.model.CurrentUserData.CurrentText;
        let existingTxtExercises = this.previousExercises.filter(txtExercise => txtExercise.Text_id === this.currentTextExercise.Text_id);
        if (existingTxtExercises.length === 0) {
          this.previousExercises.push(this.currentTextExercise);
        }
        this.hideNextButton = this.currentTextExercise.User_id != null && this.currentTextExercise.Wordlist_id != null;
        this.disableTextCreation = this.model.GetUserPref("disable_text_creation").toLowerCase() == "true" ? true : false;
        this.inputElement = document.createElement("input");
        this.inputElement.type = "file";
        this.inputElement.accept = ".txt, .doc, .docx, .pdf, .html, .htm";
        this.inputElement.onchange = (event) => {
            this.documentSelected(event);
        }

        if (this.goToNextRecommendedExerciseSubscriber) this.goToNextRecommendedExerciseSubscriber.unsubscribe();
        this.goToNextRecommendedExerciseSubscriber = this.activityService.goToNextRecommendedExercise.subscribe(() => this.GetNextExercise());

        if (this.goToNextRecommendedExercise2Subscriber) this.goToNextRecommendedExercise2Subscriber.unsubscribe();
        this.goToNextRecommendedExercise2Subscriber = this.activityService.goToNextRecommendedExercise2.subscribe(() => this.GetNextExercise2());
    }

    public OpenExercises(): void {
        if (!this.activityService.ActivityIsPaused) {
            this.activityService.pause(true);
        }

        this.matDialog.open(ExercisesDialog, {
            data: { openFromTest: false, isGameLoaded: this.activityService.ActivityIsPaused },
            disableClose: true,
            panelClass: 'exercises-dialog'
        });
    }

    public currentTextUpdated = (event: UberApplicationEvent) => {
        this.currentTextExercise = this.model.CurrentUserData.CurrentText;
        let existingTxtExercises = this.previousExercises.filter(txtExercise => txtExercise.Text_id === this.currentTextExercise.Text_id);
        if (existingTxtExercises.length === 0) {
          this.previousExercises.push(this.currentTextExercise);
        }
        this.hideNextButton = this.currentTextExercise.User_id != null && this.currentTextExercise.Wordlist_id != null;
    }

    public PrevBtn_mouseover() {
        this.hidePrevBtnTooltip = this.previousExercises.length < 2 ? true : false;
    }

    public GetPrevExercise() {
        if (this.previousExercises.length > 1) {
            this.previousExercises.pop();
            this.model.CurrentUserData.CurrentText = this.previousExercises.pop();
            if (this.gamesLibrary.CurrentTextChangeCallback) {
                this.gamesLibrary.CurrentTextChangeCallback();
            }
        }
    }

    public GetNextExercise(): void {
        // this.model.GetNextRecommendedText(this.nextRecommendedTextReceived, this.nextRecommendedTextError);
        this.GetNextExerciseFromCourses().subscribe(
            (recommendedText: Text) => {
                if (recommendedText != null) {
                    this.model.IsRecommendedTextAvailable = true;
                    this.model.CurrentUserData.CurrentText = recommendedText;
                } else {
                    this.model.IsRecommendedTextAvailable = false;
                }
        
                console.log('TCL: GameExerciseService -> this.gamesLibrary.CurrentTextChangeCallback', this.gamesLibrary.CurrentTextChangeCallback);
        
                if (this.gamesLibrary.CurrentTextChangeCallback) {
                    if (this.model.IsRecommendedTextAvailable == true) {
                        this.model.showMatSnackBar('flag', 'Your game exercise text has been updated to ' + recommendedText.Title);
                    }
                    this.gamesLibrary.CurrentTextChangeCallback();
                }
            },
            (errMsg: Error) => {
                console.log(errMsg);
                this.hideNextButton = true;
                this.model.IsRecommendedTextAvailable = false;
        
                if (this.gamesLibrary.CurrentTextChangeCallback) {
                    this.gamesLibrary.CurrentTextChangeCallback();
                }
            }
        );
    }

    public GetNextExercise2(): void {
        //this.model.GetNextRecommendedText2(this.nextRecommendedTextReceived, this.nextRecommendedTextError);
        this.GetNextExercise();
    }

    public GetNextExerciseFromCourses(): Observable<Text> {
        let currentTextId: number = this.model.CurrentUserData.CurrentText.Text_id
        let currentCourseIds: number[] = this.cachedData.GetCoursesWithProgress();
        return this.ar.post$("GetNextRecommendedCoursesText", [currentTextId, currentCourseIds], true, true).pipe(
            map(responseJSONObject => {
                if (responseJSONObject.result.Recommended_text == null) {
                    return null;
                }
                return Text.fromJson(responseJSONObject.result.Recommended_text);
            }),
            take(1)
        );
    }

    private nextRecommendedTextReceived = (event: NextRecommendedTextEvent) => {
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
        this.model.CurrentUserData.CurrentText = event.NextRecommendedText;

        if (event.NextRecommendedText !== null) {
            this.model.IsRecommendedTextAvailable = true;
        } else {
            this.model.IsRecommendedTextAvailable = false;
        }

        console.log('TCL: GameExerciseService -> privatenextRecommendedTextReceived -> this.gamesLibrary.CurrentTextChangeCallback', this.gamesLibrary.CurrentTextChangeCallback);

        if (this.gamesLibrary.CurrentTextChangeCallback) {
            if (this.model.IsRecommendedTextAvailable == true) {
                this.model.showMatSnackBar('flag', 'Your game exercise text has been updated to ' + event.NextRecommendedText.Title);
            }
            this.gamesLibrary.CurrentTextChangeCallback();
        }
    }

    private nextRecommendedTextError = (event: NextRecommendedTextEvent) => {
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
        event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
        console.log("no recommended text");
        this.hideNextButton = true;

        this.model.IsRecommendedTextAvailable = false;

        if (this.gamesLibrary.CurrentTextChangeCallback) {
            this.gamesLibrary.CurrentTextChangeCallback();
        }
    }

    public ToggleNewExerciseMenu() {
        this.hideNewExerciseTooltip = document.getElementsByClassName("mdl-menu__container is-upgraded is-visible").length > 0;
    }

    public AddTextSelectionChanged(selectedItem: any): void {
        if (this.model.CurrentUser.Is_trial && this.model.GetTrialMaxNumTexts() > 0 && this.model.GetUserProxyTexts() != null) {
            if (this.model.GetUserProxyTexts().length >= this.model.GetTrialMaxNumTexts()) {
                this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_TITLE"),
                    this.model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.model.GetUiTextByKey("DEFAULT_VIEW_UPGRADE_BTN"), this.trialTextLimitExceededHandler);
                return;
            }
        }

        switch (selectedItem.data) {
            case "pasteText":
                this.gamesLibrary.displayAddTextDialog(null);
                break;
            case "webPage":
                break;
            case "document":
                this.inputElement.click();
                break;
            case "useUrl":
                this.gamesLibrary.displayAddWebUrlTextDialog();
                break;
        }
    }

    public documentSelected(event): void {
        if (event.target.files && event.target.files[0]) {
            let filename = event.target.files[0].name;
            let reader = new FileReader();
            reader.onload = (event) => {
                let target: any = event.target;
                let doc = target.result.substr(target.result.indexOf("base64,") + 7);
                UberReaderLoadingMessage.GetInstance().Show(UberApplication.GetInstance().GetUiTextByKey("STAT_IMPORTING_TEXT_DOC"));
                this.model.ImportTextDoc(doc, filename, this.textDocImported, this.textDocImportError);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private textDocImported = (event: ImportTextDocumentEvent) => {
        if (event.target) {
            event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
            event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.textDocImportError);
        }

        UberReaderLoadingMessage.GetInstance().Hide();
        this.gamesLibrary.displayAddTextDialog(event._Text, "document");
    }

    private textDocImportError = (event: ImportTextDocumentEvent) => {
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.textDocImportError);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_MESSAGE"), this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_TITLE"), true);
    }

    private trialTextLimitExceededHandler = (event: ClosePopUpEvent) => {
        if (event.detail == ClosePopUpEvent.OK) {
            //TO DO UberReaderAccessor.GetUberReader().ActivateAccount(null, UberApplication.GetInstance().GetUiTextByKey("TRIAL_TEXT_ERROR_MESSAGE"));
        }
    }

    public get CurrentTextExercise(): Text {
        return this.currentTextExercise
    }

    public get PreviousExercises(): Text[] {
        return this.previousExercises;
    }

    public get HideNextButton(): boolean {
        return this.hideNextButton;
    }

    public get HidePrevBtnTooltip(): boolean {
        return this.hidePrevBtnTooltip;
    }

    public get HideNewExerciseTooltip(): boolean {
        return this.hideNewExerciseTooltip;
    }

    public get AddTextOptions(): any[] {
        return this.addTextOptions;
    }

    public get DisableTextCreation(): boolean {
        return this.disableTextCreation;
    }

    public addNewUserEvent(): void {
      this.model.addEventListener(UberApplicationEventTypes.NEW_USER, this.loggedIn);
    }

    public dispose(): void {
        if (this.goToNextRecommendedExercise2Subscriber) this.goToNextRecommendedExercise2Subscriber.unsubscribe();
        if (this.goToNextRecommendedExerciseSubscriber) this.goToNextRecommendedExerciseSubscriber.unsubscribe();
        if (this.gamesLibrary) this.gamesLibrary.CurrentTextChangeCallback = null;
        this.disableTextCreation = true;
        this.hideNextButton = true;
        this.previousExercises = [];
        this.currentTextExercise = new Text;
        this.model.CurrentActivity = null;
        this.addTextOptions = [];
    }

    ngOnDestroy() {
        this.model.removeEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.currentTextUpdated);
        this.previousExercises = [];
    }
}
