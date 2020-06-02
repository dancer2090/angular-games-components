import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UberApplication } from 'app/UberReaderData/UberApplication';
import { AddNewTextDialog } from '../../add-new-text-dialog-module/components/add-new-text-dialog.component';
import { AddWebUrlTextDialog } from '../../add-web-url-text-dialog-module/component/add-web-url-text-dialog.component';
import { UberReaderLoadingMessage } from 'app/UberReaderClient/UberReaderComponents/Dialogs/UberReaderLoadingMessage';
import { ImportTextDocumentEvent } from 'app/UberReaderData/Events/ImportTextDocumentEvent';
import { Text } from '../../../../../UberReaderData/DataClasses/db/Text';
import { ClosePopUpEvent } from 'app/UberReaderData/Events/ClosePopUpEvent';

@Component({
    selector: 'add-new-text-btn',
    styleUrls: ['./add-new-text-button.component.css'],
    template: `
        <button *ngIf="btnStyle == STYLE_1" mdl-button mdl-button-type="mini-fab" [mdl-tooltip]="newBtnTooltip" #addTextBtn1="mdlButton" (click)="addTextMenu.toggle($event, addTextBtn1)" class="main-btns">
            <span class="icon-library_add_outline"></span>
        </button>

        <button *ngIf="btnStyle == STYLE_2" mdl-button mdl-button-type="raised" mdl-ripple #addTextBtn2="mdlButton" (click)="addTextMenu.toggle($event, addTextBtn2)" class="button--oval"><mdl-icon class="iconGreen">add</mdl-icon>Create Exercise</button>
        
        <mdl-menu #addTextMenu="mdlMenu" mdl-menu-position="{{ btnStyle == STYLE_1 ? 'bottom-right' : 'bottom-left' }}">
            <mdl-menu-item *ngFor="let addTextOption of addTextOptions" mdl-ripple (click)="addTextSelectionChanged(addTextOption)">{{ addTextOption.label }}</mdl-menu-item>
        </mdl-menu> 
        <mdl-tooltip #newBtnTooltip="mdlTooltip">Create new exercise</mdl-tooltip>
    `
})
export class AddNewTextButton {
    @Input("buttonStyle") btnStyle: string;
    @Input("openFromTest") openFromTest: boolean;
    @Output() textAdded: EventEmitter<any> = new EventEmitter();
    @Output() useTextCreated: EventEmitter<Text> = new EventEmitter();

    public STYLE_1: string = "mini";
    public STYLE_2: string = "default";    
    public addTextOptions: any[] = [
        { label: "Paste Text", data: "pasteText" },
        /*{ label: "Use URL", data: "useUrl" },
        {label: "Web Page", data: "webPage"},
        {label: "Document", data: "document"}*/
    ];

    private model: UberApplication;
    private inputElement: HTMLInputElement;

    constructor(private matDialog: MatDialog) {
        this.model = UberApplication.GetInstance();
        if (this.model.AllowImport) {
            this.addTextOptions.push({
                label: "Import Document",
                data: "document"
            });

            this.inputElement = document.createElement("input");
            this.inputElement.type = "file";
            this.inputElement.accept = ".txt, .doc, .docx, .pdf, .html, .htm";
            this.inputElement.onchange = (event) => {
                this.documentSelected(event);
            }
        }
    }

    public addTextSelectionChanged(selectedItem: any): void {
        if (this.model.CurrentUser.Is_trial && this.model.GetTrialMaxNumTexts() > 0 && this.model.GetUserProxyTexts() != null) {
            if (this.model.GetUserProxyTexts().length >= this.model.GetTrialMaxNumTexts()) {
                this.model.showMdlConfirmDialog(this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_MESSAGE"), this.model.GetUiTextByKey("ERR_UPGRADE_TRIAL_TEXT_TITLE"),
                    this.model.GetUiTextByKey("BTN_CANCEL_LABEL"), this.model.GetUiTextByKey("DEFAULT_VIEW_UPGRADE_BTN"), this.trialTextLimitExceededHandler);
                return;
            }
        }

        switch (selectedItem.data) {
            case "pasteText":
                this.showAddTextDialog(null);
                break;
            case "webPage":
                //TO DO
                break;
            case "document":
                this.inputElement.click();
                break;
            case "useUrl":
                this.showAddWebUrlTextDialog();
                break;
        }
    }

    private showAddTextDialog(text: Text, addOption: string = "paste"): void {
        let addNewTextDialog = this.matDialog.open(AddNewTextDialog, {
            data: { text: text, addOption: addOption, openFromTest: this.openFromTest },
            disableClose: true,
            width: '480px'
        });

        addNewTextDialog.afterClosed().subscribe((data: any) => {
            if (data) {
                if (this.openFromTest && data.isCurrentText == true) {
                    this.useTextCreated.next(data.text);
                }
                else {
                    this.addNewText(data);
                }
            }
        });
    }

    private addNewText = (data: any) => {
        if (data.text.Text_id == this.model.CurrentUserData.CurrentText.Text_id || data.isCurrentText) {
            let readTextMessage = "You are now training with " + data.text.Title + ". All games will be based on this exercise.";
            //this.model.GetUiTextByKey("WARNING_NOT_PREPROCESSING_TEXT_CHANGED").replace("{0}", event._Text.Title);
            let titleTextMessage = this.model.GetUiTextByKey("WARNING_NOTPREPROCESSING_TEXT_CHANGED_TITLE");
            this.model.showMdlAlertDialog(readTextMessage, titleTextMessage);
        }
        else {
            this.textAdded.next(data.text);
            this.model.showSnackbar("Your text has been added to Exercise Texts.");
        }
    }

    private showAddWebUrlTextDialog(): void {
        let addWebUrlTextDialog = this.matDialog.open(AddWebUrlTextDialog, {
            disableClose: true,
            width: '480px'
        });

        addWebUrlTextDialog.afterClosed().subscribe((data: any) => {
            if (data) this.showAddTextDialog(data.text, "url");
        });
    }

    public documentSelected(event): void {
        if (event.target.files && event.target.files[0]) {
            let filename = event.target.files[0].name;
            let reader = new FileReader();
            reader.onload = (event) => {
                let target: any = event.target;
                let doc = target.result.substr(target.result.indexOf("base64,") + 7);
                UberReaderLoadingMessage.GetInstance().Show(UberApplication.GetInstance().GetUiTextByKey("STAT_IMPORTING_TEXT_DOC"));
                this.model.ImportTextDoc(doc, filename, this.textDocImported, this.errorImportingTextDoc);
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    private textDocImported = (event: ImportTextDocumentEvent) => {
        if (event.target) {
            event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
            event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.errorImportingTextDoc);
        }

        this.showAddTextDialog(event._Text, "document");
    }

    private errorImportingTextDoc = (event: ImportTextDocumentEvent) => {
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.textDocImported);
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.errorImportingTextDoc);
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_MESSAGE"), this.model.GetUiTextByKey("ERROR_IMPORTING_TEXT_DOC_TITLE"), true);
    }

    private trialTextLimitExceededHandler = (event: ClosePopUpEvent) => {
        if (event.detail == ClosePopUpEvent.OK) {
            //TO DO
            //UberReaderAccessor.GetUberReader().ActivateAccount(null, UberApplication.GetInstance().GetUiTextByKey("TRIAL_TEXT_ERROR_MESSAGE"));
        }
    }
}