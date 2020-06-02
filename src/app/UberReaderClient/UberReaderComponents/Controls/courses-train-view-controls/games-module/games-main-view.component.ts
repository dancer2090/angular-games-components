import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticatedEvent } from '../../../../../UberReaderData/Events/UserAuthenticatedEvent';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { UberReader } from '../../../../UberReader';
import { UberReaderStateData } from '../../../../UberReaderStateData';
import { ScreenState } from '../../../../../UberReaderData/Utils/ScreenState';
import { AppSettings } from '../../../../../UberReaderData/AppSettings';
import { ActivityService } from '../../../../../UberReaderActivities/activity.service';
import { GameExerciseService } from 'app/services/game-exercise.service';
import { GamesLibraryService } from './games-view.service';
import { MatDialog } from '@angular/material';
import { SuccessStatus } from '../../home-view-controls/success-status-section/success-status.component';
import { ExternalResourceLoaderService } from 'app/UberReaderClient/UberReaderComponents/SharedModules/shared-components-module/services/ExternalResourceLoader.service';
import { UserStatusService } from '../../status-points-control/user-status.service';

@Component({
    selector: 'games-main-view',
    styleUrls: ['./games-main-view.component.css'],
    template: `
        <img class="hide" preloadDirective [sources]='imageToPreload'/>
        <div id="mainContainer">
            <div class="mdl-grid subheadline" [class.hide]="header != 'Play'">
                <div class="mdl-cell mdl-cell--12-col subheadline--inner">
                    <div class="mdl-grid subheadline--grid">
                        <div class="mdl-cell mdl-cell--3-col">
                            <h4 [class.hide]="header != 'Play'" class="subheadline--label">Play</h4>
                            <div [class.hide]="header == 'Play' || !activityService.IsActivityView"  style="margin: -15px 0px 0px;">
                                <button mdl-button mdl-button-type="raised"  mdl-ripple class="skip" (click)="skipToNextRecommendedActivity()" style="#616161">next recommended game<mdl-icon>navigate_next</mdl-icon></button>
                                <mdl-icon id="helpButton" (click)="showTrainingHelp()">help_outline</mdl-icon>
                            </div>
                            <!--<h4 class="mdl-color-text--grey-600 page-headline">{{ header }}</h4> -->
                        </div>
                        <div class="mdl-cell mdl-cell--9-col subheadline--right-column">
                          <div id="container--header-functions">
                            <div class="exerciseLabel" [mdl-tooltip]="currentTextTt" (click)="gameExerciseService.OpenExercises()">
                              <div class="exercise-headline">
                                <span id="ttHeadline">{{ gameExerciseService.CurrentTextExercise?.Title }}</span>
                              </div>
                              <mdl-tooltip #currentTextTt="mdlTooltip">Current exercise used for typing games. This is chosen automatically based on your skills and progress. Or click to select a custom exercise.</mdl-tooltip>
                            </div>

                            <div class="mainButtons">
                              <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="prevBtn" [disabled]="gameExerciseService.PreviousExercises.length < 2" (click)="[gameExerciseService.GetPrevExercise(), gameExerciseService.PrevBtn_mouseover()]" (mouseover)="gameExerciseService.PrevBtn_mouseover()"><mdl-icon>navigate_before</mdl-icon></button>
                              <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="nextBtn" (click)="activityService.goToNextRecommendedExercise.next()"><mdl-icon>navigate_next</mdl-icon></button>
                              <!-- <button mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="newBtn" #addTextBtn="mdlButton" [class.hide]="gameExerciseService.DisableTextCreation"
                                (click)="addTextMenu.toggle($event, addTextBtn); gameExerciseService.ToggleNewExerciseMenu();"
                                (mouseover)="gameExerciseService.ToggleNewExerciseMenu()">
                                <span class="icon-library_add_outline"></span>
                              </button> !-->
                              <mdl-menu #addTextMenu="mdlMenu" mdl-menu-position="bottom-right">
                                <mdl-menu-item *ngFor="let addTextOption of gameExerciseService.AddTextOptions" mdl-ripple (click)="gameExerciseService.AddTextSelectionChanged(addTextOption)">{{ addTextOption.label }}</mdl-menu-item>
                              </mdl-menu>
                            </div>
                            <mdl-tooltip #prevBtn="mdlTooltip" [class.hide]="gameExerciseService.HidePrevBtnTooltip">Previous exercise</mdl-tooltip>
                            <mdl-tooltip #nextBtn="mdlTooltip">Next recommended exercise</mdl-tooltip>
                            <!-- <mdl-tooltip #newBtn="mdlTooltip" [class.hide]="gameExerciseService.HideNewExerciseTooltip">Create new exercise</mdl-tooltip> !-->
                          </div>
                        
                            <div id="container--status-info">
                              <div class="row1" id="status-info">
                                <div id="inner-row1">
                                  <div #miniOdometer id="odometer-mini" class="odometer">0</div>
                                </div>
                                <div id="inner-row2">
                                  <img src="{{ 'assets/icon/mini-trophies/' + currentLevel + '-trophy.svg' | resourceLoc }}" style="width: 32px; margin: 2px 3px; display: inline-block;"/>
                                </div>
                              </div>
                              <mdl-tooltip #typesyLeveltt="mdlTooltip" class="typesyLeveltt"> Use Typesy, have fun, and earn Typesy Points. You get points by doing courses and playing games. Earn enough points and you will progress to the next level. With each new level you will unlock new games, avatar features, content, and backgrounds.</mdl-tooltip>

                              <div id="bubble--status-level"> <!--[class.ipad--bubble-position]="isIPAD && !isAdminView"> -->
                                <success-status #successStatus isTooltip="true"></success-status>
                              </div>
                            </div>
                            <!-- <div class="exerciseLabel">
                                <div class="exercise-headline"><span id="ttHeadline" [mdl-tooltip]="ttHeadline" (click)="gameExerciseService.OpenExercises()">{{ gameExerciseService.CurrentTextExercise?.Title }}</span></div>
                                <mdl-tooltip #ttHeadline="mdlTooltip">Current content text used for typing games. This is chosen automatically based on your skills and progress. Or click to select a custom exercise.</mdl-tooltip>
                            </div>

                            <div style="float: right;">
                                <div class="mainButtons">
                                    <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="prevBtn" [disabled]="gameExerciseService.PreviousExercises.length < 2" (click)="[gameExerciseService.GetPrevExercise(), gameExerciseService.PrevBtn_mouseover()]" (mouseover)="gameExerciseService.PrevBtn_mouseover()"><mdl-icon>navigate_before</mdl-icon></button>
                                    <button [class.hide]="gameExerciseService.HideNextButton" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="nextBtn" (click)="nextRecommendedText()"><mdl-icon>navigate_next</mdl-icon></button>
                                    <!--<button [class.hide]="header != 'Play'" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="changeBtn" (click)="openExercises()"><mdl-icon>swap_horiz</mdl-icon></button> C
                                    <!-- <button [class.hide]="header != 'Play'" mdl-button mdl-button-type="mini-fab" class="main-btns" [mdl-tooltip]="newBtn" #addTextBtn="mdlButton" [class.hide]="gameExerciseService.DisableTextCreation"
                                        (click)="addTextMenu.toggle($event, addTextBtn); gameExerciseService.ToggleNewExerciseMenu();"
                                        (mouseover)="gameExerciseService.ToggleNewExerciseMenu()">
                                            <span class="icon-library_add_outline" style="font"></span>
                                    </button>
                                    <mdl-menu #addTextMenu="mdlMenu" mdl-menu-position="bottom-right">
                                        <mdl-menu-item *ngFor="let addTextOption of gameExerciseService.AddTextOptions" mdl-ripple (click)="gameExerciseService.AddTextSelectionChanged(addTextOption)">{{ addTextOption.label }}</mdl-menu-item>
                                    </mdl-menu>
                                    <add-new-text-btn buttonStyle="mini" [class.hide]="header != 'Play' || gameExerciseService.DisableTextCreation" class="main-btns"></add-new-text-btn> C

                                    <mdl-tooltip #viewBtn="mdlTooltip">View current content text</mdl-tooltip>
                                    <mdl-tooltip #prevBtn="mdlTooltip" [class.hide]="gameExerciseService.HidePrevBtnTooltip">Previous exercise</mdl-tooltip>
                                    <mdl-tooltip #nextBtn="mdlTooltip">Next recommended exercise</mdl-tooltip>
                                    <mdl-tooltip #changeBtn="mdlTooltip">Choose a different exercise</mdl-tooltip>
                                    <!-- <mdl-tooltip #newBtn="mdlTooltip" [class.hide]="gameExerciseService.HideNewExerciseTooltip">Create new exercise</mdl-tooltip> C
                                </div>

                                <div class="keyboard-setting hide" [mdl-tooltip]="autoSwitch">
                                    <div class="col1">
                                        <label class="setting-label mdl-color-text--grey-600">Auto</label>
                                    </div>
                                    <div class="col2">
                                        <mdl-switch [(ngModel)]="autoProgress" mdl-ripple (change)="saveAutoProgressValue()"></mdl-switch>
                                        <mdl-tooltip #autoSwitch="mdlTooltip">Automatically progress to the next recommended exercise</mdl-tooltip>
                                    </div>
                                </div>
                            </div> !-->
                        </div>
                    </div>
                </div>
            </div>
            <router-outlet (deactivate)='onDeactivate($event)'></router-outlet>
        </div>
        <input #fileInput type="file" class="hide" (change)="gameExerciseService.documentSelected($event)" accept=".txt, .doc, .docx, .pdf, .html, .htm"/>
    `,
    providers: [UserStatusService]
})
export class GamesMainView implements OnInit, OnDestroy{
    @ViewChild('fileInput', { static: true }) fileInput:any;
    @ViewChild('miniOdometer', { static: true }) miniOdometer: ElementRef;
    @ViewChild('successStatus', { static: true }) successStatus: SuccessStatus;

