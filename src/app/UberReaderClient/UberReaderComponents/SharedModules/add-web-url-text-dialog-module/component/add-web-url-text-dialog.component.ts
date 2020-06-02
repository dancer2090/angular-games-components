import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ParentDialog } from '../../../Dialogs/ParentDialog';
import { UberApplication } from '../../../../../UberReaderData/UberApplication';
import { UberReaderLoadingMessage } from "../../../Dialogs/UberReaderLoadingMessage";
import { ImportTextDocumentEvent } from "../../../../../UberReaderData/Events/ImportTextDocumentEvent";
import { StringUtils } from "../../../../../UberReaderData/Utils/StringUtils";

@Component({
    selector: 'add-web-url-text-dialog',
    styleUrls: ['./add-web-url-text-dialog.component.css'],
    template: `       
        <h3 class="mdl-typography--headline mdl-color-text--grey-800 dialog-headline">Paste URL</h3>
        <button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
            <mdl-icon>close</mdl-icon>   
        </button>
        <div class="mdl-dialog__content">
            <mdl-textfield label="Paste or type the website URL here" [(ngModel)]="urlText"></mdl-textfield>
        </div>
        <div class="mdl-dialog__actions">
            <button mdl-button class="button--primary" mdl-button-type="raised" mdl-ripple [disabled]="validateURL()" (click)="okButton_Click()">OK</button>
            <button mdl-button class="close" mdl-button-type="raised" mdl-ripple (click)="closeDialog()">Cancel</button>
        </div>

    `
})
export class AddWebUrlTextDialog extends ParentDialog {
    private model: UberApplication;
    //public okBtnDisabled: boolean = true;
    public urlText: string;

    constructor(public dialogRef: MatDialogRef<AddWebUrlTextDialog>) {
        super(dialogRef);
        this.model = UberApplication.GetInstance();
        //this.visible = true;
    }

    public okButton_Click(): void {
        UberReaderLoadingMessage.GetInstance().Show("Getting web page text.");
        this.urlText = this.urlText.indexOf("http://") == -1 && this.urlText.indexOf("https://") == -1 ? "http://" + this.urlText : this.urlText;
        this.model.GetHtmlText(this.urlText, this.HtmlTextLoaded, this.HtmlTextFailed);
    }

    private HtmlTextLoaded = (event: ImportTextDocumentEvent) => {
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.HtmlTextLoaded);
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.HtmlTextFailed);
        this.closeDialog({
            text: event._Text
        });
    }

    private HtmlTextFailed = (event: ImportTextDocumentEvent) => {
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORTED, this.HtmlTextLoaded);
        event.target.removeEventListener(ImportTextDocumentEvent.TEXT_IMPORT_FAILED, this.HtmlTextFailed);
        UberReaderLoadingMessage.GetInstance().Hide();
        this.model.showMdlAlertDialog(this.model.GetUiTextByKey("ERR_INVALID_TEXT_URL_MESSAGE"), this.model.GetUiTextByKey("ERR_INVALID_TEXT_URL_TITLE"), true);
    }

    public validateURL(): boolean {
        return StringUtils.TrimString(this.urlText).length <= 0;
    }

    public dispose(): void { }
}