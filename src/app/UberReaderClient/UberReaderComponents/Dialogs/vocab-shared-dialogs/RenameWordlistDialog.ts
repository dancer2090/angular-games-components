import { Component, Inject } from '@angular/core';
import { UberReaderDialog } from '../UberReaderDialog';
import { MdlDialogReference } from '@angular-mdl/core';
import { StringUtils } from '../../../../UberReaderData/Utils/StringUtils';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { Wordlist } from '../../../../UberReaderData/DataClasses/db/Wordlist';
import { UberReaderLoadingMessage } from '../UberReaderLoadingMessage';
import { ProxyWordlistEvent } from '../../../../UberReaderData/Events/ProxyWordlistEvent';

@Component({
    selector: "rename-wordlist-dialog",
    styleUrls: ['./RenameWordlistDialog.css'],
    template: `
        <div>       
			<div class="mdl-grid login-form-grid">
				<div class="mdl-cell mdl-cell--12-col login-form-cell">
					<h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">Rename {{wordlist?.Name}}</h3>
					<button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
						<mdl-icon>close</mdl-icon>   
					</button>

                    <mdl-textfield label="Wordlist name:" [(ngModel)]="wordlistName" floating-label (keyup.enter)="okButton_Click()"></mdl-textfield>
				</div> 
			</div>        
			<div class="mdl-dialog__actions">
				<button mdl-button class="green-button login-button" (click)="okButton_Click()" [disabled]="wordlistName.length < 3" mdl-button-type="raised" mdl-ripple>OK</button>
				<button mdl-button class="close" (click)="cancelButton_Click()" mdl-button-type="raised" mdl-ripple>Cancel</button>
			</div>
		</div>
    `
})

export class RenameWordlistDialog extends UberReaderDialog {

    public wordlistName: string = "";
    public wordlist: Wordlist;
    private _model: UberApplication;

     constructor(public dialogRef: MdlDialogReference, @Inject(Wordlist) data: Wordlist) {
        super(dialogRef);

        this.wordlist = data;
        this.wordlistName = data.Name;
        this._model = UberApplication.GetInstance();
    }

    public okButton_Click():void
    {
        if(StringUtils.TrimString(this.wordlistName).length > 0) {
            UberReaderLoadingMessage.GetInstance().Show("Loading...", false, true, false);
            this._model.RenameCustomWordlist(this.wordlist.Wordlist_id, this.wordlistName, this.renameSuccessHandler, this.renameFailedHandler);
        }
    }

    private renameSuccessHandler = (event: ProxyWordlistEvent) => {
        event.target.removeEventListener(ProxyWordlistEvent.WORDLIST_RENAMED, this.renameSuccessHandler);
        event.target.removeEventListener(ProxyWordlistEvent.WORDLIST_RENAME_ERROR, this.renameFailedHandler);

        UberReaderLoadingMessage.GetInstance().Hide();
        this.closeDialog(event.Wordlist);
    }

    private renameFailedHandler = (event: ProxyWordlistEvent) => {
        event.target.removeEventListener(ProxyWordlistEvent.WORDLIST_RENAMED, this.renameSuccessHandler);
        event.target.removeEventListener(ProxyWordlistEvent.WORDLIST_RENAME_ERROR, this.renameFailedHandler);

        UberReaderLoadingMessage.GetInstance().Hide();
        this._model.showMdlAlertDialog("There was an error renaming your wordlist.", this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
    }

    public cancelButton_Click():void
    {
        this.closeDialog();
    }

    dispose(): void{}
}