    private model:UberApplication;
    private gamesLibrary: GamesLibraryService;
    private headerTextChangeSubscriber: any;
    private updateMiniOdometerSubscriber: any;
    // private goToNextRecommendedExerciseSubscriber: any;
    // private goToNextRecommendedExercise2Subscriber: any;

    public header: string = "Play";
    // public currentTextExercise: Text;
    public autoProgress: boolean;
    public currentLevel: string;
    // public disableTextCreation: boolean;
    // public hideNextButton: boolean = false;
    /* public addTextOptions:any[] = [
        {label: "Paste Text", data: "pasteText"},
        {label: "Use URL", data: "useUrl"},
        /*{label: "Web Page", data: "webPage"}, C
        /* {label: "Document", data: "document"} C
    ]; */
    // public hideNewExerciceTooltip: boolean = false;
    // public hidePrevBtnTooltip: boolean = false;
    // public previousExercises: Text[] = [];
    public imageToPreload:string [] = [
        AppSettings.GetAssetLocation() + "assets/icon/book.svg"
    ];

    constructor(private router:Router,
                public activityService: ActivityService,
                public gameExerciseService: GameExerciseService,
                private matDialog: MatDialog,
                private externalResourceLoader: ExternalResourceLoaderService,
                private userStatusService: UserStatusService) {
        this.model = UberApplication.GetInstance();

        // if (this.model.AllowImport) {
        //     this.addTextOptions.push({
        //         label: "Document",
        //         data: "document"
        //     });
        // }

        //this just a workaround
        //problem: injecting mdlDialogService in GamesStartView would cause the view to load twice thus displaying two of each games-view element
        //hack: make a service where mdlDialogService can be injected
        //      but this service can't be injected in GamesStartView bec. it contains the mdlDialogService,
        //      so just inject it in the app.component.ts and get a static instance of it (same implementation with UberApplication)
        this.gamesLibrary = GamesLibraryService.GetInstance();
    }

