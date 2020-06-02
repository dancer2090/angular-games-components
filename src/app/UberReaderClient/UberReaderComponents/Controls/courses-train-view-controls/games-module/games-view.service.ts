import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { MdlDialogService } from '@angular-mdl/core';
import { Text } from '../../../../../UberReaderData/DataClasses/db/Text';
import { ActivityService } from '../../../../../UberReaderActivities/activity.service';
import { MatDialog } from '@angular/material';
import { AddNewTextDialog } from 'app/UberReaderClient/UberReaderComponents/SharedModules/add-new-text-dialog-module/components/add-new-text-dialog.component';
import { AddWebUrlTextDialog } from 'app/UberReaderClient/UberReaderComponents/SharedModules/add-web-url-text-dialog-module/component/add-web-url-text-dialog.component';

@Injectable()
export class GamesLibraryService {
    private static _thisService: GamesLibraryService;
    private model: UberApplication = UberApplication.GetInstance();
    private currentTextChangedCallback: any;

    public headerTextChanged: Subject<string> = new Subject();
    public viewTypeChanged: Subject<boolean> = new Subject();   
    
    constructor(private matDialog: MatDialog, private mdlDialogService: MdlDialogService, private activityService: ActivityService) {
        GamesLibraryService._thisService = this;
    }

    public static GetInstance(): GamesLibraryService {
        return GamesLibraryService._thisService;
    }

    /** LIBRARY/ EXERCISES FUNCTIONS **/
    public openExercises(): void {
        /*let exercisesDialog = this.mdlDialogService.showCustomDialog({
            component: ExercisesDialog,
            isModal: true,
            clickOutsideToClose: false,
            classes: 'exercises-dialog',
            styles: { 'width': '1100px', 'height': 'auto' }
        });*/
        if (!this.activityService.ActivityIsPaused) {
            this.activityService.pause(true);
        }
        //this.model.showExercisesDialog();
        /* this.mdlDialogService.showCustomDialog({
            providers: [{provide: 'data', useValue: {openFromTest: false}}],
            component: ExercisesDialog,
            isModal: true,
            clickOutsideToClose: false,
            classes: 'exercises-dialog'
        }); */

        /* if (this.activityService.ActivityIsPaused) {
          this.model.showExercisesDialog(false, true);
        } else {
          this.model.showExercisesDialog(); //! FIXME:
        } */

        /* this.matDialog.open(ExercisesDialog, {
            data: { openFromTest: false },
            disableClose: true,
            panelClass: 'exercises-dialog'
        }); */
    }
/* 
    public viewCurrentExercise(): void {
        UberReaderLoadingMessage.GetInstance().Show(this.model.GetUiTextByKey("STAT_RETRIEVING_TEXT"));        
        this.model.getTextById(this.model.CurrentUserData.CurrentText.Text_id, this.textToEditSelected, this.textSelectionError);
    }

    private textToEditSelected = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textToEditSelected);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);
        UberReaderLoadingMessage.GetInstance().Hide();

        let editOrViewDialog = this.mdlDialogService.showCustomDialog({
            component: EditOrViewTextDialog,
            isModal: true,
            providers: [{provide: Text, useValue: event._Text}, {provide: "type", useValue: "view"}],
            clickOutsideToClose: true,
            styles: {'width': '480px'}
        });
    }

    private textSelectionError = (event:UberReaderTextEvent) => {
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVED, this.textToEditSelected);
        event.target.removeEventListener(UberReaderTextEvent.TEXT_RETREIVAL_ERROR, this.textSelectionError);

        UberReaderLoadingMessage.GetInstance().Hide();

        if(event.ErrorMessage == ErrorMessage.TRIAL_VERSION_ERROR) {
            //to do upgradeAccount(null);
        }
        else if(event.ErrorMessage == ErrorMessage.CANCEL_LOADING) {
            //suppress error
        }
        else if(event.ErrorMessage.length > 0) {
            this.model.showMdlAlertDialog(event.ErrorMessage, this.model.GetUiTextByKey("ERR_GETTING_TEXT_TITLE"));
        }
        else {
            this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_GETTING_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_GETTING_TEXT_TITLE"));
        }
    } */

    public displayAddTextDialog(text:Text, addOption: string = "paste"): void {
        /* let addNewTextDialog = this.mdlDialogService.showCustomDialog({
            component: AddNewTextDialog,
            isModal: true,
            providers: [{provide: Text, useValue: text}],
            clickOutsideToClose: true,
            styles: {'width': '480px'}
        }); */
        
        /* addNewTextDialog.subscribe((dialogRef) => {
            dialogRef.onHide().subscribe((data:any) => {
                if(data) this.addNewText(data);
            });
        }); */

        let addNewTextDialog = this.matDialog.open(AddNewTextDialog, {            
            data: {text: text, addOption: addOption},
            disableClose: true,
            width: '480px'
        });

        addNewTextDialog.afterClosed().subscribe((data: any) => {
            if(data) this.addNewText(data);
        });
    }

    private addNewText = (data:any) => {
        if(data.text.Text_id == this.model.CurrentUserData.CurrentText.Text_id || data.isCurrentText) {
            let readTextMessage = "You are now training with " + data.text.Title + ". All games will be based on this exercise.";
                            //this.model.GetUiTextByKey("WARNING_NOT_PREPROCESSING_TEXT_CHANGED").replace("{0}", event._Text.Title);
            let titleTextMessage = this.model.GetUiTextByKey("WARNING_NOTPREPROCESSING_TEXT_CHANGED_TITLE");
            this.model.showMdlAlertDialog(readTextMessage, titleTextMessage);
        }
        else {
            this.model.showSnackbar("Your text has been added to Exercises.");
        }
    }

    public displayAddWebUrlTextDialog(): void {
        /* let addWebUrlTextDialog = this.mdlDialogService.showCustomDialog({
            component: AddWebUrlTextDialog,
            isModal: true,
            clickOutsideToClose: true,
            styles: {'width': '480px'}
        }); */
        
        /* addWebUrlTextDialog.subscribe((dialogRef) => {
            dialogRef.onHide().subscribe((data:any) => {
                if(data) this.displayAddTextDialog(data.text);
            });
        }); */

        let addWebUrlTextDialog = this.matDialog.open(AddWebUrlTextDialog, {
            disableClose: true,
            width: '480px'
        });

        addWebUrlTextDialog.afterClosed().subscribe((data: any) => {
            if(data) this.displayAddTextDialog(data.text, "url");
        });
    }

    public get CurrentTextChangeCallback(): any {
        // console.log("TCL: GamesLibraryService -> this.currentTextChangedCallback", this.currentTextChangedCallback); //! FIXME:
        return this.currentTextChangedCallback;
    }

    public set CurrentTextChangeCallback(value: any) {
        this.currentTextChangedCallback = value;
    }
}
