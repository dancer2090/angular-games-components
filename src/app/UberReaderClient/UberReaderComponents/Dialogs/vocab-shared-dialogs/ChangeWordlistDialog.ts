import { Component, Inject } from '@angular/core';
import { UberReaderDialog } from '../UberReaderDialog';
import { UberReaderLoadingMessage } from '../UberReaderLoadingMessage';
import { UberApplication } from '../../../../UberReaderData/UberApplication';
import { WordlistEvent } from '../../../../UberReaderData/Events/WordlistEvent';
import { ProxyWordlist } from '../../../../UberReaderData/DataClasses/other/ProxyWordlist';
import { UberReader } from '../../../UberReader';
import { ScreenState } from '../../../../UberReaderData/Utils/ScreenState';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { CreateWordlistDialog } from './CreateWordlistDialog';
import { VocabSharedDialogsService } from './vocab-shared-dialogs.service';
import { ParentDialog } from '../ParentDialog';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
    selector: 'change-wordlist-dialog',
	styleUrls: ['./ChangeWordlistDialog.css'],
    template: `
        <div>
			<div class="mdl-grid login-form-grid">
				<div class="mdl-cell mdl-cell--12-col login-form-cell">
					<h3 class="mdl-typography--headline mdl-color-text--grey-800 login-headline">Change Wordlist</h3>      
					<button class="x-button close" (click)="closeDialog()" mdl-button mdl-button-type="raised" mdl-ripple mdl-colored>
                        <mdl-icon>close</mdl-icon>
                    </button>
					<div class="wordlist-container">
						<mdl-list>
							<mdl-list-item *ngFor="let wordlist of wordlists" [class.active]="selectedWordlist == wordlist" (click)="wordlistChangedHandler(wordlist)">
								<mdl-list-item-primary-content>{{ wordlist.Name }}</mdl-list-item-primary-content>
							</mdl-list-item>
						</mdl-list>
					</div>
                    <div id="button-container">
						<button (click)="addButton_clickHandler()" mdl-button mdl-button-type="fab" mdl-colored="accent" mdl-ripple class="blue-button" mdl-tooltip="Create a new wordlist">
						<mdl-icon>add</mdl-icon>
						</button>
					</div>
				</div>
			</div>

			<div class="mdl-dialog__actions wordlist-buttons">
				<button mdl-button class="login-button" [class.green-button]="selectedWordlist != null" [disabled]="selectedWordlist == null" (click)="okButton_clickHandler()" mdl-button-type="raised" mdl-ripple>Select</button>
				<button mdl-button class="close" (click)="cancelButton_clickHandler()" mdl-button-type="raised" mdl-ripple>Cancel</button>
			</div>
		</div>
	`
})

export class ChangeWordlistDialog extends ParentDialog
{
    public wordlists:any[] = [];
	public selectedWordlist:ProxyWordlist = null;
	private _model:UberApplication;
	private selectWordlistCallback: (wordlist: ProxyWordlist) => void;
	private addNewWordlistCallback: () => void;

	constructor(
		public dialogRef: MatDialogRef<ChangeWordlistDialog>,
		private matDialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) dialogData: any
	) {
		super(dialogRef);

		this._model = UberApplication.GetInstance();
		if (this._model.CurrentUser != null) {			
			this.wordlists = UberApplication.GetInstance().GetUserProxyWordlists();
		}

		if (dialogData) {
			if (dialogData.selectWordlistCallback) {
				this.selectWordlistCallback = dialogData.selectWordlistCallback;
			}
			if (dialogData.addNewWordlistCallback) {
				this.addNewWordlistCallback = dialogData.addNewWordlistCallback;
			}
		}
	}

	public addButton_clickHandler() {
		if (this.addNewWordlistCallback) {
			this.addNewWordlistCallback();
			this.closeDialog();
		}
		else {
			/* let dialogData = {
				willNavigate: true
			};
			let pDialog = this.mdlDialogService.showCustomDialog({
				isModal: true,
				providers: [{provide: "data", useValue: dialogData}],
				component: CreateWordlistDialog,		
				styles: {'width': '470px'}
			}); */			
			let dialogData = {
				willNavigate: true,
			};
			this.matDialog.open(CreateWordlistDialog, {
				data: dialogData,			          
				width : '470px'
			});
			this.closeDialog();	
		}		
	}

	public wordlistChangedHandler(wordlist: ProxyWordlist) {
		this.selectedWordlist = wordlist;		
	}

	public UserWordlistChanged():void {        
		this._model.currentlySelectedWordlist = this.selectedWordlist;
		UberReaderLoadingMessage.GetInstance().Show(this._model.GetUiTextByKey("STAT_RETRIEVING_WORD_LIST"), false);		
		this._model.GetAllWordlistData(this.selectedWordlist.Wordlist_id, this.wordlistDataReceived, this.wordlistDataError);
    }

	private wordlistDataReceived = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);	
        
        UberReaderLoadingMessage.GetInstance().Hide();
		this.closeDialog();

        if (event.Wordlist != null) {
		    this._model.CurrentWordlist = event.Wordlist;
            UberReader.GetInstance().numOfUnviewedWords = 0;
			this._model.UpdateWordsSeen(this._model.CurrentWordlist.Wordlist_id);
            this._model.UpdateUserPref('num_of_unviewed_words', "0", true);
            UberReader.GetInstance().SwitchScreenState(ScreenState.MANAGING_WORDLIST, true);
        }
        else {            
            this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
        }   
    }

    private wordlistDataError = (event:WordlistEvent) => {
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_RECEIVED, this.wordlistDataReceived);
        event.target.removeEventListener(WordlistEvent.WORDLIST_DATA_ERROR, this.wordlistDataError);
        
        UberReaderLoadingMessage.GetInstance().Hide();             
		this.closeDialog();   
        this._model.showMdlAlertDialog(this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_MESSAGE"), this._model.GetUiTextByKey("ERR_GETTING_WORD_LIST_TITLE"), true);
	}

	public okButton_clickHandler() {
		if (this.selectWordlistCallback) {
			this.selectWordlistCallback(this.selectedWordlist);
			this.closeDialog();
		}
		else {
			this.UserWordlistChanged();
		}		
	}

	public cancelButton_clickHandler() {
		this.closeDialog();
	}

	public dispose() {}
}