    ngOnInit() {
        UberReader.GetInstance().SetNavScreenState(ScreenState.SHOWING_ACTIVITY);
        UberReaderStateData.GetInstance().currentUberReaderScreenState = ScreenState.SHOWING_ACTIVITY;
        
        this.updateMiniOdometerSubscriber = this.externalResourceLoader.LoadOdometerFiles().subscribe(() => {
            this.updateMiniOdometer();
        });

        this.model.addEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        // this.model.addEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.gameExerciseService.currentTextUpdated);
        //this.model.addEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.disablePlaySection);

        // this.currentTextExercise = this.model.CurrentUserData.CurrentText;
        // let existingTxtExercises = this.previousExercises.filter((txtExercise) => { txtExercise.Text_id === this.currentTextExercise.Text_id; });
        // if (existingTxtExercises.length === 0) {
        //   this.previousExercises.push(this.currentTextExercise);
        // }
        // this.hideNextButton = this.currentTextExercise.User_id != null && this.currentTextExercise.Wordlist_id != null;
        this.autoProgress = this.model.GetUserPref("games_auto_progress") == "false" ? false : true;
        this.model.UpdateUserPref("games_auto_progress", this.autoProgress.toString(), true);

        this.gameExerciseService.Init();

        // this.disableTextCreation = this.model.GetUserPref("disable_text_creation").toLowerCase() == "true" ? true : false;

        if(this.headerTextChangeSubscriber) this.headerTextChangeSubscriber.unsubscribe();
        this.headerTextChangeSubscriber = this.gamesLibrary.headerTextChanged.subscribe( (newHeaderText: string) => this.header = newHeaderText );

        // if(this.goToNextRecommendedExerciseSubscriber) this.goToNextRecommendedExerciseSubscriber.unsubscribe();
        // this.goToNextRecommendedExerciseSubscriber = this.activityService.goToNextRecommendedExercise.subscribe(() => this.gameExerciseService.GetNextExercise());

        // if(this.goToNextRecommendedExercise2Subscriber) this.goToNextRecommendedExercise2Subscriber.unsubscribe();
        // this.goToNextRecommendedExercise2Subscriber = this.activityService.goToNextRecommendedExercise2.subscribe(() => this.gameExerciseService.GetNextExercise2());
    }

    // public toggleNewExerciseMenu() {
    //     this.hideNewExerciceTooltip = document.getElementsByClassName("mdl-menu__container is-upgraded is-visible").length > 0;
    // }

    // public prevBtn_mouseover() {
    //     this.hidePrevBtnTooltip = this.previousExercises.length < 2 ? true : false;
    // }

    private signedOut = (event:UserAuthenticatedEvent) => {
        console.log("SIGNED OUT in games");
        this.model.removeEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        this.router.navigate(['/play']);
    }

    /* private disablePlaySection = () => {
        if (this.model.GetUserPref("hide_play_section") == "True") {
            this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.disablePlaySection);
            this.model.showMdlAlertDialog("Your administration has disabled this feature. You will now be redirected to the home page.",
                "Play Section Disabled", false, "OK",
                () => {
                    this.router.navigate([{outlets: {recommendOutlet: null, primary: 'home'}}]);
                }
            );
        }
    } */

    public onDeactivate(event): void {
      this.updateMiniOdometer();
    }

    public updateMiniOdometer(): void {
      if (this.miniOdometer) {
        this.currentLevel = this.userStatusService.update().currentLevel.Name.toLowerCase();
        this.successStatus.UpdateStatusPoints();
        this.miniOdometer.nativeElement.innerHTML = this.model.UserStatusPoints;
      }
    }

    public skipToNextRecommendedActivity(): void {
        this.activityService.skipToNextRecommendedActivity.next();
    }

    public showTrainingHelp(): void {
        this.activityService.showTrainingHelpSubject.next(true);
    }

    public nextRecommendedText(): void {
        var currentTextId = this.gameExerciseService.CurrentTextExercise != null ? this.gameExerciseService.CurrentTextExercise.Text_id : null;
        this.activityService.goToNextRecommendedExercise.next();
    }

    /** LIBRARY/ EXERCISES FUNCTIONS **/
    // public openExercises(): void {
    //     //this.gamesLibrary.openExercises();
    //     if (!this.activityService.ActivityIsPaused) {
    //         this.activityService.pause(true);
    //     }

    //     this.matDialog.open(ExercisesDialog, {
    //         data: { openFromTest: false, isGameLoaded: this.activityService.ActivityIsPaused },
    //         disableClose: true,
    //         panelClass: 'exercises-dialog'
    //     });
    // }

    /* public viewCurrentExercise(): void {
        this.gamesLibrary.viewCurrentExercise();
    } */

    // public addTextSelectionChanged(selectedItem:any):void {
    //     if(this.model.CurrentUser.Is_trial && this.model.GetTrialMaxNumTexts() > 0 && this.model.GetUserProxyTexts() != null) {
    //         if(this.model.GetUserProxyTexts().length >=  this.model.GetTrialMaxNumTexts()) {
    //             this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_TITLE"),
    //                                             this.model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.model.GetUiTextByKey("DEFAULT_VIEW_UPGRADE_BTN"), this.trialTextLimitExceededHandler);
    //             return;
    //         }
    //     }

    //     switch(selectedItem.data) {
    //         case "pasteText":
    //             this.gamesLibrary.displayAddTextDialog(null);
    //             break;
    //         case "webPage":
    //             break;
    //         case "document":
    //             this.fileInput.nativeElement.click();
    //             break;
    //         case "useUrl":
    //             this.gamesLibrary.displayAddWebUrlTextDialog();
    //             break;
    //     }
    // }

    // public documentSelected(event): void {
    //     if (event.target.files && event.target.files[0]) {
    //         let filename = event.target.files[0].name;
    //         let reader = new FileReader();
    //         reader.onload = (event) => {
    //             let target: any = event.target;
    //             let doc = target.result.substr(target.result.indexOf("base64,") + 7);
    //             UberReaderLoadingMessage.GetInstance().Show(UberApplication.GetInstance().GetUiTextByKey("STAT_IMPORTING_TEXT_DOC"));
    //             this.model.ImportTextDoc(doc, filename, this.textDocImported, this.textDocImportError);
    //         }
    //         reader.readAsDataURL(event.target.files[0]);
		// }
    // }

    // private textDocImported = (event:ImportTextDocumentEvent) => {
    //     if(event.target) {
    //         event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
    //         event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.textDocImportError);
    //     }

    //     UberReaderLoadingMessage.GetInstance().Hide();
    //     this.gamesLibrary.displayAddTextDialog(event._Text);
    // }

    // private textDocImportError = (event:ImportTextDocumentEvent) => {
    //     event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
    //     event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.textDocImportError);
    //     UberReaderLoadingMessage.GetInstance().Hide();
    //     this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_MESSAGE"), this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_TITLE"), true);
    // }

    // private trialTextLimitExceededHandler = (event:ClosePopUpEvent) => {
    //     if(event.detail == ClosePopUpEvent.OK) {
    //         //TO DO UberReaderAccessor.GetUberReader().ActivateAccount(null, UberApplication.GetInstance().GetUiTextByKey("TRIAL_TEXT_ERROR_MESSAGE"));
    //     }
    // }

    // private currentTextUpdated = (event:UberApplicationEvent) => {
    //     this.currentTextExercise = this.model.CurrentUserData.CurrentText;
    //     let existingTxtExercises = this.previousExercises.filter(txtExercise => txtExercise.Text_id === this.currentTextExercise.Text_id);
    //     if (existingTxtExercises.length === 0) {
    //       this.previousExercises.push(this.currentTextExercise);
    //     }
    //     this.hideNextButton = this.currentTextExercise.User_id != null && this.currentTextExercise.Wordlist_id != null;
    // }

    // public getPrevExercise() {
    //   console.log('getPrevExercise. ', this.previousExercises);
    //     if (this.previousExercises.length > 1) {
    //         this.previousExercises.pop();
    //         this.model.CurrentUserData.CurrentText = this.previousExercises.pop();//this.previousExercises[this.previousExercises.length - 1];
    //         if (this.gamesLibrary.CurrentTextChangeCallback) {
    //           this.gamesLibrary.CurrentTextChangeCallback();
    //         }
    //     }
    // }

    // public getNextExercise(): void {
    //     this.model.GetNextRecommendedText(this.nextRecommendedTextReceived, this.nextRecommendedTextError);
    // }

    // public getNextExercise2(): void {
    //     this.model.GetNextRecommendedText2(this.nextRecommendedTextReceived, this.nextRecommendedTextError);
    // }

    // private nextRecommendedTextReceived = (event:NextRecommendedTextEvent) => {
    //     event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
    //     event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
    //     this.model.CurrentUserData.CurrentText = event.NextRecommendedText;

    //     if (event.NextRecommendedText !== null) {
    //       this.model.IsRecommendedTextAvailable = true;
    //     } else {
    //       this.model.IsRecommendedTextAvailable = false;
    //     }

    //     if (this.gamesLibrary.CurrentTextChangeCallback) {
    //       if (this.model.IsRecommendedTextAvailable == true) {
    //         this.model.showMatSnackBar('flag', 'Your game exercise text has been updated to ' + event.NextRecommendedText.Title);
    //       }
    //       this.gamesLibrary.CurrentTextChangeCallback();
    //     }
    //     //this.previousExercises.push(this.model.CurrentUserData.CurrentText);
    //     console.log('previousExercises. ', this.previousExercises);
    // }

    // private nextRecommendedTextError = (event:NextRecommendedTextEvent) => {
    //     event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_RECEIVED, this.nextRecommendedTextReceived);
    //     event.target.removeEventListener(NextRecommendedTextEvent.NEXT_RECOMMENDED_TEXT_ERROR, this.nextRecommendedTextError);
    //     console.log("no recommended text");
    //     this.hideNextButton = true;

    //     this.model.IsRecommendedTextAvailable = false;

    //     if (this.gamesLibrary.CurrentTextChangeCallback) {
    //       this.gamesLibrary.CurrentTextChangeCallback();
    //     }
    // }

    public saveAutoProgressValue(): void {
        this.model.UpdateUserPref("games_auto_progress", this.autoProgress.toString(), true);
    }
    /** END OF LIBRARY/ EXERCISES FUNCTIONS **/

    ngOnDestroy() {
        this.externalResourceLoader.RemoveOdometerResources();
        if (this.updateMiniOdometerSubscriber) this.updateMiniOdometerSubscriber.unsubscribe();
        this.model.removeEventListener(UserAuthenticatedEvent.SIGN_OUT, this.signedOut);
        // this.model.removeEventListener(UberApplicationEventTypes.CURRENT_TEXT_CHANGED, this.gameExerciseService.currentTextUpdated);
        //this.model.removeEventListener(UserSettingSyncEvent.USER_SETTING_SYNC, this.disablePlaySection);
    }
}
